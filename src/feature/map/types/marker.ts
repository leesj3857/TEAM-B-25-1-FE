export interface MarkerData {
  lat: number;
  lng: number;
  iconUrl: string;
}
// === 공용 장소 타입 (바텀시트/마커에서 같이 사용) ===
export interface MapPlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category?: string;
  rating: number; // 더미
  time: number; // 더미
  imageList: string[]; // 더미
  iconUrl: string; // 카테고리별 아이콘 or 기본 아이콘
}

const iconByCategory = (c?: string): string => {
  if (!c) return "/marker/location.svg";

  const text = c.toLowerCase();

  // 음식 관련
  if (
    c.includes("맛집") ||
    c.includes("음식") ||
    text.includes("food") ||
    text.includes("restaurant")
  ) {
    return "/marker/restaurant.svg";
  }

  // 놀거리 관련
  if (
    c.includes("놀거리") ||
    c.includes("여가") ||
    text.includes("play") ||
    text.includes("activity")
  ) {
    return "/marker/playground.svg";
  }

  // 기본값
  return "/marker/location.svg";
};

// Swagger 응답 → MapPlace 로 변환 (나중에 API 붙일 때 사용)
export type PlaceApiRow = {
  placeId: number;
  name: string;
  category?: string;
  latitude: number;
  longitude: number;
};

export const adaptPlacesFromApi = (rows: PlaceApiRow[] = []): MapPlace[] =>
  rows.map((p, i) => ({
    id: String(p.placeId ?? i),
    name: p.name ?? "이름없음",
    category: p.category,
    lat: Number(p.latitude),
    lng: Number(p.longitude),
    rating: Math.round(Math.random() * 20) / 4, // 0~5 (0.25 step) 더미
    time: 10 + Math.floor(Math.random() * 40), // 10~50 더미
    imageList: [
      `https://picsum.photos/240?random=${i * 3 + 1}`,
      `https://picsum.photos/240?random=${i * 3 + 2}`,
      `https://picsum.photos/240?random=${i * 3 + 3}`,
    ],
    iconUrl: iconByCategory(p.category),
  }));

// 지금은 더미로 시작하려면 이 함수 사용
export const makeDummyPlaces = (n = 10): MapPlace[] =>
  Array.from({ length: n }).map((_, i) => ({
    id: `d-${i}`,
    name: `맛집 ${i + 1}`,
    lat: 37.5665 + (Math.random() - 0.5) * 0.02,
    lng: 126.978 + (Math.random() - 0.5) * 0.02,
    category: "맛집",
    rating: Math.round(Math.random() * 20) / 4,
    time: 10 + Math.floor(Math.random() * 40),
    imageList: [
      `https://picsum.photos/240?random=${i * 3 + 1}`,
      `https://picsum.photos/240?random=${i * 3 + 2}`,
      `https://picsum.photos/240?random=${i * 3 + 3}`,
    ],
    iconUrl: "/icons/food.svg",
  }));
