import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Category = sequelize.define("Categories", {
  ID_Category: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CategoryName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  timestamps: false
});

Category.associate = (models) => {
  Category.hasMany(models.SubCategory, {
    foreignKey: 'ID_Category',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });

  Category.hasMany(models.Publications, {
    foreignKey: 'ID_Category',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
};

export default Category;
