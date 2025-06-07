import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

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
  BuyersLastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  NickName: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  Passwords: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  RegistrationDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  Phone: {
    type: DataTypes.STRING(13),
    allowNull: false
  },
  QuantityPurchases: {
    type: DataTypes.INTEGER
  },
  DNI: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  ID_City: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'Buyers'
});

Buyers.associate = (models) => {
  Buyers.belongsTo(models.City, {
    foreignKey: 'ID_City',
    as: 'City'
  });

  Buyers.hasOne(models.Sellers, {
    foreignKey: 'ID_Buyers',
    as: 'Seller'
  });
};

export default Buyers;
