import express from 'express'
const router = express.Router()

import { getStatistic } from '../controllers/statistic.controller.js'

router.get('/', getStatistic)

export default router