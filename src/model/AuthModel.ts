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
  ip_address: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
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

export interface Session {
  userId: number;
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
  lastActive: Date;
  isTimedOut: boolean;
  expiry: number;
}

export interface LogoutRequest {
  userId: number;
}