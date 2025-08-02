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
  club: Club;
  nationality: Country | null;
  userTeam: UserTeam[];
};

type Position =
  | "GK"
  | "LB"
  | "CB"
  | "RB"
  | "LMB"
  | "RMB"
  | "CDM"
  | "CM"
  | "LM"
  | "RM"
  | "CAM"
  | "RW"
  | "LW"
  | "ST"
  | "CF";
