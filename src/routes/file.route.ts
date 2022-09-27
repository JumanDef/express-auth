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
    this.router.get(`${this.path}/list`, this.fileController.listFiles);
    this.router.get(`${this.path}/:id`, this.fileController.getFileById);
    this.router.delete(`${this.path}/delete/:id`, this.fileController.removeFile);
    this.router.get(`${this.path}/download/:id`, this.fileController.download);
    this.router.put(`${this.path}/update/:id`, fileMiddleware, this.fileController.update);
  }
}
