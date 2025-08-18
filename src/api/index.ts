import axios, { AxiosResponse } from "axios";

// API 기본 설정
const API_BASE_URL = "https://o-digo.com";

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 오류:", error);
    return Promise.reject(error);
  }
);

// 공통 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// ===== Meeting 관련 API =====

// Meeting 생성 요청 타입
export interface CreateMeetingRequest {
  name: string;
  purpose: string;
}

// Meeting 응답 타입
export interface Meeting {
  linkCode: string;
}

export interface Participant {
  name: string;
  address: string;
  transportType: string;
  lat: number;
  lng: number;
}

// Meeting 생성
export const createMeeting = async (
  data: CreateMeetingRequest
): Promise<ApiResponse<Meeting>> => {
  const response: AxiosResponse<ApiResponse<Meeting>> = await apiClient.post(
    "/meetings/",
    data
  );
  return response.data;
};

// Meeting 조회
export const getMeeting = async (
  linkCode: string
): Promise<ApiResponse<Meeting>> => {
  const response: AxiosResponse<ApiResponse<Meeting>> = await apiClient.get(
    `/meetings/${linkCode}/info`
  );
  return response.data;
};

export const registerParticipant = async (
  linkCode: string,
  data: Participant
): Promise<ApiResponse<Participant>> => {
  const response: AxiosResponse<ApiResponse<Participant>> =
    await apiClient.post(`/meetings/${linkCode}/participants/register`, data);
  return response.data;
};

export interface PlaceResponseDto {
  placeId: number;
  name: string;
  category?: string;
  latitude: number;
  longitude: number;
}

export const getPlaces = async (
  linkCode: string
): Promise<ApiResponse<PlaceResponseDto[]>> => {
  const response: AxiosResponse<ApiResponse<PlaceResponseDto[]>> =
    await apiClient.get(`/meetings/${linkCode}/places`);
  return response.data;
};
