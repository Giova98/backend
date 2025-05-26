import sequelize from "../db.js";

import Category from "./category.js";
import SubCategory from "./subCategory.js";
import Publications from "./publication.js";

Category.associate?.({ SubCategory, Publications });
SubCategory.associate?.({ Category, Publications });
Publications.associate?.({ Category, SubCategory });

export {
  sequelize,
  Category,
  SubCategory,
  Publications
};
