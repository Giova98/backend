import Buyers from '../models/buyers.js';

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