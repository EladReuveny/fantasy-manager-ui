import axios from "axios";
import { apiVersion, baseUrl } from "../config";
import type { UserCreateDto, UserUpdateDto } from "../types/user";

export const getAllUsers = async () => {
  return await axios.get(`${baseUrl}/${apiVersion}/users`);
};

export const getUserById = async (userId: number) => {
  return await axios.get(`${baseUrl}/${apiVersion}/users/${userId}`);
};

export const createUser = async (user: UserCreateDto) => {
  return await axios.post(`${baseUrl}/${apiVersion}/users`, user);
};

export const deleteUser = async (userId: number) => {
  return await axios.delete(`${baseUrl}/${apiVersion}/users/${userId}`);
};

export const updateUser = async (userId: number, user: UserUpdateDto) => {
  return await axios.put(`${baseUrl}/${apiVersion}/users/${userId}`, user);
};
