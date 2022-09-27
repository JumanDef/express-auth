/* External dependencies */
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

/* Internal dependencies */
import DB from '../DB/config';
import IFile from '../interfaces/file.interface';
import FileService from '../services/file.service';
import getPagination from '../utils/pagination';

export default class FileController {
  public fileService = new FileService();
  public files = DB.Files;

  public uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileData = await this.fileService.uploadFileData(req.file);

      res.status(200).json({ file: fileData });
    } catch (error) {
      next(error);
    }
  };

  public listFiles = async (req: Request, res: Response, next: NextFunction) => {
    const { page, size } = req.query;

    try {
      const query = getPagination(Number(page), Number(size));
      const listFiles = await this.fileService.listFiles(query);

      res.status(200).json({ data: listFiles, status: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getFileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileId = Number(req.params.id);
      const data = await this.fileService.getFileById(fileId);

      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  };

  public removeFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileId = Number(req.params.id);
      const data = await this.fileService.removeFile(fileId);

      res.status(200).json({ status: 'success', message: `Successfully deleted file: ${data.file_name}.${data.ext}` });
    } catch (error) {
      next(error);
    }
  };

  public download = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileId: number = Number(req.params.id);
      const findFile: IFile = await this.fileService.download(fileId);
      const fileName: string = `${findFile.file_name}.${findFile.ext}`;
      const filePath = path.join('./uploads', fileName);
      const filestream = fs.createReadStream(filePath);

      res.setHeader('Content-disposition', 'attachment: filename=' + fileName);
      res.status(200);

      filestream.pipe(res);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.fileService.update(Number(req.params.id), req.file);

      res.status(200).json({ updatedFile: data });
    } catch (error) {
      next(error);
    }
  };
}
