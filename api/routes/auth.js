const router = require('express').Router()
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')
const User = require('../models/User')
const defaultAvatar =
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-7aed7.appspot.com/o/static%2Fno-user-image.gif?alt=media&token=7cd23976-12f3-4a24-a6fb-9e0a22276ffa'

//REGISTER
router.post(
    '/register', async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
            profilePic: req.body.profilePic || defaultAvatar
        })

        try {
            const savedUser = await newUser.save()
            res.status(201).json(savedUser)
        } catch (err) { res.status(500).json(err) }
    }
)

//LOGIN
router.post(
    '/login',
    async (req, res) => {
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
    }
)

module.exports = router
