import { Sequelize } from 'sequelize-typescript';
import User from "../models/User";

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'ts',
    username: 'root',
    password: '',
    host: 'localhost',
    port: 3306,
    models: [User],
});

export default sequelize;
