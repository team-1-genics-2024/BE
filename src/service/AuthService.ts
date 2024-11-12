import { 
  LoginRequest, 
  LoginResponse, 
  AuthRequest, 
  RefreshRequest, 
  RefreshResponse, 
  TokenPayload, 
  RefreshTokenPayload,
  LogoutRequest 
} from "../model/AuthModel";
import { UserRepository } from "../repository/UserRepository";
import { SessionRepository } from "../repository/SessionRepository";
import { ResponseError } from "../error/ResponseError";
import { Validation } from "../utils/validation";
import { UserValidation } from "../validation/UserValidation";
import { SessionValidation } from "../validation/SessionValidation";
import bcrypt from "bcrypt";
import { JwtToken } from "../utils/jwtToken";
import { Session } from "../model/AuthModel";
import { toSessionKey } from "../utils/sessionIdParse";
import { StatusCodes } from "http-status-codes";

export class AuthService {
  static async loginUser (request: LoginRequest): Promise<LoginResponse> {
    const data = Validation.validation(UserValidation.LOGIN, request.body);

    const user = await UserRepository.findByEmail(data.email);

    if (!user) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    if (!user.password){
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const payload: TokenPayload = {
      userId: user.id,
      userAgent: request.user_agent,
    };

    const token = JwtToken.generateToken(payload);

    const userAgent = request.user_agent;
    const ipAddress = request.ip_address;

    const refreshPayload: RefreshTokenPayload = {
      userId: user.id,
      userAgent: userAgent,
    };
    
    const refreshToken = JwtToken.generateRefreshToken(refreshPayload);
    const refreshExpiry = JwtToken.extractTokenExpiration(refreshToken);

    
    const session: Session = {
      userId: user.id,
      refreshToken: refreshToken,
      userAgent: userAgent,
      ipAddress: ipAddress,
      lastActive: new Date(Date.now()),
      isTimedOut: false,
      expiry: refreshExpiry,
    }
    
    const validSessionReq = Validation.validation(SessionValidation.CREATE, session);
    const sessionKey = toSessionKey(user.id);
    // --- SORI GES BENTAR AKU COMMENT DULU YA 'JUAN'
    await SessionRepository.create(sessionKey, validSessionReq);

    return {
      accessToken: token,
      refreshToken: refreshToken,
    }
  }

  static async loginWithGoogle (request: AuthRequest): Promise<LoginResponse> {
    const user = request.user;

    if (!user) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Unauthorized!");
    }

    const payload: TokenPayload = {
      userId: user.id,
      userAgent: request.headers['user-agent'] as string,
    };

    const token = JwtToken.generateToken(payload);

    const userAgent = request.headers['user-agent'] as string;
    const ipAddress = request.ip as string;

    const refreshPayload: RefreshTokenPayload = {
      userId: user.id,
      userAgent: userAgent,
    };
    
    const refreshToken = JwtToken.generateRefreshToken(refreshPayload);
    const refreshExpiry = JwtToken.extractTokenExpiration(refreshToken);

    const session: Session = {
      userId: user.id,
      refreshToken: refreshToken,
      userAgent: userAgent,
      ipAddress: ipAddress,
      lastActive: new Date(Date.now()),
      isTimedOut: false,
      expiry: refreshExpiry,
    }
    
    const validSessionReq = Validation.validation(SessionValidation.CREATE, session);
    const sessionKey = toSessionKey(user.id);
    await SessionRepository.create(sessionKey, validSessionReq);

    return {
      accessToken: token,
      refreshToken: refreshToken,
    }
  }

  static async refreshUserToken (request: RefreshRequest): Promise<RefreshResponse> {
    const data = Validation.validation(SessionValidation.REFRESH_TOKEN, request);

    const refreshPayload: TokenPayload = JwtToken.verifyRefreshToken(data.refreshToken);

    const sessionKey = toSessionKey(refreshPayload.userId);

    const session = await SessionRepository.findByKey(sessionKey);

    if (!session) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Unauthorized!");
    }
    
    if (data.refreshToken !== session.refreshToken) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Unauthorized!");
    }
    
    if (session.userAgent !== data.userAgent || session.ipAddress !== data.ipAddress) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Unauthorized!");
    }
    
    const payload: TokenPayload = {
      userId: session.userId,
      userAgent: session.userAgent,
    };

    const token = JwtToken.generateToken(payload);

    await SessionRepository.updateByKey(sessionKey);

    return {
      accessToken: token,
    }
  }

  static async logoutUser (request: LogoutRequest) {
    const userId = request.userId as number;
    const sessionKey = toSessionKey(userId);

    const session = await SessionRepository.findByKey(sessionKey);

    if (!session) {
      throw new ResponseError(StatusCodes.UNAUTHORIZED, "Unauthorized!");
    }

    await SessionRepository.deleteByKey(sessionKey);
  }
}