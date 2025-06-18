import { Router } from 'express'
import models from '../models/index.js'

const router = Router()
const { Chats, Buyers } = models

router.get('/chat/:id', async (req, res) => {
    const user_id = req.params.id
    const chats = await Chats.findAll({
        where: {ID_User: user_id},
        include: {
            model: Buyers,
            as: 'Buyer',
            attributes: ['ID_Buyers','avatarUrl', 'BuyersName', 'BuyersLastName', 'NickName', 'Phone']
        }
    });
    res.json(chats);
})

router.put('/chat/:id_user', (req, res) => {
    const id = req.params.id_user
})

router.post('/chat', async (req, res) => {
    try {
        const { seller_id, user_id } = req.body
        
        const newChat = await Chats.create({
            ID_User: user_id,
            ID_Buyers: seller_id
        })
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({error: 'Hay un error'})
    }

})

export default router;