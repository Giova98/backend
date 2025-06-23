import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Messages = sequelize.define('Messages', {
    ID_Message: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    time: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ID_Chat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Chats',
            key: 'ID_Chat'
        }
    }
}, {
    timestamps: false,
    tableName: 'Messages'
});

Messages.associate = (models) => {
    Messages.belongsTo(models.Chats, {
        foreignKey: 'ID_Chat',
        as: 'chat'
    });
    
    Messages.belongsTo(models.Buyers, {
        foreignKey: 'sender_id',
        as: 'Sender'
    });
};

export default Messages;
