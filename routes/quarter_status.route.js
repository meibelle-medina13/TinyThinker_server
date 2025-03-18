import express from 'express'
const router = express.Router()

import { updateQuarterStatus, getQuarterStatus } from '../controllers/quarter_status.controller.js'

router.put('/', updateQuarterStatus)
router.get('/', getQuarterStatus)

export default router