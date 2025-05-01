import { Router } from "express"
import { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee, getXpusuarios, descontarCredito } from '../controllers/empleyees-controlles.js'
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
import { getArticulosPorTienda } from '../controllers/empleyees-controlles.js';
import { getSaldoEfectivo } from '../controllers/empleyees-controlles.js';
import { getBancos } from "../controllers/empleyees-controlles.js";
import { getCuentasUsuario } from "../controllers/empleyees-controlles.js";
import { getMovimientosPago } from "../controllers/empleyees-controlles.js";
import { crearMovimiento } from '../controllers/empleyees-controlles.js';
import { desCredito } from '../controllers/empleyees-controlles.js';

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
router.get('/categoria', getCategoria);
router.get('/artxtienda/:tiendaId', getArticulosPorTienda);
router.get('/saldoefectivo/:usu_codigo', getSaldoEfectivo);
router.get('/bancos', getBancos);
router.get('/cuentas/:usu_codigo', getCuentasUsuario);
router.get('/movimientos/:usu_codigo', getMovimientosPago);
router.post('/crearmovavance', crearMovimiento);
router.post('/descredito', desCredito);




export default router



