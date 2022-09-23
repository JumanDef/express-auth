/* External dependencies */
import { Router } from 'express';

/* Internal dependencies */
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/users.dto';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, this.authController.signUp);
    this.router.post(`${this.path}signin`, this.authController.signIn);
    this.router.get(`${this.path}logout`, authMiddleware, this.authController.logOut);
    this.router.get(`${this.path}info`, authMiddleware, this.authController.getCurrentUser);
  }
}

export default AuthRoute;
