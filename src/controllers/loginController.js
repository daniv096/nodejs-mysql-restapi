const pool = require('../db');

const loginUser = async (req, res) => {
  const { usu_correo, usu_clave } = req.body;

  if (!usu_correo || !usu_clave) {
    return res.status(400).json({ success: false, message: 'Correo y clave requeridos' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, usu_nombre, usu_correo FROM xp_usuarios WHERE usu_correo = ? AND usu_clave = ?',
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

module.exports = {
  loginUser,
};