import express from 'express'
import Contact from '../models/contact.js'

const router = express.Router()

router.post('/api/contact', async (req, res) => {
  const { name, phone, email, asunto, message } = req.body

  try {
    const newContact = await Contact.create({
      Name: name,
      Phone: phone,
      Email: email,
      Subject: asunto,
      Message: message
    })

    res.status(201).json({ message: 'Mensaje enviado correctamente', contact: newContact })
  } catch (error) {
    console.error('Error al guardar el contacto:', error)
    res.status(500).json({ error: 'Ocurrió un error al enviar el mensaje' })
  }
})

export default router
