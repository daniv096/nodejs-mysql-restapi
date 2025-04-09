import {pool} from '../db.js'

export const getXpusuarios = async ( req, res ) => {
    try {
    const [ rows ] = await pool.query('SELECT * FROM xp_usuarios')
    res.json(rows)    
    } catch (error) {
        return res.status(500).json({
        message: 'Algo salio mal'
        })
    }
}
