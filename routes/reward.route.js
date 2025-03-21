import express from 'express'
const router = express.Router()

import { addReward, getReward } from '../controllers/reward.controller.js'

router.post('/', addReward)
router.get('/', getReward)

export default router