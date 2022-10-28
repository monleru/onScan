const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router.js')
const crypto = require('crypto');

const PORT = process.env.PORT || 5000;
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.post('/', )
async function startApp() {
    try {
        app.listen(PORT, () => { console.log('Server has been started...'+ PORT) })
    } catch (e) {
        console.log(e)
    }
}

startApp()