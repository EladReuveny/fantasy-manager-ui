import axios from "axios";
import { apiVersion, baseUrl } from "../config";
import type { CountryCreateDto, CountryUpdateDto } from "../types/country";

export const getAllCountries = async () => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/countries`);
  return res.data;
};

export const getCountryById = async (countryId: number) => {
  const res = await axios.get(
    `${baseUrl}/${apiVersion}/countries/${countryId}`
  );
  return res.data;
};

export const createCountry = async (country: CountryCreateDto) => {
  const res = await axios.post(`${baseUrl}/${apiVersion}/countries`, country);
  return res.data;
};

export const updateCountry = async (
  countryId: number,
  country: CountryUpdateDto
) => {
  const res = await axios.put(
    `${baseUrl}/${apiVersion}/countries/${countryId}`,
    country
  );
  return res.data;
};

export const deleteCountry = async (countryId: number) => {
  const res = await axios.delete(
    `${baseUrl}/${apiVersion}/countries/${countryId}`
  );
  return res.data;
};

export const createCountries = async (countries: CountryCreateDto[]) => {
  const res = await axios.post(
    `${baseUrl}/${apiVersion}/countries/create-countries`,
    countries
  );
  return res.data;
};
