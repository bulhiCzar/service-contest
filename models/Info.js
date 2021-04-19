const { Schema, model, Types} = require('mongoose')


const schema = new Schema({
    contestId: { type: Types.ObjectId, required: true },
    prizeId: { type: Types.ObjectId, required: true },
    type: { type: String, required: true },
    data: { type: String, required: true },
    date: { type: String, required: true },
    status: {type: String, default: 'await'},
})

module.exports = model('Info', schema)