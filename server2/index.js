require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authHandler = require('./routes/authRoute');
const {errorHandler} = require('./middlewares/errorHandler');

PORT = process.env.PORT||5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(process.env.DB_URI)
.then (console.log("DB started"))
.catch (err => {
   console.log(err);
});

app.use('/user', authHandler);
app.use('/dashboard', require('./routes/noteApiRoute'));

app.use(express.static(path.join(__dirname,'../client2/build/')));
app.get('*', (_req, res) => {
   return res.sendFile(path.resolve(__dirname, '../', 'client2', 'build', 'index.html'))
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));