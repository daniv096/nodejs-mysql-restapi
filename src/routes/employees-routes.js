import { Router } from "express"
import {getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee, getXpusuarios } from '../controllers/empleyees-controlles.js'
import {loginUser} from '../controllers/empleyees-controlles.js'
//const { loginUser } = require('../controllers/empleyees-controlles.js');

const router = Router()

router.get('/employees', getEmployees)
router.get('/employees/:id', getEmployee)
router.post('/employees', createEmployees)
router.patch('/employees/:id', updateEmployees)
router.delete('/employees/:id', deleteEmployees)
router.get('/xpusuario', getXpusuarios)
router.post('/login', loginUser)

export default router
