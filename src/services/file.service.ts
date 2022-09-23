/* External dependencies */
import fs from 'fs';
import path from 'path';

/* Internal dependencies */
import { CreateFileDto } from 'dtos/file.dto';
import IFile from 'interfaces/file.interface';
import DB from '../DB/config';
import { HttpException } from '../exceptions/HttpException';

export default class FileService {
  public files = DB.Files;

  public async uploadFileData(fileData: any): Promise<IFile> {
    const [file_name, extension] = fileData.originalname.split('.');
    const mimeType = fileData.mimetype;
    const fileSize = fileData.size;

    const findFile: IFile = await this.files.findOne({ where: { file_name: file_name } });

    if (findFile) throw new HttpException(409, `The ${file_name}.${extension} is already exists`);

    const createFileData: IFile = await this.files.create({
      file_name,
      ext: extension,
      mimeType,
      size: fileSize,
    });

    return createFileData;
  }

  public async listFiles(pagination: object): Promise<any> {
    const allFiles = await this.files.findAndCountAll({ ...pagination });

    return allFiles;
  }

  public async getFileById(fileId: number): Promise<IFile> {
    const findOneFile = await this.files.findByPk(fileId);

    if (!findOneFile) throw new HttpException(404, 'File not found');

    return findOneFile;
  }

  public async removeFile(fileId: number): Promise<IFile> {
    const findOneFile = await this.files.findByPk(fileId);

    if (!findOneFile) throw new HttpException(404, 'File not found');

    await Promise.all([
      //@ts-ignore
      this.files.destroy({ where: { id: findOneFile.dataValues.id } }),

      fs.unlink(
        //@ts-ignore
        path.join('./uploads', `${findOneFile.dataValues.file_name}.${findOneFile.dataValues.ext}`),
        (err) => {
          if (err) {
            throw new HttpException(404, 'Error: ' + err);
          }
        }
      ),
    ]);

    return findOneFile;
  }

  public async download(fileId: number): Promise<IFile> {
    const findFile = await this.files.findOne({ where: { id: fileId } });

    if (!findFile) throw new HttpException(404, 'File not found');

    return findFile;
  }
}
