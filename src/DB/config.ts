/* External dependencies */
import Sequelize from 'sequelize';

/* Internal dependencies */
import FileModel from '../models/file.model';
import UserModel from '../models/users.model';
import { LoggerService } from '../utils/logger';

const logger = new LoggerService();

export const sequelize = new Sequelize.Sequelize('auth', 'root', '123', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  timezone: '+06:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    acquire: 60000,
    min: 0,
    max: 5,
  },
  logQueryParameters: true,
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  Files: FileModel(sequelize),
  sequelize,
  Sequelize,
};

export default DB;
