const passSymbols = (password) => {
    const upperCaseLetterRegex = /[A-Z]/
    const specialSymbolRegex = /[!@#$%^&*_+]/

    if(!upperCaseLetterRegex.test(password)) return "Password should have upper case letter"
    if(!specialSymbolRegex.test(password)) return "Password should have special symbol"
    return ""
}

module.exports = (req, res, next) => {
    const {username, password} = req.body

    if (username.length < 4 || username.length > 20) return res.send({success: false, message: "username should be between 4 and 20 characters"})
    if (password.length < 4 || password.length > 20) return res.send({
        success: false,
        message: "password should be between 4 and 20 characters"
    })

    const passHasError = passSymbols(password)

    if(passHasError) return res.send({success: false, message: passHasError})

    next()
}