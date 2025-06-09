
import models from "../models/index.js";

const { Publications, Category, SubCategory, City, Province, Sellers, Buyers } = models;

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
      },
      {
        model: City,
        as: 'City',
        attributes: ['ID_City', 'Name'],
        include: {
          model: Province,
          as: 'Province',
          attributes: ['ID_Province', 'Name']
        }
      },
    ]

  });
};

export const getSellerByPublicationId = async (publicationId) => {
  const publication = await Publications.findByPk(publicationId, {
    include: {
      model: Sellers,
      as: 'Seller',
      attributes: ['ID_Sellers'],
      include: {
        model: Buyers,
        as: 'Buyer',
        attributes: ['ID_Buyers', 'avatarUrl', 'BuyersName', 'BuyersLastName', 'NickName', 'Email', 'Phone'],
        include: {
          model: City,
          as: 'City',
          attributes: ['ID_City', 'Name'],
          include: {
            model: Province,
            as: 'Province',
            attributes: ['ID_Province', 'Name']
          }
        }
      }
    }
  });

  return publication?.Seller || null;
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

export async function removeBuyer(id) {
  try {
    const buyer = await Buyers.findByPk(id);
    if (!buyer) return null;

    await buyer.destroy();
    return buyer;
  } catch (error) {
    console.error("Error al eliminar buyer:", error);
    throw error;
  }
}

export const getLatest = async (limit = 5) => {
  return await Publications.findAll({
    order: [["created_at", "DESC"]],
    limit,
    include: [
      {
        model: Category,
        attributes: ['ID_Category', 'CategoryName'],
      },
      {
        model: SubCategory,
        attributes: ['ID_SubCategory', 'NameSubCategory'],
      },
      {
        model: City,
        as: 'City',
        attributes: ['ID_City', 'Name'],
        include: {
          model: Province,
          as: 'Province',
          attributes: ['ID_Province', 'Name']
        }
      }

    ]
  });
};