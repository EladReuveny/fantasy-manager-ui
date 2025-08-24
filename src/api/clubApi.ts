import axios from "axios";
import { apiVersion, baseUrl } from "../config";
import type { ClubCreateDto, ClubUpdateDto } from "../types/club";

export const getAllClubs = async () => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/clubs`);
  return res.data;
};

export const getClubById = async (clubId: number) => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/clubs/${clubId}`);
  return res.data;
};

export const createClub = async (club: ClubCreateDto) => {
  const res = await axios.post(`${baseUrl}/${apiVersion}/clubs`, club);
  return res.data;
};

export const updateClub = async (clubId: number, club: ClubUpdateDto) => {
  const res = await axios.put(`${baseUrl}/${apiVersion}/clubs/${clubId}`, club);
  return res.data;
};

export const deleteClub = async (clubId: number) => {
  const res = await axios.delete(`${baseUrl}/${apiVersion}/clubs/${clubId}`);
  return res.data;
};
