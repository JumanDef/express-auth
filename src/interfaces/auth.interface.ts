/* External dependencies */
import { Request } from 'express';

/* Internal dependencies */
import { User } from './user.interface';

export interface DataStoredInToken {
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number | string;
}

export interface RefreshTokenData extends TokenData {
  refreshToken: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
