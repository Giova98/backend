import Category from './category.js';
import SubCategory from './subCategory.js';
import Publications from './publication.js';
import Province from './province.js';
import Buyers from './buyers.js';
import City from './city.js';
import Sellers from './sellers.js';
import sequelize from '../db.js';

const models = {
  sequelize,
  Sellers,
  Category,
  SubCategory,
  Publications,
  Province,
  Buyers,
  City
};

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

export {
  sequelize,
  Sellers,
  Category,
  SubCategory,
  Publications,
  Province,
  Buyers,
  City
};

export default models;
