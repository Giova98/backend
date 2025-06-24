import express from "express";
import * as service from "../services/publications.services.js";
import { getSellerByPublicationId, createPublication } from "../services/publications.services.js";
import models from "../models/index.js";

const { Publications, Category, SubCategory, City, Province, Sellers, Buyers } = models;


const router = express.Router();

router.post('/publications', createPublication);

router.get("/admin/publicaciones", async (req, res) => {
  try {
    const pubs = await service.getAll();
    res.json(pubs);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener publicaciones (admin)" });
  }
});

router.get("/publications/latest", async (req, res) => {
  try {
    const latestPubs = await service.getLatest(5);
    res.json(latestPubs);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener publicaciones recientes" });
  }
});

router.get("/publications", async (req, res) => {
  try {
    const pubs = await service.getAll();
    res.json(pubs);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener publicaciones" });
  }
});

router.get('/seller/:sellerId', async (req, res) => {
  try {
    const publications = await Publications.findAll({
      where: { ID_Sellers: req.params.sellerId },
      include: [
        { model: Category, },
        { model: SubCategory },
        {
          model: City, as: 'City', include: [{
            model: Province,
            as: 'Province',
            attributes: ['ID_Province', 'Name']
          }]
        },
        { model: Sellers, as: 'Seller', include: [{ model: Buyers, as: 'Buyer' }] }
      ]
    });

    res.json(publications);
  } catch (error) {
    console.error("Error al obtener publicaciones del vendedor:", error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.get('/publications/:id/seller', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const seller = await getSellerByPublicationId(id);

    if (!seller) return res.status(404).json({ message: 'Vendedor no encontrado' });

    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/publications/:id", async (req, res) => {
  const pub = await service.getById(req.params.id);
  if (!pub) return res.status(404).json({ message: "No encontrada" });
  res.json(pub);
});


router.put('/publications/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Publications.update(req.body, {
      where: { ID_Publication: id }
    });

    if (updated === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    const updatedPost = await Publications.findByPk(id);
    res.json(updatedPost);

  } catch (err) {
    console.error('Error al actualizar publicación:', err);
    res.status(500).json({ message: 'Error al actualizar', error: err.message });
  }
});

router.delete("/publications/:id", async (req, res) => {
  try {
    const pub = await service.remove(req.params.id);
    if (!pub) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    return res.json({ message: "Eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});


router.delete("/admin/publicaciones/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  try {
    const deleted = await service.remove(id);
    if (!deleted) return res.status(404).json({ message: "Publicación no encontrada" });
    res.json({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar publicación" });
  }
});

export default router;