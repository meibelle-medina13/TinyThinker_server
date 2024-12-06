import express from 'express'
const router = express.Router()

import { addGuardian, getGuardian, LogIn, searchGuardian, VerifyBirthYear } from '../controllers/user_guardian.controller.js'

router.get('/', getGuardian)
router.get('/guardianID', searchGuardian)
router.post('/', addGuardian)
router.post('/login', LogIn)
router.post('/verify_year', VerifyBirthYear)


export default router