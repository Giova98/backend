import express from 'express';
import models from '../models/index.js';

const router = express.Router();
const { Province, City } = models;

// 1. Traer todas las provincias con sus ciudades
router.get('/provincias-ciudades', async (req, res) => {
    try {
        const provincias = await Province.findAll({
            include: {
                model: City,
                attributes: ['ID_City', 'Name'],
            },
            attributes: ['ID_Province', 'Name'],
            order: [['Name', 'ASC'], [City, 'Name', 'ASC']],
        });
        res.json(provincias);
    } catch (error) {
        console.error('Error al obtener provincias y ciudades:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
});

// 2. Traer ciudades por ID de provincia
router.get('/ciudades/:provinciaId', async (req, res) => {
    try {
        const { provinciaId } = req.params;
        const ciudades = await City.findAll({
            where: { ID_Province: provinciaId },
            attributes: ['ID_City', 'Name'],
            order: [['Name', 'ASC']],
        });
        res.json(ciudades);
    } catch (error) {
        console.error('Error al obtener ciudades:', error);
        res.status(500).json({ error: 'Error al obtener ciudades' });
    }
});

export default router;
