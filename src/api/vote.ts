import { AxiosResponse } from "axios";
import { apiClient } from "./client";
import { PlaceItem } from "./place";
export interface VoteRequest {
  slotNo: number;
}

export interface VoteResponse {
  myVoteSlotNos: number[];
  patches: {
    slotNo: number;
    votedByMe: boolean;
  }[];
}

export type VoteResultResponse = (PlaceItem & { voteCount: number })[];

export const votePlace = async (
  inviteCode: string,
  data: VoteRequest
): Promise<VoteResponse> => {
  const response: AxiosResponse<VoteResponse> = await apiClient.post(
    `/meetings/${inviteCode}/vote`,
    data
  );
  return response.data;
};

export const getVoteResult = async (
  inviteCode: string
): Promise<VoteResultResponse[]> => {
  const response: AxiosResponse<VoteResultResponse[]> = await apiClient.get(
    `/meetings/${inviteCode}/result`
  );
  return response.data;
};


