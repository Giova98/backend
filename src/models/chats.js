// models/Contact.js
import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Chats = sequelize.define('Chats', {
  ID_Chat: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sender: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  time: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  text: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  ID_Buyers: {
    type: DataTypes.INTEGER,
    foreingKey: true
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'Chats'
})

Chats.associate = (models) => {
  Chats.belongsTo(models.Buyers, {
    foreignKey: 'ID_Buyers',
    as: 'Buyer',
    onUpdate: 'CASCADE',
  });
};

export default Chats;