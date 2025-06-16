import express from 'express';
import models from '../models/index.js';

const router = express.Router();
const { Category, SubCategory } = models;

router.get('/categorias', async (req, res) => {
  try {
    const categorias = await Category.findAll({
      attributes: ['ID_Category', 'CategoryName'],
      order: [['CategoryName', 'ASC']]
    });
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

router.get('/:id/subcategorias', async (req, res) => {
  try {
    const { id } = req.params;
    const subcategorias = await SubCategory.findAll({
      where: { ID_Category: id },
      attributes: ['ID_SubCategory', 'NameSubCategory'],
      order: [['NameSubCategory', 'ASC']]
    });
    res.json(subcategorias);
  } catch (error) {
    console.error("Error al obtener subcategorías", error);
    res.status(500).json({ error: "Error al obtener subcategorías" });
  }
});

export default router;
