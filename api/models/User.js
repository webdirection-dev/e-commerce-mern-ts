const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type:String, default: 'https://firebasestorage.googleapis.com/v0/b/netflix-a1cac.appspot.com/o/static-img%2Fdefault-img.png?alt=media&token=4225ef0f-46ac-4246-9131-a260a09c7b0d'},
    isAdmin: {type: Boolean, default: false},
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)