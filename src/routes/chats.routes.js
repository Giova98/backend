import {Router} from 'express'
import models from '../models/index.js'

const router = Router()
const {Chats} = models

router.get('/chats', (req, res) => {
    const chats = Chats.findAll();
    res.json(chats);
})

router.put('/chat/:id_user', (req, res) => {
    const id = req.params.id_user
})

export default router;