import type { Competition } from "./competition";
import type { Country } from "./country";
import type { Player } from "./player";

export type Club = {
  id: number;
  name: string;
  logoUrl: string;
  country: Country;
  establishedAt: Date;
  players?: Player[];
  competitions?: Competition[];
};

export type ClubCreateDto = {
  name: string;
  logoUrl: string;
  countryId: number;
  establishedAt?: Date;
  competitionsIds?: number[];
};

export type ClubUpdateDto = {
  name?: string;
  logoUrl?: string;
  countryId?: number;
};
