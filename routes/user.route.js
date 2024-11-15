import express from 'express'
const router = express.Router()

import { addUser, getUser } from '../controllers/user.controller.js'

router.get('/', getUser)
router.post('/', addUser)

export default router