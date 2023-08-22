const bcrypt = require("bcrypt")
const uid = require("uid")
const userSchema = require('../schemas/userSchema')

module.exports = {
    register: async (req, res) => {
        const {username, password, photo} = req.body
        const userExists = await userSchema.findOne({username})

        if(userExists) return res.send({success: false, message: "Username already taken" })

        const hashedPass = await bcrypt.hash(password, 10)

        const userInDb = new userSchema({
            secret: uid.uid(),
            username,
            password: hashedPass,
            photo
        })

        await userInDb.save()

        return res.send({success: true, message: ""})
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const userExists = await userSchema.findOne({username})

        if(!userExists) return res.send({success: false, message: "Bad credentials"})
        const passMatch = await bcrypt.compare(password, userExists.password)

        if(!passMatch) return res.send({success: false, message: "Bad credentials"})

        return res.send({
            success: true,
            message: "",
            secret: userExists.secret,
            username: userExists.username,
            photo: userExists.photo
        })
    },
    updateUser: async (req, res) => {
        const {secret, username, password, photo} = req.body
        const userExists = await userSchema.findOne({username})
        if (userExists && userExists.secret !== secret) return res.send({success: false, message: "Username already taken" })

        const hashedPass = await bcrypt.hash(password, 10)

        const update = {
            username,
            password: hashedPass,
            photo
        }
        
        const userInDb = await userSchema.findOneAndUpdate({secret}, update)

        await userInDb.save()

        return res.send({success: true, message: ""})
    },
}