import express from 'express'
const router = express.Router()

import { updatePrePostTest } from '../controllers/preposttest.controller.js'

router.put('/', updatePrePostTest)

export default router