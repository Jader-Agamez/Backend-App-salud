const router = require('express').Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT id, nombre FROM especialistas ORDER BY nombre', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

module.exports = router
