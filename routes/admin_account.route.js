import express from 'express'
const router = express.Router()

import { addAdmin, approveRequest, declineRequest, getAdmin, getPending, LogIn, updateAdminAccount } from '../controllers/admin_account.controller.js'

router.get('/', getAdmin)
router.post('/signup', addAdmin)
router.post('/login', LogIn)
router.get('/pending', getPending)
router.put('/edit', updateAdminAccount)
router.put('/approve', approveRequest)
router.delete('/', declineRequest)

export default router