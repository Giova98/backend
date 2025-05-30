import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Publications = sequelize.define("publications", {
  ID_Publication: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Brand: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  DescriptionProduct: {
    type: DataTypes.TEXT
  },
  Price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  ImageUrl: {
    type: DataTypes.STRING(200)
  },
  State: {
    type: DataTypes.ENUM("nuevo", "usado", "refurbished", "reparado"),
    allowNull: false,
    defaultValue: "nuevo"
  },
  Sku: {
    type: DataTypes.STRING(100)
  },
  ID_Category: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ID_SubCategory: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ID_City: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: "updated_at"
});

Publications.associate = (models) => {
  Publications.belongsTo(models.Category, {
    foreignKey: 'ID_Category',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  Publications.belongsTo(models.SubCategory, {
    foreignKey: 'ID_SubCategory',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  Publications.belongsTo(models.City, {
    foreignKey: 'ID_City',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
};

export default Publications;
