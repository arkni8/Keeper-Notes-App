// const express = require('express');
import jwt from 'jsonwebtoken'; 
import {NextFunction, Request, Response} from 'express';
export {};

const auth = async (req: Request, res: Response, next: NextFunction) => {
    let token : string;
    token = req.headers.authorization? req.headers.authorization.split(" ")[1] : "";
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
        res.status(401);
        next(new Error ("Not authorised, missing token"));
    }
}

module.exports = auth;