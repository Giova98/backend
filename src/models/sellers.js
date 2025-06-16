import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Sellers = sequelize.define("Sellers", {
  ID_Sellers: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  RegistrationDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  QuantitySales: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  ID_Buyers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false
});

Sellers.associate = (models) => {
  Sellers.belongsTo(models.Buyers, {
    foreignKey: 'ID_Buyers',
    as: 'Buyer',
    onUpdate: 'CASCADE',
  });
};

export default Sellers;
