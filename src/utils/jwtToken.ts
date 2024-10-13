import jwt from 'jsonwebtoken';
import { TokenPayload } from '../model/AuthModel';

export class JwtToken {
    static generateToken(payload: TokenPayload): string {
      const secret = process.env.JWT_SECRET as string;
      return jwt.sign(payload, secret, { expiresIn: process.env.JWT_DURATION as string });
    }

    static generateRefreshToken(payload: TokenPayload): string {
      const secret = process.env.JWT_REFRESH_SECRET as string;
      return jwt.sign(payload, secret, { expiresIn: process.env.JWT_REFRESH_DURATION as string });
    }

    static verifyRefreshToken(token: string): TokenPayload {
      const secret = process.env.JWT_REFRESH_SECRET as string;
      return jwt.verify(token, secret) as TokenPayload;
    }

    static validateRefreshToken(token: string): boolean {
      const secret = process.env.JWT_REFRESH_SECRET as string;
      return jwt.verify(token, secret) ? true : false;
    }

    static extractTokenExpiration(token: string): number {
      const decoded = jwt.decode(token) as { exp: number };
      return decoded.exp;
    }
}