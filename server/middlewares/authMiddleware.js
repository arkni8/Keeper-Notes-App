// const express = require('express');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    let token;
    token = req.headers.authorization? req.headers.authorization.split(" ")[1] : null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const decodeId = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodeId;
            next();
        } catch (error) {
            res.status(401);
            next(new Error ("Not authorised, invalid signature"));
        }
    }

    if(!token) {
        res.status(401)
        next(new Error ("Not authorised, missing token"));
    }
}

module.exports = auth;