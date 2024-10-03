

import mongoose from 'mongoose';
//const passport  = require('passport')
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})
//userSchema.plugin(passportLocalMongoose);

export const UserModel = mongoose.model("User", userSchema);
