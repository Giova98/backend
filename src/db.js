import { Sequelize } from "sequelize";

const sequelize = new Sequelize("CarpinChords", "root", "Giovani123", {
  host: "localhost",
  dialect: "mysql"
});

export default sequelize;