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
  iconUrl: string; // 카테고리별 아이콘 or 기본 아이콘
  slotNo?: number; // 투표용 슬롯 번호
  votedByMe?: boolean; // 내가 투표했는지 여부
  address?: string; // 주소
  url?: string; // 카카오맵 URL
  label?: string; // 카테고리 라벨
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
  label?: string;
};

export const adaptPlacesFromApi = (rows: PlaceApiRow[] = []): MapPlace[] =>
  rows.map((p, i) => ({
    id: String(p.placeId ?? i),
    name: p.name ?? "이름없음",
    category: p.category,
    lat: Number(p.latitude),
    lng: Number(p.longitude),
    iconUrl: iconByCategory(p.category),
    label: p.label,
  }));

// 지금은 더미로 시작하려면 이 함수 사용
export const makeDummyPlaces = (n = 10): MapPlace[] =>
  Array.from({ length: n }).map((_, i) => ({
    id: `d-${i}`,
    name: `맛집 ${i + 1}`,
    lat: 37.5665 + (Math.random() - 0.5) * 0.02,
    lng: 126.978 + (Math.random() - 0.5) * 0.02,
    category: "맛집",
    iconUrl: "/icons/food.svg",
    label: "맛집",
  }));
