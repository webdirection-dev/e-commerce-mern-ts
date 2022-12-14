const router = require('express').Router()
const Product = require('../models/Product')
const {verifyTokenAndAdmin} = require('./verifyToken')
const defaultPicProduct =
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-7aed7.appspot.com/o/static%2Fno-img.png?alt=media&token=494c1cb3-d196-44fe-be1a-66718764459b'
//CREATE PRODUCT
router.post(
    '/',
    verifyTokenAndAdmin,
    async (req, res) => {
        // const newProduct = new Product({
        //     ...req.body,
        //     img: req.body.profilePic || defaultPicProduct
        // })
        //
        // try {
        //     const savedUser = await newUser.save()
        //     res.status(201).json(savedUser)
        // }
        // catch (err) { res.status(500).json(err) }

        const out = await new Product(req.body).save()
        try {res.status(201).json(out)}
        catch (err) { res.status(500).json(err) }
    }
)

//UPDATE PRODUCT
router.put(
    '/:id',
    verifyTokenAndAdmin, //middleware
    async (req, res) => {
        try {
            const out = await Product.findByIdAndUpdate(
                req.params.id, //поиск по id
                {$set: req.body}, //заменить найденное на req.body
                {new: true}, //отправить клиенту обновленные данные
            )

            res.status(200).json(out)
        } catch (err) { res.status(500).json(err) }
    }
)

//DELETE PRODUCT
router.delete(
    '/:id',
    verifyTokenAndAdmin, //middleware
    async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('SingleProduct has been deleted.')
        } catch (err) { res.status(500).json(err) }
    }
)

//GET PRODUCT
router.get(
    '/find/:id',
    async (req, res) => {
        try { res.status(200).json(await Product.findById(req.params.id)) }
        catch (err) { res.status(500).json(err) }
    }
)

//GET ALL PRODUCTS
router.get(
    '/',
    async (req, res) => {
        try {
            const items =
                req.query.new ? await Product.find().sort({createdAt: -1}).limit(5) :
                req.query.category ? await Product.find({categories: {$in: [req.query.category]}}) :
                req.query.random ? await Product.aggregate([{ $sample: { size: Number(req.query.random) } }]) :
                await Product.find()

            res.status(200).json(items)
        } catch (err) { res.status(500).json(err) }
    }
)

module.exports = router
