import { Request } from "express";

export interface User {
  id: number;
  name: string;
}

export interface LoginRequest {
  body: {
    email: string;
    password: string;
  };
  user_agent: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  refreshToken: string;
  userAgent: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface TokenPayload {
  userId: number;
  userAgent: string;
}

export interface RefreshTokenPayload {
  userId: number;
  userAgent: string;
}

export interface AuthRequest extends Request {
  user: User;
}

