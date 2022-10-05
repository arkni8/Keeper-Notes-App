const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
const asyncHandler = require('express-async-handler');
export {}

// Map for authRoute

// @Path - /register - Public
// HTTP method - POST
// @response - navigate to /login
const register = asyncHandler(async (req: any, res: any, next: Function) => {
    const {name, email, password} = req.body;
    // Check to see if all the blanks have been filled
    if(!name || !email || !password) {
        res.status(500);
        throw new Error("Please fill in all the spaces");
    }
    // Check to see if user already exists
    const userExist = await User.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error ("The user has already registered with the service, please login instead")
    }
    // If all the blanks are filled, and user doesnt already exist,
    // then we can allow the user to create a new entry in DB
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPass,
    });
    if(user) {
        res.status(201).json({
            message: "User successfully registered, navigating to login page",

        })
    } else {
        res.status(400);
        throw new Error ("Something went wrong, please try again");
    }
});


// @Path - /login - Public
// HTTP method - POST
// @response - jwt
const login =  asyncHandler(async (req: any, res: any, next: Function) => {
    const {email, password} = req.body;
    const userExist = await User.findOne({email})
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
        res.status(201).json({
            message: "Login Successful",
            name: userExist.name,
            token: generateToken(userExist._id),
        });
    } else {
        res.status(400);
        throw new Error ("Invalid credentials, try again or register if you are a new user!");
    }
});

const generateToken = (id: String) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '15d'});
}

module.exports = {register, login};