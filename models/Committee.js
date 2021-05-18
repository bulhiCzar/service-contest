const { Schema, model, Types } = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');


autoIncrement.initialize(mongoConnect);


const schema = new Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    typeLink: { type: String, required: true },
    photo: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    role: { type: String },
    dataCreate: { type: Date, default: new Date, required: true },
    idCommittee: {type: Number},
    status: { type: String, default: 'await', required: true },
    imageBig: {type: String},
    image: {type: String}
})


schema.plugin(autoIncrement.plugin, { model: 'Committee', field: 'idCommittee' });

module.exports = model('Committee', schema)