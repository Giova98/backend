import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Order = sequelize.define('Orders', {
    ID_Orders: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    State: {
        type: DataTypes.ENUM("En proceso", "Entregada", "Cancelada"),
        allowNull: false
    },
    DistributionDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    ID_Buyers: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Orders',
    timestamps: false
});

Order.associate = (models) => {
    Order.hasMany(models.OrderDetail, {
        foreignKey: 'ID_Orders',
        as: 'OrderDetails'
    });

    Order.belongsTo(models.Buyers, {
        foreignKey: 'ID_Buyers',
        as: 'Buyer'
    });
};

export default Order;
