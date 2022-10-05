export {};
// const mongoose = require('mongoose');
import {Schema, model, Types,} from 'mongoose';

export interface IUser {
    name: String,
    email: String,
    password: String
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required:[true, "Please enter your name"],
    },
    email: {
        type:String,
        required:[true, "Please enter your email address"],
        unique: true,   
    },
    password: {
        type: String,
        required:[true, "Please enter your password"],
    },
},
{
    timestamps: true,
});

module.exports = model('User', userSchema);