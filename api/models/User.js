const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type:String, default: 'https://firebasestorage.googleapis.com/v0/b/e-commerce-7aed7.appspot.com/o/static%2Fno-user-image.gif?alt=media&token=7cd23976-12f3-4a24-a6fb-9e0a22276ffa'},
    isAdmin: {type: Boolean, default: false},
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)
