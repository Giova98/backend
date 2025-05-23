import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Buyers = sequelize.define('Buyers', {
  ID_Buyers: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  BuyersName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  NickName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  Passwords: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  RegistrationDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  Phone: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true
  },
  QuantityPurchases: {
    type: DataTypes.INTEGER
  },
  DNI: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

export default Buyers;
