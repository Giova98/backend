import Publications from "../models/publication.js";
import Category from "../models/category.js";
import SubCategory from "../models/subCategory.js";

export const getAll = async () => {
  return Publications.findAll({
    include: [
      {
        model: Category,
        attributes: ['ID_Category', 'CategoryName'],
      },
      {
        model: SubCategory,
        attributes: ['ID_SubCategory', 'NameSubCategory'],
      }
    ]
  });
};

export const getById = async (id) => Publications.findByPk(id);

export const create = async (data) => Publications.create(data);

export const update = async (id, data) => {
  const pub = await Publications.findByPk(id);
  if (!pub) return null;
  return await pub.update(data);
};

export const remove = async (id) => {
  const pub = await Publications.findByPk(id);
  if (!pub) return null;
  await pub.destroy();
  return pub;
};

export const getLatest = async (limit = 5) => {
  return await Publications.findAll({
    order: [["created_at", "DESC"]],
    limit,
  });
};