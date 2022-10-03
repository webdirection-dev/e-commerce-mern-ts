const router = require('express').Router()
const Cart = require('../models/Cart')
const {verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin} = require('./verifyToken')

//CREATE CART
router.post(
    '/',
    verifyToken,
    async (req, res) => {
        const out = await new Cart(req.body).save()
        try {res.status(201).json(out)}
        catch (err) { res.status(500).json(err) }
    }
)

//UPDATE CART
router.put(
    '/:id',
    verifyTokenAndAuthorisation, //middleware
    async (req, res) => {
        try {
            const out = await Cart.findByIdAndUpdate(
                req.params.id, //поиск по id
                {$set: req.body}, //заменить найденное на req.body
                {new: true}, //отправить клиенту обновленные данные
            )

            res.status(200).json(out)
        } catch (err) { res.status(500).json(err) }
    }
)

//DELETE CART
router.delete(
    '/:id',
    verifyTokenAndAuthorisation, //middleware
    async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json('Cart has been deleted.')
        } catch (err) { res.status(500).json(err) }
    }
)

//GET USER CART
router.get(
    '/find/:userId',
    verifyTokenAndAuthorisation,
    async (req, res) => {
        try { res.status(200).json(await Cart.findOne({userId: req.params.userId})) }
        catch (err) { res.status(500).json(err) }
    }
)

//GET ALL CARTS
router.get(
    '/',
    verifyTokenAndAdmin,
    async (req, res) => {
        try { res.status(200).json(await Cart.find()) }
        catch (err) { res.status(500).json(err) }
    }
)

module.exports = router