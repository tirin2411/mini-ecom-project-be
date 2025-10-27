import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'mini-ecom',
  'postgres',
  'T^@n48(I)EppBw8K',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

export default sequelize;