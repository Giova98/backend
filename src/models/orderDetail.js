import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const OrderDetail = sequelize.define('OrderDetails', {
    ID_OrderDetails: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    PaymentType: {
        type: DataTypes.ENUM("effective", "credit", "debit"),
        allowNull: false
    },
    ID_Publications: {
        type: DataTypes.INTEGER
    },
    ID_Orders: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provincia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dpto: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'OrderDetails',
    timestamps: false
});

OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
        foreignKey: 'ID_Orders',
        as: 'Order'
    });

    OrderDetail.belongsTo(models.Publications, {
        foreignKey: 'ID_Publications',
        as: 'Publication'
    });
};

export default OrderDetail;
