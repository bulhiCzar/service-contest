const { Schema, model } = require('mongoose')


const schema = new Schema({
    contestId: { type: String, required: true },
    data: { type: String, required: true },
})

module.exports = model('Prize', schema)