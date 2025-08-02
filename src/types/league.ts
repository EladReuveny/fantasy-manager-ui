import type { Club } from "./club";
import type { Country } from "./country";

export type League = {
  id: number;
  name: string;
  logoUrl: string;
  establishedAt: Date;
  country: Country;
  clubs: Club[];
};
