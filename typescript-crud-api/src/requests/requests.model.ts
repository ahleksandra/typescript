import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface RequestAttributes {
    id: number;
    userId: number;
    type: string;
    items: any; // JSON
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RequestCreationAttributes extends Optional<RequestAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}

export class RequestModel extends Model<RequestAttributes, RequestCreationAttributes> implements RequestAttributes {
    public id!: number;
    public userId!: number;
    public type!: string;
    public items!: any;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RequestModel {
    RequestModel.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER, allowNull: false },
            type: { type: DataTypes.STRING, allowNull: false },
            items: { type: DataTypes.JSON, allowNull: false },
            status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        },
        {
            sequelize,
            modelName: 'Request',
            tableName: 'Requests',
            timestamps: true,
        }
    );

    return RequestModel;
}
