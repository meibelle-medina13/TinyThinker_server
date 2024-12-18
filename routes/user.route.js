import express from 'express'
const router = express.Router()

import { addUser, getUser, updateLevel, updateProfile, updateTheme } from '../controllers/user.controller.js'

router.get('/', getUser)
router.post('/', addUser)
router.put('/updateLevel', updateLevel)
router.put('/updateTheme', updateTheme)
router.put('/updateProfile', updateProfile)

export default router