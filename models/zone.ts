import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ZoneAttributes {
  id: number;
  label: string;
}

export interface ZoneCreationAttributes extends Optional<ZoneAttributes, 'id'> {}

// Extend the class from Model with attributes and creation attributes
class Zone extends Model<ZoneAttributes, ZoneCreationAttributes> implements ZoneAttributes {
  public id!: number;
  public label!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // You can add additional instance methods if needed
}

// Function to initialize the model
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Zone.init(
    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      label: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'zones',
    }
  );

  return Zone;
};
