import { AxiosResponse } from "axios";
import { apiClient } from "./client";

export interface PlaceItem {
  placeId: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  slotNo: number;
  url: string;
  votedByMe: boolean;
}

export interface PlaceSection {
  key: string;
  label: string;
  items: PlaceItem[];
}

export interface PlaceResponseDto {
  sections: PlaceSection[]
  myVoteSlotNos: number[]
  page: number
  hasMore: boolean
}

export type StrategyType = "TIME_MATRIX" | "SUBWAY" ;

export interface MidpointResponseDto {
  midpointId: number;
  name: string;
  latitude: number;
  longitude: number;
  line: string;
  avgTime: number;
  totalDeviation: number;
  participantId: number;
  selfTimeSeconds: number;
  participantCount: number;
}

export const getPlaces = async (
  linkCode: string
): Promise<PlaceResponseDto> => {
  const response: AxiosResponse<PlaceResponseDto> =
    await apiClient.get(`/meetings/${linkCode}/places`);
  return response.data;
};

export const getMidpoint = async (
  inviteCode: string,
  strategyType: StrategyType = "TIME_MATRIX"
): Promise<MidpointResponseDto> => {
  const response: AxiosResponse<MidpointResponseDto> = await apiClient.get(
    `/meetings/${inviteCode}/midpoint?strategyType=${strategyType}`
  );
  return response.data;
};


