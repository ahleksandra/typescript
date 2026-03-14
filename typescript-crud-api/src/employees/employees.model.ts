import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface EmployeeAttributes {
    id: number;
    employeeId: string;
    email: string;
    position?: string;
    hireDate?: Date;
    departmentId?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface EmployeeCreationAttributes extends Optional<EmployeeAttributes, 'id' | 'hireDate' | 'departmentId' | 'createdAt' | 'updatedAt'> {}

export class Employee extends Model<EmployeeAttributes, EmployeeCreationAttributes> implements EmployeeAttributes {
    public id!: number;
    public employeeId!: string;
    public email!: string;
    public position?: string;
    public hireDate?: Date;
    public departmentId?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Employee {
    Employee.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            employeeId: { type: DataTypes.STRING, allowNull: false, unique: true },
            email: { type: DataTypes.STRING, allowNull: false },
            position: { type: DataTypes.STRING, allowNull: true },
            hireDate: { type: DataTypes.DATE, allowNull: true },
            departmentId: { type: DataTypes.INTEGER, allowNull: true },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        },
        {
            sequelize,
            modelName: 'Employee',
            tableName: 'Employees',
            timestamps: true,
        }
    );

    return Employee;
}
