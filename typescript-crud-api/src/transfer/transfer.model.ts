import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface TransferAttributes {
    id: number;
    employeeId: number;
    fromDepartmentId?: number;
    toDepartmentId?: number;
    transferDate?: Date;
    reason?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TransferCreationAttributes extends Optional<TransferAttributes, 'id' | 'fromDepartmentId' | 'toDepartmentId' | 'transferDate' | 'reason' | 'createdAt' | 'updatedAt'> {}

export class Transfer extends Model<TransferAttributes, TransferCreationAttributes> implements TransferAttributes {
    public id!: number;
    public employeeId!: number;
    public fromDepartmentId?: number;
    public toDepartmentId?: number;
    public transferDate?: Date;
    public reason?: string;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Transfer {
    Transfer.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            employeeId: { type: DataTypes.INTEGER, allowNull: false },
            fromDepartmentId: { type: DataTypes.INTEGER, allowNull: true },
            toDepartmentId: { type: DataTypes.INTEGER, allowNull: true },
            transferDate: { type: DataTypes.DATE, allowNull: true },
            reason: { type: DataTypes.TEXT, allowNull: true },
            status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        },
        {
            sequelize,
            modelName: 'Transfer',
            tableName: 'Transfers',
            timestamps: true,
        }
    );

    return Transfer;
}
