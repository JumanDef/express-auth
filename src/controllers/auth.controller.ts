/* External dependencies */
import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';

/* Internal dependencies */
import { CreateUserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';
import { SECRET_KEY } from '../common';
import DB from '../DB/config';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

export default class AuthController {
  private cleanResult = (result: any) => {
    delete result.id;
    delete result.password;
    delete result.createdAt;
    delete result.updatedAt;

    return result;
  };

  public authService = new AuthService();
  public users = DB.Users;

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;

      const user = await this.authService.signup(userData);

      const registeredUser = await this.users.findOne({ where: { email: user.email } });
      const expiresIn: string = '10m';

      if (registeredUser) {
        const token = Jwt.sign({ id: registeredUser.email }, SECRET_KEY, { expiresIn });
        res.cookie('jwt', this.authService.createCookie({ token, expiresIn }));
        res.status(201).json({
          status: 'Success',
          message: 'Successfully registered',
          token: token,
          //@ts-ignore
          data: this.cleanResult(registeredUser.dataValues),
        });
      }
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { token, findUser } = await this.authService.signin(userData);

      res.cookie('jwt', this.authService.createCookie({ token, expiresIn: '10m' }));
      // @ts-ignore
      res.status(200).json({ data: this.cleanResult(findUser.dataValues), status: 'success', token: token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;

      const logOutUserData: User = await this.authService.logout(userData);

      res.cookie('jwt', '', { maxAge: 0 });
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);

      res.status(200).json({
        // @ts-ignore
        data: this.cleanResult(logOutUserData.dataValues),
        status: 'Success',
        message: 'Successfully logged out',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCurrentUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const currentUser: User = await this.authService.getCurrentUser(userData);

      res.status(200).json({ status: 'success', user: currentUser.email });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData = await this.authService.refreshToken(req.user);

      res.status(200).json({ status: 'success', accessToken: userData.token, refreshToken: userData.refreshToken });
    } catch (error) {
      next(error);
    }
  };
}
