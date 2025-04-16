import { Router } from "express"
import { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee, getXpusuarios } from '../controllers/empleyees-controlles.js'
import { loginUser } from '../controllers/empleyees-controlles.js'
import { getMovimientosPorCedula } from '../controllers/empleyees-controlles.js';
import { createUsuario } from '../controllers/empleyees-controlles.js';
import { createxUsuario } from '../controllers/empleyees-controlles.js';
import { getUsuarios } from '../controllers/empleyees-controlles.js';
//const { loginUser } = require('../controllers/empleyees-controlles.js');

const router = Router()

router.get('/employees', getEmployees)
router.get('/employees/:id', getEmployee)
router.post('/employees', createEmployees)
router.patch('/employees/:id', updateEmployees)
router.delete('/employees/:id', deleteEmployees)
router.get('/xpusuario', getXpusuarios)
router.post('/login', loginUser)
router.post('/movimientos', getMovimientosPorCedula)
router.post('/createusu', createUsuario)
router.post('/createxusu', createxUsuario)
router.get('/usuarios', getUsuarios )

export default router
