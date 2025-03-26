import express from 'express'
const router = express.Router()

import { addAdmin, getAdmin, LogIn } from '../controllers/admin_account.controller.js'

router.get('/', getAdmin)
// router.get('/guardianID', searchGuardian)
router.post('/signup', addAdmin)
router.post('/login', LogIn)


export default router