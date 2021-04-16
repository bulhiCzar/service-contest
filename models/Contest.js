const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    name: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    project: { type: String, required: true },
    prize: { type: Array, required: true },
    prizes: {type: Array},
    info: { type: Array, required: true },
    infos: {type: Array},
})

module.exports = model('Contest', schema)