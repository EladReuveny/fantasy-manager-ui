import type { UserTeam } from "./userTeam";

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  userTeam: UserTeam | null;
};

export type UserCreateDto = {
  email: string;
  password: string;
  userTeamName: string;
};

export type UserUpdateDto = {
  email?: string;
  password?: string;
  role?: Role;
};

type Role = "ADMIN" | "USER";
