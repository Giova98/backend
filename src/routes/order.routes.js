import express from "express";
import models from "../models/index.js"

const { Order, OrderDetail, Publications } = models;

const router = express.Router();

router.get("/order/buyer/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.findAll({
            where: { ID_Buyers: id },
            include: [{
                model: OrderDetail,
                as: 'OrderDetails',
                include: [{
                    model: Publications,
                    as: 'Publication'
                }]
            }]
        });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener pedidos del comprador" });
    }
});

export default router;