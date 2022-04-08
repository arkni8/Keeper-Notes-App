const Note = require('../models/noteSchema');
const User = require('../models/userSchema');
const asyncHandler = require('express-async-handler');

// @Get
// Private
// Route - /dashboard
const getNote = asyncHandler(async (req, res) => {
    const {id} = req.user;
    //Check if user exists with the id that we got from the middleware
    const user = await User.findById(id);
    if (!user) {
        //User doesn't exist in DB
        res.status(400);
        throw new Error("Please register before entering this page");
    } else {
        //User exists, so we fetch the data from DB
        const note = await Note.find({user: id});
        res.status(200).json({note});
    }
});

// @Add
// Private - POST
// Route - /dashboard/add
const addNote = asyncHandler(async (req, res) => {
    const {id} = req.user;
    if (!req.body.title && !req.body.content) {
        res.status(400);
        throw new Error("There is either no title or no content in the request made");
    }
    const {title, content} = req.body
    //Check if user exists with the id that we got from the middleware
    const user = await User.findById(id);
    if (!user) {
        //User doesn't exist in DB
        res.status(400);
        throw new Error("Please register before entering this page");
    }
    // Create a new note
    const note = await Note.create({
        user: id,
        title,
        content,
    });
    res.status(200).json({note});
});

// @Update
// Private - PUT
// Route - /dashboard/update/:id
const updateNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const {id} = req.user;
    if (!req.body.title && !req.body.content) {
        res.status(400);
        throw new Error("There is either no title or no content in the request made");
    }
    // Check if user exists with the id that we got from middleware
    const user = await User.findById(id);
    if (!user) {
        //User doesn't exist in DB
        res.status(400);
        throw new Error("Please register before entering this page");
    }
    // Check to match authorised id is same as user id on note.
    const note = await Note.findById(noteId);
    if(note.user.toString() !== id.toString()) {
        res.status(401)
        throw new Error('User unauthorised')
    }
    // Update notes with noteId with new title and content
    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {new: true});
    res.status(200).json(updatedNote);
});

// @Delete
// Private _ DELETE
// Route - /dashboard/del/:id
const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const {id} = req.user;

    // Check if user exists with the id that we got from middleware
    const user = await User.findById(id);
    if (!user) {
        //User doesn't exist in DB
        res.status(400);
        throw new Error("Please register before entering this page");
    }
    // Check to match authorised id is same as user id on note.
    const note = await Note.findById(noteId);
    if(note.user.toString() !== id.toString()) {
        res.status(401)
        throw new Error('User unauthorised')
    }
    const deletedNote = await Note.findByIdAndDelete(noteId);
    res.status(200).json(deletedNote._id);
});


module.exports = {getNote, addNote, updateNote, deleteNote}