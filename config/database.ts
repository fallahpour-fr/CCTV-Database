import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('cctvdatabase', 'cctvuser', 'cctvpassword', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
