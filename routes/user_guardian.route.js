import express from 'express'
const router = express.Router()

import { addGuardian, getGuardian, LogIn, searchGuardian } from '../controllers/user_guardian.controller.js'

router.get('/', getGuardian)
router.get('/guardianID', searchGuardian)
router.post('/', addGuardian)
router.post('/login', LogIn)


export default router