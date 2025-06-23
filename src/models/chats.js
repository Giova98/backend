import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Chats = sequelize.define('Chats', {
  ID_Chat: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ID_Buyers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_User: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'Chats'
});

Chats.associate = (models) => {
  Chats.belongsTo(models.Buyers, {
    foreignKey: 'ID_Buyers',
    as: 'Buyer',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });

  Chats.belongsTo(models.Buyers, {
    foreignKey: 'ID_User',
    as: 'User',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });

  Chats.hasMany(models.Messages, {
    foreignKey: 'ID_Chat',
    as: 'messages',
    onDelete: 'CASCADE'
  });
};

export default Chats;
