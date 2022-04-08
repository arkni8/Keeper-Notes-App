const express = require('express');
const router = express.Router();
const { getNote, addNote, updateNote, deleteNote } = require('../controllers/dbController');
const auth = require('../middlewares/authMiddleware');
// Mapping for the Note

// @Get
// Private - GET
// Route - /dashboard
router.get('/', auth, getNote);

// @Add
// Private - POST
// Route - /dashboard/add
router.post('/add', auth, addNote);

// @Update
// Private - PUT
// Route - /dashboard/update/:id
router.put('/update/:id', auth, updateNote);


// @Delete
// Private _ DELETE
// Route - /dashboard/del/:id
router.delete('/del/:id', auth, deleteNote);

module.exports = router;