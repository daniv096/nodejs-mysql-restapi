import {pool} from '../db.js'

export const getEmployees = async ( req, res ) => {
    try {
    const [ rows ] = await pool.query('SELECT * FROM employee')
    res.json(rows)    
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong'
        })
    }
}

export const getEmployee = async ( req, res ) => {
    try {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
        message: 'Employee not found'
    })
    res.json(rows[0])
    } catch (error) {
    return res.status(500).json({
    message: 'Something goes wrong'
    })
    }

}

export const createEmployees = async (req,res) => {
    try {
    const {name, salary} = req.body
    const [ rows ] = await pool.query('INSERT INTO employee (name, salary) VALUE (? , ? )', [ name, salary] )    
    res.send({
        id: rows.insertId,
        name,
        salary,    
    })
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong'
        })
    }
}

export const deleteEmployees = async (req,res) => {
    try {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
    if (result.affectedRows <= 0) return res.status(404).json(
        {
            messaje: 'Employee not found'
        })
    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong'
        })
    }
}
/*
mysql://root:WLSpHFmYTudNZuPqkmmcEYHEOkQEzobg@metro.proxy.rlwy.net:38964/railway
root
WLSpHFmYTudNZuPqkmmcEYHEOkQEzobg
metro.proxy.rlwy.net
38964
railway

mysql://
root:
AcyjfLpDUATsNCBjkxJlKbvMWVUMtxRv
shinkansen.proxy.rlwy.net
49572
railway
*/


export const updateEmployees = async ( req, res) => {    
    const {id} = req.params
    const {name, salary} = req.body
    console.log(id,name,salary)
    try {
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name) , salary = IFNULL(?, salary) WHERE id = ? ', [name, salary, id])
    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Employee not found'
    })
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    console.log(result)
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong'
        })
    }
}

export const getXpusuarios = async ( req, res ) => {
    try {
    const [ rows ] = await pool.query('SELECT * FROM xp_usuarios')
    res.json(rows)    
    } catch (error) {
        return res.status(500).json({
        message: 'No se encontro la tabla'
        })
    }
}


