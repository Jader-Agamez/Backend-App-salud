const router = require('express').Router()
const db = require('../db')

router.get('/', (req, res) => {
  const { eps_id, especialista_id, nivel_max = 4 } = req.query

  if (!eps_id || !especialista_id)
    return res.status(400).json({ error: 'Parámetros requeridos: eps_id, especialista_id' })

  const sql = `
    SELECT h.id, h.nombre, h.nivel, h.direccion, h.telefono
    FROM hospitales h
    INNER JOIN hospital_eps he ON he.hospital_id = h.id AND he.eps_id = ?
    INNER JOIN hospital_especialista hes ON hes.hospital_id = h.id AND hes.especialista_id = ?
    WHERE h.nivel <= ?
    ORDER BY h.nivel ASC
  `

  db.query(sql, [eps_id, especialista_id, nivel_max], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

module.exports = router
