import axios from "axios";
import { apiVersion, baseUrl } from "../config";
import type { UserTeamUpdateDto } from "../types/userTeam";

export const getAllUserTeams = async () => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/user-teams)`);
  return res.data;
};

export const getUserTeamById = async (userTeamId: number) => {
  const res = await axios.get(
    `${baseUrl}/${apiVersion}/user-teams/${userTeamId}`
  );
  return res.data;
};

export const getUserTeamByName = async (userTeamName: string) => {
  const res = await axios.get(
    `${baseUrl}/${apiVersion}/user-teams/name/${userTeamName}`
  );
  return res.data;
};

export const updateUserTeam = async (
  userTeamId: number,
  userTeam: UserTeamUpdateDto
) => {
  const res = await axios.put(
    `${baseUrl}/${apiVersion}/user-teams/${userTeamId}`,
    userTeam
  );
  return res.data;
};

export const addPlayerToUserTeam = async (
  userTeamId: number,
  playerId: number
) => {
  const res = await axios.post(
    `${baseUrl}/${apiVersion}/user-teams/${userTeamId}/players/${playerId}`
  );
  return res.data;
};

export const removePlayerFromUserTeam = async (
  userTeamId: number,
  playerId: number
) => {
  const res = await axios.delete(
    `${baseUrl}/${apiVersion}/user-teams/${userTeamId}/players/${playerId}`
  );
  return res.data;
};
