import axios from "axios";
import { apiVersion, baseUrl } from "../config";
import type {
  UserSignInDto,
  UserSignUpDto,
  UserUpdateDto,
} from "../types/user";

export const getAllUsers = async () => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/users`);
  return res.data;
};

export const getUserById = async (userId: number) => {
  const res = await axios.get(`${baseUrl}/${apiVersion}/users/${userId}`);
  return res.data;
};

export const signUpUser = async (user: UserSignUpDto) => {
  const res = await axios.post(`${baseUrl}/${apiVersion}/users/sign-up`, user);
  return res.data;
};

export const updateUser = async (userId: number, user: UserUpdateDto) => {
  const res = await axios.put(`${baseUrl}/${apiVersion}/users/${userId}`, user);
  return res.data;
};

export const deleteUser = async (userId: number) => {
  const res = await axios.delete(`${baseUrl}/${apiVersion}/users/${userId}`);
  return res.data;
};

export const signInUser = async (user: UserSignInDto) => {
  const res = await axios.post(`${baseUrl}/${apiVersion}/users/sign-in`, user);
  return res.data;
};
