import Category from './category.js';
import SubCategory from './subCategory.js';
import Publications from './publication.js';
import Province from './province.js';
import Buyers from './buyers.js';
import City from './city.js';
import Sellers from './sellers.js';
import Contact from './contact.js';
import sequelize from '../db.js';
import Order from './order.js';
import OrderDetail from './orderDetail.js';
import Chats from './chats.js';

const models = {
  sequelize,
  Chats,
  Order,
  OrderDetail,
  Contact,
  Sellers,
  Category,
  SubCategory,
  Publications,
  Province,
  Buyers,
  City,
};

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

export {
  sequelize,
  Chats,
  Order,
  OrderDetail,
  Contact,
  Sellers,
  Category,
  SubCategory,
  Publications,
  Province,
  Buyers,
  City,
};

export default models;
