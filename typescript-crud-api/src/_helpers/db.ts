import config from '../../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

export interface Database {
    User: any;
    Department: any;
    Employee: any;
    Request: any;
    Transfer: any;
}

export const db: Database = {} as Database;

export async function initialize(): Promise<void> {
    const { host, port, user, password, database } = config.database;

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql'});

    const { default: userModel } = await import('../users/user.model');
    db.User = userModel(sequelize);
    const { default: departmentModel } = await import('../departments/departments.model');
    db.Department = departmentModel(sequelize);

    const { default: employeeModel } = await import('../employees/employees.model');
    db.Employee = employeeModel(sequelize);

    const { default: requestModel } = await import('../requests/requests.model');
    db.Request = requestModel(sequelize);

    const { default: transferModel } = await import('../transfer/transfer.model');
    db.Transfer = transferModel(sequelize);

    await sequelize.sync({ alter: true});

    console.log('Database initialized and models synced');
}