import axios from "axios";
import { apiVersion, baseUrl } from "../config";
import type {
  CompetitionCreateDto,
  CompetitionUpdateDto,
} from "../types/competition";

export const getAllCompetitions = async () => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/competitions`);
  return res.data;
};

export const getCompetitionById = async (competitionId: number) => {
  const res = await axios.get(
    `${baseUrl}/${apiVersion}/competitions/${competitionId}`
  );
  return res.data;
};

export const createCompetition = async (competition: CompetitionCreateDto) => {
  const res = await axios.post(
    `${baseUrl}/${apiVersion}/competitions`,
    competition
  );
  return res.data;
};

export const updateCompetition = async (
  competitionId: number,
  competition: CompetitionUpdateDto
) => {
  const res = await axios.put(
    `${baseUrl}/${apiVersion}/competitions/${competitionId}`,
    competition
  );
  return res.data;
};

export const deleteCompetition = async (competitionId: number) => {
  const res = await axios.delete(
    `${baseUrl}/${apiVersion}/competitions/${competitionId}`
  );
  return res.data;
};

export const createCompetitions = async (
  competitions: CompetitionCreateDto[]
) => {
  const res = await axios.post(
    `${baseUrl}/${apiVersion}/competitions/create-competitions`,
    competitions
  );
  return res.data;
};

export const addClubToCompetition = async (
  competitionId: number,
  clubId: number
) => {
  const res = await axios.post(
    `${baseUrl}/${apiVersion}/competitions/${competitionId}/clubs/${clubId}`
  );
  return res.data;
};

export const removeClubFromCompetition = async (
  competitionId: number,
  clubId: number
) => {
  const res = await axios.delete(
    `${baseUrl}/${apiVersion}/competitions/${competitionId}/clubs/${clubId}`
  );
  return res.data;
};
