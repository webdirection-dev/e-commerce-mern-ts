const router = require('express').Router()
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const User = require('../models/User')

//REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
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

        //token
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            {expiresIn: '3d'}
        )

        const {password, ...others} = user._doc
        res.status(200).json({...others, accessToken})
    } catch (err) {res.status(500).json(err)}
})

module.exports = router