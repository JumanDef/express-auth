/* External dependencies */
import { Sequelize } from 'sequelize';

const connectionDB = new Sequelize('auth', 'root', '123', {
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
});

connectionDB.authenticate();

const DB = {
  // Offices: OfficeModel(connectionDB),
  // Requisites: RequisiteModel(connectionDB),
  // Users: UserModel(connectionDB),
  // UserStatistics: UserStatisticsModel(connectionDB),
  // DepositStatistics: DepositStatisticsModel(connectionDB),
  // Packages: PackageModel(connectionDB),
  // UserPackages: UserPackagesModel(connectionDB),
  // Earnings: EarningsModel(connectionDB),
  // Transactions: TransactionsModel(connectionDB),
  // Feedback: FeedbackModel(connectionDB),
  // Withdraw: WithdrawModel(connectionDB),
  // News: NewsModel(connectionDB),
  connectionDB,
  Sequelize,
};

export default DB;
