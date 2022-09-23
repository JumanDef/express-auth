/* External dependencies */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

/* Internal dependencies */
import IFile from 'interfaces/file.interface';

export class FileModel extends Model<IFile> implements IFile {
  public id: number;
  public file_name: string;
  public ext: string;
  public mimeType: string;
  public size: number;

  public createdAt: Date;
  public updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof FileModel {
  FileModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      file_name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      ext: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      mimeType: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      size: {
        allowNull: false,
        type: DataTypes.INTEGER(),
      },
    },
    {
      tableName: 'files',
      sequelize,
    }
  );

  return FileModel;
}
