const { Schema, model } = require('mongoose')


const schema = new Schema({
    contestId: { type: String, required: true },
    type: {type: String},
    amount: {type: Number},
    data: { type: String, required: true },
})

module.exports = model('Prize', schema)