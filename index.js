const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(bodyParser.json())

app.use('/api', require('./api/router'))

app.use('/', express.static(`./client/build`))
app.use('*', express.static(`./client/build`))

global.models = {
    Contest: require('./models/Contest'),
    Info: require('./models/Info'),
    Prize: require('./models/Prize'),
}


async function startBD() {
    try {
        await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => { console.log(`App started on post ${PORT}`); })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startBD()