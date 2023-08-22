const userDb = require("../schemas/userSchema")
const conversationDb = require("../schemas/conversationSchema")

module.exports = {
    getAll: async (req, res) => {
        const users = await userDb.find({}, {username: 1, photo: 1, secret: 1})
        res.send({users})
    },
    getSingle: async (req, res) => {
        const {username} = req.body
        const user = await userDb.find({username})
        const dataToSend = {
            username: user[0].username,
             photo: user[0].photo,
            secret: user[0].secret
        }
        res.send(dataToSend)
    }
}