import express from 'express'
const router = express.Router()

import { addUser, getUser, updateLevel } from '../controllers/user.controller.js'

router.get('/', getUser)
router.post('/', addUser)
router.put('/', updateLevel)

export default router