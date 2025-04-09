import { Router } from "express"
import {getXpusuarios } from '../controllers/xpusuario-controlles.js'

const router = Router()

router.get('/xpusuarios', getXpusuarios)

export default router