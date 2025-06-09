import models from '../models/index.js';

const { Buyers, Sellers } = models;

export async function findBuyerById(id) {
  return await Buyers.findByPk(id);
}

export async function createBuyer(data) {
  return await Buyers.create(data);
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
  const { buyerId } = req.body; // recibo ID_Buyers del cliente

  if (!buyerId) {
    return res.status(400).json({ message: 'Debe enviar el ID del comprador.' });
  }

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