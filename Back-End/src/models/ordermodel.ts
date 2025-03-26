import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "../models/usermodel";

class Order extends Model {
  public id!: number;
  public userId!: number;
  public totalAmount!: number;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, modelName: "order" }
);

export default Order;
