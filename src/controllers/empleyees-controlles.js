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

/*module.exports = {
  loginUser,
};*/

