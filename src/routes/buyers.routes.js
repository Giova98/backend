import { Router } from 'express';
import models, { Sellers } from '../models/index.js';
const { Buyers, City, Province } = models;
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/buyers/:id', async (req, res) => {
  try {
    const buyer = await Buyers.findByPk(req.params.id, {
      include: [
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
        {
          model: Sellers,
          as: 'Seller',
          attributes: ['ID_Sellers']
        }
      ]
    });
    if (buyer) res.json(buyer);
    else res.status(404).json({ error: 'Comprador no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar comprador' });
  }
});

router.post('/buyers', async (req, res) => {
  try {
    console.log(req.body);
    const newBuyer = await Buyers.create(req.body);
    console.log(newBuyer);
    
    res.status(201).json(newBuyer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/buyers/:id', async (req, res) => {
  try {
    const buyer = await Buyers.findByPk(req.params.id);
    if (!buyer) return res.status(404).json({ error: 'No encontrado' });

    await buyer.update(req.body);
    res.json(buyer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/buyers/:id', async (req, res) => {
  try {
    const buyer = await Buyers.findByPk(req.params.id);
    if (!buyer) return res.status(404).json({ error: 'No encontrado' });

    await buyer.destroy();
    res.json({ message: 'Eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar comprador' });
  }
});

const SECRET_KEY = 'chululu';

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const buyer = await Buyers.findOne({
      where: { Email: email },
      include: [
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
        {
          model: Sellers,
          as: 'Seller',
          attributes: ['ID_Sellers']
        }
      ]
    });


    if (!buyer) {
      return res.status(401).json({ message: 'Email no registrado' });
    }

    if (password !== buyer.Passwords) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: buyer.ID_Buyers, role: 'buyer' },
      SECRET_KEY,
    );

    return res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: buyer.ID_Buyers,
        name: buyer.BuyersName,
        lastname: buyer.BuyersLastName,
        nickname: buyer.NickName,
        email: buyer.Email,
        dni: buyer.DNI,
        phone: buyer.Phone,
        registrationDate: buyer.RegistrationDate,
        quantityPurchases: buyer.QuantityPurchases,
        city: {
          id: buyer.City.ID_City,
          name: buyer.City.Name,
          province: {
            id: buyer.City.Province.ID_Province,
            name: buyer.City.Province.Name
          }
        },
        seller: buyer.Seller ? { id: buyer.Seller.ID_Sellers } : null,
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;

