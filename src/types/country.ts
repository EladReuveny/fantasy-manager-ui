import type { Club } from "./club";
import type { Competition } from "./competition";
import type { Player } from "./player";

export type Country = {
  id: number;
  name: string;
  isoCode: string;
  flagUrl: string;
  players?: Player[];
  clubs?: Club[];
  competitions?: Competition[];
};

export type CountryCreateDto = {
  name: string;
  isoCode: string;
  flagUrl: string;
};

export type CountryUpdateDto = {
  name?: string;
  isoCode?: string;
  flagUrl?: string;
};
