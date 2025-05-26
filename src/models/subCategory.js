import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const SubCategory = sequelize.define("SubCategories", {
  ID_SubCategory: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  NameSubCategory: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  ID_Category: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

SubCategory.associate = (models) => {
  SubCategory.belongsTo(models.Category, {
    foreignKey: 'ID_Category',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });

  SubCategory.hasMany(models.Publications, {
    foreignKey: 'ID_SubCategory',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  });
};

export default SubCategory;
