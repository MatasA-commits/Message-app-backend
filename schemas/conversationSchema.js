const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        participants: {
            type: Array,
            required: true
        },
        messages: {
            type: Array,
            required: true
        }
    }
)

module.exports = mongoose.model('ca-final-conversations', userSchema)


