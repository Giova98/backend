
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

export const createPublication = async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      condition,
      categoryId,
      subCategoryId,
      description,
      image,
      cityId,
      sellerId
    } = req.body;

    const newPublication = await Publications.create({
      Title: name,
      Brand: brand,
      Price: price,
      State: condition,
      ID_Category: categoryId,
      ID_SubCategory: subCategoryId,
      DescriptionProduct: description,
      ImageUrl: image,
      ID_City: cityId,
      ID_Sellers: sellerId
    });

    res.status(201).json(newPublication);
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
};

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