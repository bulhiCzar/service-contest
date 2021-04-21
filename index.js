const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')



require('dotenv').config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/api', require('./api/router'))

app.use('/', express.static(`./client/build`))
app.use('*', express.static(`./client/build`))




async function startBD() {
    try {
        global.mongoConnect = await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        global.models = {
            Contest: require('./models/Contest'),
            Info: require('./models/Info'),
            Prize: require('./models/Prize'),
            Committee: require('./models/Committee')
        }


        app.listen(PORT, () => { console.log(`App started on post ${PORT}`); })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startBD()