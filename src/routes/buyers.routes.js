import { Router } from 'express';
import Buyers from '../models/buyers.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/buyers/:id', async (req, res) => {
  try {
    const buyer = await Buyers.findByPk(req.params.id);
    if (buyer) res.json(buyer);
    else res.status(404).json({ error: 'Comprador no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar comprador' });
  }
});

router.post('/buyers', async (req, res) => {
  try {
    const newBuyer = await Buyers.create(req.body);
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

const SECRET_KEY = 'aguante-messi';

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const buyer = await Buyers.findOne({ where: { Email: email } });

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
        nickname: buyer.NickName,
        email: buyer.Email,
      },
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;

