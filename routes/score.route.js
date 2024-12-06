import express from 'express'
const router = express.Router()

import { getScores, updateScore } from '../controllers/score.controller.js'

router.get('/average', getScores)
router.put('/', updateScore)

export default router