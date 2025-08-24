import type { Club } from "./club";
import type { Country } from "./country";
import type { UserTeam } from "./userTeam";

export type Player = {
  id: number;
  name: string;
  age: number;
  position: Position;
  rating: number;
  marketValue: number;
  wage: number;
  imageUrl: string;
  club?: Club;
  nationality: Country;
  userTeams?: UserTeam[];
};

export type PlayerCreateDto = {
  name: string;
  age: number;
  position: Position;
  rating: number;
  marketValue: number;
  wage: number;
  imageUrl: string;
  clubId?: number;
  nationalityId: number;
};

export type PlayerUpdateDto = {
  name?: string;
  age?: number;
  position?: Position;
  rating?: number;
  marketValue?: number;
  wage?: number;
  imageUrl?: string;
  clubId?: number;
  nationalityId?: number;
};

export type Position =
  | "GK"
  | "LB"
  | "CB"
  | "RB"
  | "LWB"
  | "RWB"
  | "CDM"
  | "CM"
  | "LM"
  | "RM"
  | "CAM"
  | "RW"
  | "LW"
  | "ST"
  | "CF";

export const positionColors: Record<
  Position,
  [textBaseColor: string, bgBaseColorLighter: string, borderBaseColor: string]
> = {
  // Goalkeeper
  GK: ["text-purple-500", "bg-purple-500/15", "border-purple-500"],

  // Defenders
  LB: ["text-emerald-500", "bg-emerald-500/15", "border-emerald-500"],
  CB: ["text-emerald-500", "bg-emerald-500/15", "border-emerald-500"],
  RB: ["text-emerald-500", "bg-emerald-500/15", "border-emerald-500"],
  LWB: ["text-emerald-500", "bg-emerald-500/15", "border-emerald-500"],
  RWB: ["text-emerald-500", "bg-emerald-500/15", "border-emerald-500"],

  // Midfielders
  CDM: ["text-yellow-300", "bg-yellow-300/15", "border-yellow-500"],
  CM: ["text-yellow-300", "bg-yellow-300/15", "border-yellow-500"],
  LM: ["text-yellow-300", "bg-yellow-300/15", "border-yellow-500"],
  RM: ["text-yellow-300", "bg-yellow-300/15", "border-yellow-500"],
  CAM: ["text-yellow-300", "bg-yellow-300/15", "border-yellow-500"],

  // Wingers
  RW: ["text-blue-500", "bg-blue-500/15", "border-blue-500"],
  LW: ["text-blue-500", "bg-blue-500/15", "border-blue-500"],

  // Forwards / Strikers
  ST: ["text-red-500", "bg-red-500/15", "border-red-500"],
  CF: ["text-red-500", "bg-red-500/15", "border-red-500"],
};
