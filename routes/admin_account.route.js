import express from 'express'
const router = express.Router()

import { addAdmin, getAdmin, getPending, LogIn } from '../controllers/admin_account.controller.js'

router.get('/', getAdmin)
router.post('/signup', addAdmin)
router.post('/login', LogIn)
router.get('/pending', getPending)


export default router