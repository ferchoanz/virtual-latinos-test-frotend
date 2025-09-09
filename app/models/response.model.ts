import type { User } from "./user.model";

export interface ResponseModel<T = any> {
  status: boolean;
  number_status: number | string;
  data: T;
  message?: string
}

export interface AuthResponse {
  user: Omit<User, 'token'>;
  token: string;
  message?: string
} 
