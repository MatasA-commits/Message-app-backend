const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        photo: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        },
        secret: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('ca-final-users', userSchema)