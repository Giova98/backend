import sequelize from "../db.js";
import Category from "./category.js";
import SubCategory from "./subCategory.js";
import Publications from "./publication.js";
import Province from "./province.js";
import City from "./city.js";

const models = {
  sequelize,
  Category,
  SubCategory,
  Publications,
  Province,
  City
};

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

export {
  sequelize,
  Category,
  SubCategory,
  Publications,
  Province,
  City
};

export default models;
