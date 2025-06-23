import { Router } from 'express'
import models from '../models/index.js'
import { Op } from 'sequelize';

const router = Router()
const { Chats, Buyers, Messages } = models


router.get('/chat/:id', async (req, res) => {
    const user_id = req.params.id;

    try {
        const chats = await Chats.findAll({
            where: {
                [Op.or]: [
                    { ID_User: user_id },
                    { ID_Buyers: user_id }
                ]
            },
            include: [
                {
                    model: Buyers,
                    as: 'Buyer',
                    attributes: ['ID_Buyers', 'avatarUrl', 'BuyersName', 'BuyersLastName', 'NickName', 'Phone']
                },
                {
                    model: Buyers,
                    as: 'User',
                    attributes: ['ID_Buyers', 'avatarUrl', 'BuyersName', 'BuyersLastName', 'NickName', 'Phone']
                }
            ]
        });

        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los chats' });
    }
});

router.put('/chat/:id_user', (req, res) => {
    const id = req.params.id_user
})

router.post('/chat', async (req, res) => {
    try {
        const { seller_id, user_id } = req.body;

        const existingChat = await Chats.findOne({
            where: {
                [Op.or]: [
                    { ID_User: user_id, ID_Buyers: seller_id },
                    { ID_User: seller_id, ID_Buyers: user_id }
                ]
            }
        });

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const newChat = await Chats.create({
            ID_User: user_id,
            ID_Buyers: seller_id
        });

        res.status(201).json(newChat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hay un error al crear el chat' });
    }
});

router.post('/messages', async (req, res) => {
    try {
        const { sender_id, text, time, chat_id } = req.body;

        const message = await Messages.create({
            sender_id,
            text,
            time,
            ID_Chat: chat_id
        });

        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo crear el mensaje' });
    }
});

router.get('/message/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Messages.findAll({
      where: { ID_Chat: chatId },
      include: [
        {
          model: Buyers,
          as: 'Sender',
          attributes: ['BuyersName', 'BuyersLastName', 'NickName', 'avatarUrl']
        }
      ],
      order: [['ID_Message', 'ASC']]
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});
export default router;