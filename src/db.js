import { Sequelize } from "sequelize";

const sequelize = new Sequelize("CarpinChords", "root", "chululu", {
  host: "localhost",
  dialect: "mysql"
});

export default sequelize;