import axios from "axios";
import { apiVersion, baseUrl } from "../config";
import type { PlayerCreateDto, PlayerUpdateDto } from "../types/player";

export const getAllPlayers = async () => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/players`);
  return res.data;
};

export const getPlayerById = async (playerId: number) => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/players/${playerId}`);
  return res.data;
};

export const createPlayer = async (player: PlayerCreateDto) => {
  const res = await axios.post(`${baseUrl}/${apiVersion}/players`, player);
  return res.data;
};

export const updatePlayer = async (
  playerId: number,
  player: PlayerUpdateDto
) => {
  const res = await axios.put(
    `${baseUrl}/${apiVersion}/players/${playerId}`,
    player
  );
  return res.data;
};

export const deletePlayer = async (playerId: number) => {
  const res = await axios.delete(
    `${baseUrl}/${apiVersion}/players/${playerId}`
  );
  return res.data;
};
