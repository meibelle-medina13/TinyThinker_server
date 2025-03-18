import express from 'express'
const router = express.Router()

import { updatePrePostTest, getPrePostTest } from '../controllers/preposttest.controller.js'

router.put('/', updatePrePostTest)
router.get('/', getPrePostTest)

export default router