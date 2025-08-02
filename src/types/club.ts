import type { Country } from "./country";
import type { League } from "./league";
import type { Player } from "./player";

export type Club = {
  id: number;
  name: string;
  logoUrl: string;
  country: Country;
  establishedAt: Date;
  players: Player[];
  leagues: League[];
};
