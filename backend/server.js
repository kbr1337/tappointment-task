const express = require('express')
const cors = require('cors')
const api = require('./api')

const srv = express()


srv.use(cors())
srv.use(express.json())
srv.use('/api', api)


srv.listen(1337, () => {
    console.log('[Tappointment Calc] Server is listening on port 1337!')
})