/* External dependencies */
import { Request } from 'express';

/* Internal dependencies */
import { User } from './user.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
