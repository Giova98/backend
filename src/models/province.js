import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Province = sequelize.define("province", {
  ID_Province: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false
});

Province.associate = (models) => {
  Province.hasMany(models.City, {
    foreignKey: 'ID_Province'
  });
};

export default Province;
