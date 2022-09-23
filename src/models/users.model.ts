/* External dependencies */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

/* Internal dependencies */
import { User } from '../interfaces/user.interface';

export type UserCreationAttributes = Optional<User, 'email' | 'password'>;

export class UserModel extends Model<User> implements User {
  id: number;
  email: string;
  password: string;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address',
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'users',
      sequelize,
    }
  );

  return UserModel;
}
