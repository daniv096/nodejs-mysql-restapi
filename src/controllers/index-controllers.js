import {pool} from '../db.js'

export const ping = async (req,res) => {
    const [result] = await pool.query('Ping correcto')
    res.json(result[0])
}