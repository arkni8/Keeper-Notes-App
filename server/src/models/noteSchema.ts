export {};
// const mongoose = require('mongoose');
import { Schema, model, connect, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface INote {
    user: Types.ObjectId;
    title?: string;
    content?: string;
}

// Create Schema from the corresponding interface 
const noteSchema = new Schema<INote>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: String,
    content: String,
},
{
    timestamps: true,
});

// Create model and export
module.exports = model('Notes', noteSchema);