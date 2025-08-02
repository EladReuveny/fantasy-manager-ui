import type { Club } from "./club";
import type { League } from "./league";
import type { Player } from "./player";

export type Country = {
  id: number;
  name: string;
  isoCode: string;
  flagUrl: string;
  players: Player[];
  clubs: Club[];
  leagues: League[];
};
