const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
    try {
        var data = fs.readFileSync('./db.dat', 'utf8')
        return res.status(200).json(JSON.parse(data))
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
})

router.post('/', (req, res) => {
    const num = req.body.Value

    if (isNaN(num) || num === null)
        return res.status(400).json({ msg: 'Invalid input' })

    try {
        fs.writeFile('./db.dat', JSON.stringify(req.body), err => {
            if (err) return res.status(500).json({ msg: err })
        })

    } catch (err) {
        return res.status(500).json({ msg: err })
    }

    res.status(200).json({ msg: 'Success' })
})

module.exports = router
