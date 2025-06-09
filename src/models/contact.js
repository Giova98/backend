// models/Contact.js
import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Contact = sequelize.define('Contact', {
  ID_Contact: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  Subject: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'Contact'
})

export default Contact
