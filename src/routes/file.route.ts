/* External dependencies */
import { Router } from 'express';

/* Internal dependencies */
import FileController from '../controllers/file.controller';
import { Routes } from '../interfaces/routes.interface';
import fileMiddleware from '../middlewares/file.middleware';

export default class FileRoute implements Routes {
  public path = '/file';
  public router = Router();
  public fileController = new FileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, fileMiddleware, this.fileController.uploadFile);
    this.router.get(`${this.path}/list`, fileMiddleware, this.fileController.listFiles);
    this.router.get(`${this.path}/:id`, fileMiddleware, this.fileController.getFileById);
    this.router.delete(`${this.path}/:id`, fileMiddleware, this.fileController.removeFile);
    this.router.get(`${this.path}/download/:id`, fileMiddleware, this.fileController.download);
  }
}
