import express from 'express';
import models from '../models/index.js';

const router = express.Router();

router.post('/api/purchase', async (req, res) => {
  const { comprador, id, paymentType } = req.body;

  if (
    !comprador ||
    !comprador.ID_Buyer ||
    !id
  ) {
    return res.status(400).json({ message: 'Datos incompletos para crear la compra.' });
  }

  try {
    const buyerId = comprador.ID_Buyer;

    // Crear la orden
    const newOrder = await models.Order.create({
      State: 'En proceso',
      DistributionDate: new Date(),
      ID_Buyers: buyerId
    });

    await models.OrderDetail.create({
      PaymentType: paymentType,
      ID_Publications: id,
      ID_Orders: newOrder.ID_Orders,

      nombre: comprador.nombre,
      email: comprador.email,
      telefono: comprador.telefono,
      pais: comprador.pais,
      provincia: comprador.provincia,
      ciudad: comprador.ciudad,
      cp: comprador.cp,
      calle: comprador.calle,
      dpto: comprador.dpto || null,
    });

    res.status(201).json({ message: 'Pedido recibido con éxito', orderId: newOrder.ID_Orders });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
});

export default router;