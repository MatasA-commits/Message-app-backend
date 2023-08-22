const express = require("express")
const router = express.Router()
const {register, login, updateUser} = require("../controllers/auth")
const {getAll, getSingle} = require("../controllers/users")
const {createConversation, allConversations, deleteConversation, sendMessage, likeMessage, getChat} = require('../controllers/chat')
const isLoggedIn = require("../middleware/isLoggedIn")
const credentialsValidation = require('../middleware/credentialsValidation')

router.post("/register",credentialsValidation, register)
router.post("/login",credentialsValidation, login)
router.post("/update", credentialsValidation, updateUser)
router.get("/allUsers", getAll)
router.post("/singleUser", getSingle)

router.post("/newConversation", isLoggedIn, createConversation)
router.post("/getConversations", isLoggedIn, allConversations)


router.get("/chat/:id", getChat)
router.get("/deleteConversation/:id", deleteConversation)

router.post("/sendMessage", isLoggedIn, sendMessage)
router.get("/like/:id/:index", likeMessage)

module.exports = router