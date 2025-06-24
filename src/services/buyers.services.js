import { where } from 'sequelize';
import models from '../models/index.js';

const { Buyers, Sellers, Publications, OrderDetail, Chats, Messages } = models;

export async function findBuyerById(id) {
  return await Buyers.findByPk(id);
}

export async function updateBuyer(id, data) {
  const buyer = await Buyers.findByPk(id);
  if (!buyer) return null;

  await buyer.update(data);
  return buyer;
}

export async function deleteBuyer(id) {
  const buyer = await Buyers.findByPk(id);
  if (!buyer) return null;

  await buyer.destroy();
  return buyer;
}

export const createSeller = async (req, res) => {
  const { buyerId } = req.body;

  try {
    const existingSeller = await Sellers.findOne({ where: { ID_Buyers: buyerId } });

    if (existingSeller) {
      return res.status(400).json({ message: 'Ya estás registrado como vendedor.' });
    }

    const newSeller = await Sellers.create({
      ID_Buyers: buyerId,
      RegistrationDate: new Date(),
      QuantitySales: 0,
    });

    return res.status(201).json({ message: '¡Registro como vendedor exitoso!', seller: newSeller });
  } catch (error) {
    console.error('Error al registrar vendedor:', error);
    return res.status(500).json({ message: 'Error al registrar como vendedor.' });
  }
};

export async function removeBuyer(id) {
  try {
    const buyer = await Buyers.findByPk(id);
    if (!buyer) return null;

    const seller = await Sellers.findOne({ where: { ID_Buyers: id } });

    if (seller) {
      const publications = await Publications.findAll({
        where: { ID_Sellers: seller.ID_Sellers },
      });

      for (const pub of publications) {
        await OrderDetail.destroy({
          where: { ID_Publications: pub.ID_Publication },
        });
      }

      await Publications.destroy({
        where: { ID_Sellers: seller.ID_Sellers },
      });

      await seller.destroy();
    }

    await Messages.destroy({
      where: { sender_id: id}
    });

    await Chats.destroy({
      where: { 
        ID_User: id,
        ID_Buyers: id
       }
    });

    await buyer.destroy();

    return buyer;
  } catch (error) {
    console.error("Error al eliminar buyer:", error);
    throw error;
  }
}

export async function createsBuyer(data) {
  const existingBuyer = await Buyers.findOne({
    where: { Email: data.Email }
  });

  if (existingBuyer) {
    throw new Error('El email ya está registrado');
  }

  return await Buyers.create(data);
}

export async function removeSeller(id) {
  try {
    const buyer = await Buyers.findByPk(id);
    if (!buyer) return null;

    const seller = await Sellers.findOne({ where: { ID_Buyers: id } });

    if (seller) {
      const publications = await Publications.findAll({
        where: { ID_Sellers: seller.ID_Sellers },
      });

      for (const pub of publications) {
        await OrderDetail.destroy({
          where: { ID_Publications: pub.ID_Publication },
        });
      }

      await Publications.destroy({
        where: { ID_Sellers: seller.ID_Sellers },
      });

      await seller.destroy();
    }

    return buyer;
  } catch (error) {
    console.error("Error al eliminar buyer:", error);
    throw error;
  }
}