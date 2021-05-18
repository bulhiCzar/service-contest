const { Schema, model, Types} = require('mongoose')


const schema = new Schema({
    date: { type: Date, required: true, default: new Date() },
    image: { type: String, required: true },
    size: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
})

module.exports = model('Image', schema)