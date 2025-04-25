import { Router } from "express"
import { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee, getXpusuarios } from '../controllers/empleyees-controlles.js'
import { loginUser } from '../controllers/empleyees-controlles.js'
import { getMovimientosPorCedula } from '../controllers/empleyees-controlles.js';
import { createUsuario } from '../controllers/empleyees-controlles.js';
import { createxUsuario } from '../controllers/empleyees-controlles.js';
import { getUsuarios } from '../controllers/empleyees-controlles.js';
import { getUsuarioDetalle } from '../controllers/empleyees-controlles.js';
import { getUsuario } from '../controllers/empleyees-controlles.js';
import { Userdata } from '../controllers/empleyees-controlles.js';
import { getArticulos } from '../controllers/empleyees-controlles.js';
import { createCompra } from '../controllers/empleyees-controlles.js';
import {registrarCuotas} from '../controllers/empleyees-controlles.js';
import {actualizarSaldo} from '../controllers/empleyees-controlles.js';
import { getTiendas } from '../controllers/empleyees-controlles.js';
import { getCategoria } from "../controllers/empleyees-controlles.js";

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
router.get('/detalleusuario/:codigo', getUsuarioDetalle);
router.get('/idusuario/:codigo', getUsuario);
router.post('/iduser', Userdata);
router.get('/articulos', getArticulos);
router.get('/tiendas', getTiendas);
router.post('/createcompra', createCompra);
router.post('/registrarCuotas', registrarCuotas);
router.post('/actualizarSaldo',actualizarSaldo);
router.post('/categoria', getCategoria);

export default router
