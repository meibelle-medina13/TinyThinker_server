import express from 'express'
const router = express.Router()

import { addGuardian, getGuardian, searchGuardian } from '../controllers/user_guardian.controller.js'

router.get('/', getGuardian)
router.get('/guardianID', searchGuardian)
router.post('/', addGuardian)


export default router