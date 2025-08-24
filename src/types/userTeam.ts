import type { Player } from "./player";
import type { User } from "./user";

export type UserTeam = {
  id: number;
  name: string;
  overallRating: number;
  marketValue: number;
  budget: number;
  points: number;
  rank: number;
  formation: Formation;
  owner: User;
  players?: Player[];
  captain?: Player;
};

export type UserTeamUpdateDto = {
  name?: string;
  budget?: number;
  points?: number;
  rank?: number;
  formation?: Formation;
  captainId?: number;
};

export type Formation =
  | "4-4-2"
  | "4-3-3"
  | "4-2-3-1"
  | "4-1-2-1-2"
  | "4-1-4-1"
  | "4-5-1"
  | "3-5-2"
  | "3-4-3"
  | "3-6-1"
  | "3-3-3-1"
  | "5-3-2"
  | "5-4-1"
  | "4-3-2-1"
  | "4-2-2-2"
  | "4-2-4";
