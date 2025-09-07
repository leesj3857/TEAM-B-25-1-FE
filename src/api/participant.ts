import { AxiosResponse } from "axios";
import { apiClient } from "./client";

export interface Participant {
  name: string;
  address: string;
  transportType: string;
  lat: number;
  lng: number;
}

export interface ParticipantRegisterResponse {
  participantId: number;
  accessToken: string;
  expiresIn: number;
  participantName: string;
}

export interface ParticipantUpdateResponse {
  name: string;
  address: string;
  transportType: string;
  lat: number;
  lng: number;
}


export interface ParticipantGetResponse {
  participantId: number;
  name: string;
  transportType: string;
  lat: number;
  lng: number;
  hasVoted: boolean;
  address: string;
}


export const registerParticipant = async (
  linkCode: string,
  data: Participant
): Promise<ParticipantRegisterResponse> => {
  const response: AxiosResponse<ParticipantRegisterResponse> =
    await apiClient.post(`/meetings/${linkCode}/participants/register`, data);
  return response.data;
};

export const getParticipants = async (
  linkCode: string
): Promise<ParticipantGetResponse[]> => {
  const response: AxiosResponse<ParticipantGetResponse[]> = await apiClient.get(
    `/meetings/${linkCode}/participants/`
  );
  return response.data;
};

export const updateParticipant = async (
  linkCode: string,
  data: Participant
): Promise<ParticipantUpdateResponse> => {
  const response: AxiosResponse<ParticipantUpdateResponse> = await apiClient.put(
    `/meetings/${linkCode}/participants/update`,
    data
  );
  return response.data;
};

export const deleteParticipant = async (
  linkCode: string
): Promise<void> => {
  const response: AxiosResponse<void> = await apiClient.delete(
    `/meetings/${linkCode}/participants/delete`
  );
  return response.data;
};

export const getMyParticipant = async (
  linkCode: string
): Promise<ParticipantGetResponse> => {
  const response: AxiosResponse<ParticipantGetResponse> = await apiClient.get(
    `/meetings/${linkCode}/participants/me`
  );
  return response.data;
};
