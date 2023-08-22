const userDb = require("../schemas/userSchema")
const conversationDb = require("../schemas/conversationSchema")

module.exports = {
    createConversation: async (req, res) => {
        const {from, to} = req.body

        const conversationExists = await conversationDb.findOne({participants: {$all: [from, to]}})

        if (conversationExists) return res.send({success: true})

        const newConversation = new conversationDb({
            participants: [from, to],
            messages: []
        })

        await newConversation.save()

        res.send({success: true})
    },
    allConversations: async (req, res) => {
        const {secret} = req.body
        const conversations = await conversationDb.find({participants: {$all: [secret]}})
       
        res.send({success: true, conversations})

    },
    deleteConversation: async (req, res) => {
        const {id} = req.params
        await conversationDb.deleteOne({_id: id})
        res.send({success: true})

    },
    getChat: async (req, res) => {
        const {id} = req.params
        const conversation = await conversationDb.findOne({_id: id})
        res.send({success: true, conversation})
    },

    sendMessage: async (req, res) => {
        const {id, secret, message} = req.body

        const newMessage = {
            secret,
            message,
            time: Date.now(),
            likes: 0
        }

        const conversation = await conversationDb.findOneAndUpdate(
            {_id: id},
            {$push: {messages: newMessage}},
            {new: true}
        )

        res.send({success: true, conversation})
    },
    likeMessage: async (req, res) => {
        const {id, index} = req.params

        const conv = await conversationDb.findOne({_id: id})

        const messages = conv.messages
        messages[index].likes++

        const conversation = await conversationDb.findOneAndUpdate({_id: id}, {$set: {messages}}, {new: true})

        res.send({success: true, conversation})
    }

}