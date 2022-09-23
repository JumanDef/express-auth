/* External dependencies */
import { NextFunction, Request, Response } from 'express';
import Jwt, { verify } from 'jsonwebtoken';

/* Internal dependencies */
import { SECRET_KEY } from './../common/index';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  let token: string;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return new HttpException(401, 'Authentication token is not provided.');
  }

  try {
    const decoded = Jwt.verify(token, SECRET_KEY);
    req.user = decoded as any;

    next();
  } catch (err) {
    return new HttpException(400, 'Wrong authentication token');
  }
};

export default authMiddleware;
