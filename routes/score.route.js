import express from 'express'
const router = express.Router()

import { getScores } from '../controllers/score.controller.js'

router.get('/', getScores)

export default router