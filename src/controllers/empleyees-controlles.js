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

  /// rpuebas //
  
  