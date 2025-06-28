// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  provider: AuthProvider;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  provider: AuthProvider;
  code: string;
  redirectUri: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  tokens: AuthTokens;
}

export enum AuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook'
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface GoogleProfile {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface FacebookProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  picture?: {
    data: {
      url: string;
    };
  };
} 