export const loginUser = async (req, res) => {
  const { usu_correo, usu_clave } = req.body;
  console.log(usu_correo, usu_clave)

  if (!usu_correo || !usu_clave) {
    return res.status(400).json({ success: false, message: 'Correo y clave requeridos' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM xp_usuarios WHERE usu_correo = ? AND usu_clave = ?',
      [usu_correo, usu_clave]
    );

    if (rows.length > 0) {
      return res.json({ success: true, user: rows[0] });
    } else {
      return res.json({ success: false, message: 'Correo o clave incorrectos' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

export const Userdata = async (req, res) => {
  const { usu_codigo } = req.body;

  if (!usu_codigo) {
    return res.status(400).json({ success: false, message: 'Código de usuario requerido' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM xp_usuarios WHERE usu_codigo = ?',
      [usu_codigo]
    );

    if (rows.length > 0) {
      return res.json({ success: true, user: rows[0] });
    } else {
      return res.json({ success: false, message: 'Código incorrecto' });
    }
  } catch (error) {
    console.error('Error en consulta de usuario:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};


export const getMovimientosPorCedula = async (req, res) => {
    const { cedula } = req.params;
  
    try {
      const [rows] = await pool.query(
        "SELECT * FROM xp_movimientos WHERE mov_codigo = ?",
        [cedula]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "No se encontraron movimientos para esta cédula" });
      }
  
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener movimientos", error });
    }
  };


  /*export const createUsuario = async (req, res) => {
    try {
      const {
        usu_codigo,
        usu_cedula,
        usu_nombre,
        usu_apellido,
        usu_correo,
        usu_clave,
        usu_telefono
      } = req.body;
  
      const [rows] = await pool.query(
        'INSERT INTO xp_usuarios (usu_codigo, usu_cedula, usu_nombre, usu_apellido, usu_correo, usu_clave, usu_telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [usu_codigo, usu_cedula, usu_nombre, usu_apellido, usu_correo, usu_clave, usu_telefono]
      );
  
      res.send({
        usu_codigo,
        usu_cedula,
        usu_nombre,
        usu_apellido,
        usu_correo,
        usu_clave,
        usu_telefono
      });
    } catch (error) {
      console.error('Error en createUsuario:', error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  };*/


  /*export const createxUsuario = async (req, res) => {
    try {
      const {
        usu_codigo,
        usu_cedula,
        usu_nombre,
        usu_apellido,
        usu_correo,
        usu_clave,
        usu_telefono          
      } = req.body;
      console.log(usu_codigo, usu_cedula, usu_nombre, usu_apellido, usu_correo, usu_clave, usu_telefono)
      const [rows] = await pool.query(
        'INSERT INTO xp_usuarios (usu_codigo, usu_cedula, usu_nombre, usu_apellido, usu_correo, usu_clave, usu_telefono ) VALUES (?,?,?,?,?,?,? )',
        [usu_codigo, usu_cedula, usu_nombre, usu_apellido, usu_correo, usu_clave, usu_telefono]
      );
  
      res.send({
        usu_codigo,
        usu_cedula,
        usu_nombre,
        usu_apellido,
        usu_correo,
        usu_clave,
        usu_telefono
      });
    } catch (error) {
      console.error('Error en createUsuario:', error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  };*/

  /*const createUsuario = async (req, res) => {
    const { nombre, apellido, correo, telefono, clave } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO xp_usuarios (usu_nombre, usu_apellido, usu_correo, usu_telefono, usu_clave) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, correo, telefono, clave]
      );
      res.json({ message: 'Usuario creado', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  };*/

  export const createUsuario = async (req, res) => {
    const { cedula, nombre, apellido, correo, telefono, clave } = req.body;
  
    try {
      // Verificar si la cédula ya existe
      const [cedulaExistente] = await pool.query(
        `SELECT usu_codigo FROM xp_usuarios WHERE usu_cedula = ?`,
        [cedula]
      );
  
      if (cedulaExistente.length > 0) {
        return res.status(400).json({ message: 'La cédula ya está registrada' });
      }
  
      // Obtener el último código insertado
      const [rows] = await pool.query(`
        SELECT usu_codigo FROM xp_usuarios
        ORDER BY usu_codigo DESC
        LIMIT 1
      `);
  
      let nuevoCodigo = '0000000001';
  
      if (rows.length > 0) {
        const ultimoCodigo = parseInt(rows[0].usu_codigo, 10);
        const siguiente = ultimoCodigo + 1;
        nuevoCodigo = siguiente.toString().padStart(10, '0');
      }
  
      // Insertar nuevo usuario
      await pool.query(
        `INSERT INTO xp_usuarios 
          (usu_codigo, usu_cedula, usu_nombre, usu_apellido, usu_correo, usu_clave, usu_telefono)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nuevoCodigo, cedula, nombre, apellido, correo, clave, telefono]
      );
  
      res.json({ message: 'Usuario creado exitosamente', codigo: nuevoCodigo });
  
    } catch (error) {
      console.error('Error en createUsuario:', error);
      res.status(500).json({ message: 'Algo salió mal al crear el usuario' });
    }
  };

  export const getUsuarios = async ( req, res ) => {
    try {
    const [ rows ] = await pool.query('SELECT * FROM xp_usuarios')
    res.json(rows)    
    } catch (error) {
        return res.status(500).json({
        message: 'Something goes wrong'
        })
    }
}
  
  export const createxUsuario = async (req, res) => {
    const { cedula, foto } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO xp_datos (dat_cedula, dat_foto) VALUES (?, ?)',
        [cedula, foto]
      );
      res.json({ message: 'Datos del usuario creados', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear los datos del usuario' });
    }
  };

  export const getUsuarioDetalle = async (req, res) => {
    const { codigo } = req.params;
  
    try {
      const [rows] = await pool.query(`
        SELECT 
          u.usu_codigo,
          u.usu_nombre,
          u.usu_apellido,
          c.saldo_credito,
          c.saldo_restante,
          m.tipo_movimiento,
          m.monto,
          m.saldo_actual,
          m.fecha_movimiento,
          m.descripcion
        FROM xp_usuarios u
        JOIN xp_creditos c ON u.usu_codigo = c.usu_codigo
        LEFT JOIN xp_movimientos_credito m ON u.usu_codigo = m.usu_codigo
        WHERE u.usu_codigo = ?
      `, [codigo]);
  
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener detalle de usuario:', error);
      res.status(500).json({ message: 'Error al obtener detalle del usuario' });
    }
  };

  export const getUsuario = async (req, res) => {
    const { codigo } = req.params;
  
    try {
      const [rows] = await pool.query(`
        SELECT 
          u.usu_codigo,
          u.usu_nombre,
          u.usu_apellido,
          c.saldo_credito,
          c.saldo_restante,
          m.tipo_movimiento,
          m.monto,
          m.saldo_actual,
          m.fecha_movimiento,
          m.descripcion
        FROM xp_usuarios u
        JOIN xp_creditos c ON u.usu_codigo = c.usu_codigo
        LEFT JOIN xp_movimientos_credito m ON u.usu_codigo = m.usu_codigo
        WHERE u.usu_codigo = ?
      `, [codigo]);
  
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener detalle de usuario:', error);
      res.status(500).json({ message: 'Error al obtener detalle del usuario' });
    }
  };

  export const getArticulos = async (req, res) => {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM xp_articulos WHERE art_tipo = ?',
        ['P']
      );
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener artículos' });
    }
  };

  export const getArticulosPorTienda = async (req, res) => {
    const { tiendaId } = req.params; // Obtenemos el ID de la tienda desde los parámetros
  
    // Validamos primero que tiendaId exista y sea un número
    if (!tiendaId || isNaN(tiendaId)) {
      return res.status(400).json({ message: 'ID de tienda inválido o faltante.' });
    }
  
    try {
      // Hacemos la consulta de artículos por tienda
      const [rows] = await pool.query(
        'SELECT * FROM xp_articulos WHERE tie_codigo = ?',
        [tiendaId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron artículos para esta tienda.' });
      }
  
      res.json(rows); // Devolvemos los artículos encontrados
    } catch (error) {
      console.error('Error al obtener los artículos de la tienda:', error);
      res.status(500).json({ message: 'Error interno del servidor al obtener los artículos de la tienda.' });
    }
  };



  export const getCategoria = async (req, res) => {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM xp_categoria'
      );
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener categorias' });
    }
  };


 // POST /api/compras
export const createCompra = async (req, res) => {
  const { usu_codigo, art_codigo, com_cantidad, com_cuota_inicial, com_total, com_cuotas } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO xp_compras (art_codigo, usu_codigo, com_cantidad, com_cuota_inicial, com_total, com_cuotas)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [art_codigo, usu_codigo, com_cantidad, com_cuota_inicial, com_total, com_cuotas]
    );

    const com_codigo = result.insertId;

    res.json({
      message: 'Compra registrada con éxito',
      com_codigo
    });

  } catch (error) {
    console.error('Error al crear la compra:', error);
    res.status(500).json({ message: 'Error al crear la compra' });
  }
}; 



export const registrarCuotas = async (req, res) => {
  const cuotas = req.body;

  // Verificamos que sea un array válido
  if (!Array.isArray(cuotas) || cuotas.length === 0) {
    return res.status(400).json({ message: 'Datos de cuotas incompletos o formato incorrecto' });
  }

  try {
    for (let i = 0; i < cuotas.length; i++) {
      const { com_codigo, usu_codigo, cuo_numero, cuo_fecha_pago, cuo_monto } = cuotas[i];

      if (!com_codigo || !usu_codigo || !cuo_fecha_pago || !cuo_monto) {
        return res.status(400).json({ message: `Datos faltantes en la cuota #${i + 1}` });
      }

      // Convertir fecha de "8/5/2025" a "2025-05-08"
      const partesFecha = cuo_fecha_pago.split('/');
      if (partesFecha.length !== 3) {
        return res.status(400).json({ message: `Formato de fecha incorrecto en cuota #${i + 1}` });
      }
      const fechaFormateada = `${partesFecha[2]}-${partesFecha[1].padStart(2, '0')}-${partesFecha[0].padStart(2, '0')}`;

      // Inserción en base de datos
      await pool.query(
        `INSERT INTO xp_cuotas (com_codigo, usu_codigo, cuo_numero, cuo_fecha_pago, cuo_monto)
         VALUES (?, ?, ?, ?, ?)`,
        [com_codigo, usu_codigo, cuo_numero, fechaFormateada, cuo_monto]
      );
    }

    res.json({
      message: 'Cuotas registradas con éxito',
      total: cuotas.length
    });

  } catch (error) {
    console.error('Error al registrar cuotas:', error);
    res.status(500).json({ message: 'Error al registrar las cuotas' });
  }
};

export const actualizarSaldo = async (req, res) => {
  const { usu_codigo, com_codigo } = req.body;

  if (!usu_codigo || !com_codigo) {
    return res.status(400).json({ message: 'Datos de saldo incompletos' });
  }

  try {
    // Sumar todas las cuotas asociadas a esta compra y usuario
    const [cuotas] = await pool.query(
      `SELECT SUM(cuo_monto) AS totalCuotas 
       FROM xp_cuotas 
       WHERE usu_codigo = ? AND com_codigo = ?`,
      [usu_codigo, com_codigo]
    );

    const totalCuotas = cuotas[0].totalCuotas;

    if (!totalCuotas) {
      return res.status(400).json({ message: 'No se encontraron cuotas para esta compra' });
    }

    // Actualizar saldo_restante restando el total de cuotas
    await pool.query(
      `UPDATE xp_creditos 
       SET saldo_restante = saldo_restante - ? 
       WHERE usu_codigo = ?`,
      [totalCuotas, usu_codigo]
    );

    res.json({
      message: 'Saldo actualizado correctamente',
      monto_restado: totalCuotas
    });

  } catch (error) {
    console.error('Error al actualizar saldo:', error);
    res.status(500).json({ message: 'Error al actualizar el saldo' });
  }
};

export const getTiendas = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM xp_tiendas'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tiendas' });
  }
};


export const getSaldoEfectivo = async (req, res) => {
  const { usu_codigo } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT saldo_credito FROM xp_creditos WHERE usu_codigo = ? AND tip_credito = ? LIMIT 1',
      [usu_codigo, 'E']
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Saldo no encontrado para tipo E' });
    }

    res.json({ saldo_credito: rows[0].saldo_credito });
  } catch (error) {
    console.error('Error al obtener el saldo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getBancos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT ban_codigo, Ban_nombre FROM xp_bancos ORDER BY Ban_nombre ASC');

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron bancos registrados' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los bancos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const getCuentasUsuario = async (req, res) => {
  const { usu_codigo } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT cta_numcel AS telefono, cta_cedula AS cedula, cta_numcta AS banco FROM xp_cuentausu WHERE cta_codcli = ?',
      [usu_codigo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No hay cuentas guardadas para este usuario' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las cuentas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};



