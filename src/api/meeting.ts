import { AxiosResponse } from "axios";
import { apiClient } from "./client";

export interface CreateMeetingRequest {
  name: string;
  purpose: string;
}

export interface CreateMeetingResponse {
  linkCode: string;
}

export interface Meeting {
  name: string;
  purpose: string;
}


export const createMeeting = async (
  data: CreateMeetingRequest
): Promise<CreateMeetingResponse> => {
  const response: AxiosResponse<CreateMeetingResponse> = await apiClient.post(
    "/meetings/",
    data
  );
  return response.data;
};

export const getMeeting = async (
  linkCode: string
): Promise<Meeting> => {
  const response: AxiosResponse<Meeting> = await apiClient.get(
    `/meetings/${linkCode}/info`
  );
  return response.data;
};


