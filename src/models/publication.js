
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Publications = sequelize.define("Publications", {
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
  }
}, {
  timestamps: false
});

export default Publications;
