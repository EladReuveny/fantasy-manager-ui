import type { UserTeam } from "./userTeam";

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  userTeam: UserTeam;
};

export type UserSignUpDto = {
  email: string;
  password: string;
  userTeamName: string;
};

export type UserSignInDto = {
  email: string;
  password: string;
};

export type UserUpdateDto = {
  email?: string;
  password?: string;
  role?: Role;
  userTeamName?: string;
};

export type Role = "USER" | "ADMIN";
