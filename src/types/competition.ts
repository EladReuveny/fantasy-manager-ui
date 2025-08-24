import type { Club } from "./club";
import type { Country } from "./country";

export type Competition = {
  id: number;
  name: string;
  logoUrl: string;
  establishedAt: Date;
  competitionType: "LEAGUE" | "CUP" | "SUPER_CUP" | "FRIENDLY";
  country?: Country;
  clubs?: Club[];
};

export type CompetitionCreateDto = {
  name: string;
  logoUrl: string;
  establishedAt?: Date;
  competitionType: "LEAGUE" | "CUP" | "SUPER_CUP" | "FRIENDLY";
  countryId?: number;
  clubsIds?: number[];
};

export type CompetitionUpdateDto = {
  name?: string;
  logoUrl?: string;
  competitionType?: "LEAGUE" | "CUP" | "SUPER_CUP" | "FRIENDLY";
  countryId?: number;
  clubsIds?: number[];
};
