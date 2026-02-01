import type { Roles } from "./roles";

export type User = {
  id: number;
  name: string;
  role: Roles;
  email: string;
  password: string;
  avatar: string;
};
