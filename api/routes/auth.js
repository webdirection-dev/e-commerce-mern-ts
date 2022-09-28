const router = require('express').Router()
const CryptoJS = require('crypto-js')
const User = require('../models/User')

//REGISTER
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body

    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) { res.status(500).json(err) }
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json('Wrong credentials!')

        const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8)
        req.body.password !== decrypted && res.status(401).json('Wrong credentials!')

        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (err) {res.status(500).json(err)}
})

module.exports = router