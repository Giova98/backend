import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Province from "./province.js";

const City = sequelize.define("city", {
    ID_City: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    ID_Province: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
});

City.associate = (models) => {
    City.belongsTo(models.Province, { foreignKey: "ID_Province" });
    City.hasMany(models.Publications, { foreignKey: "ID_City" });
};

export default City;
