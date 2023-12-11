const User = require('../models/user.model');
const { response } = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Record = require('../models/record.model');

class AuthController {
    async register(req, res) {
        const {username, password, role} = req.body;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (!username || !password)
        return res
        .status(400)
        .json({success: false, message: "Missing Username and/or password"})

        try {
            const user = await User.findOne({username})
            if (user)
            return res.status(400).json({success: false, message: 'Username already exists'})

            const hashedPassword = await argon2.hash(password)
            const newUser = new User({username, password: hashedPassword, role})
            await newUser.save()

            const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

            const newRecord = new Record({
                record: `register new admin ${username} form ${clientIP}`
            });
            newRecord.save();

            res.json({success: true, message: 'User created', accessToken})
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    }

    async login(req, res) {
        const {username, password} = req.body;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (!username || !password)
        return res
        .status(400)
        .json({success: false, message: "Missing Username and/or password"})

        try {
            const user = await User.findOne({username})
            if (!user)
            return res.status(400).json({success: false, message: 'Username incorrect'})

            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid){
                const newRecord = new Record({
                    record: `logged in to admin ${username} with wrong password`
                });
                newRecord.save();
                return res.status(400).json({success: false, message: 'Password incorrect'})
            }

            const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

            const newRecord = new Record({
                record: `logged in to admin ${username} form ${clientIP}`
            });
            newRecord.save();

            res.json({success: true, message: 'Logged in successfully', accessToken})  
        }catch  (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    }

    async auth (req, res) {
        try{
            const user = await User.findById(req.userId).select('-password')
            if(!user) return res.status(400).json({success: false, message: 'User not found'})
            res.json({success: true, user})
        }catch(error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    }
}

module.exports = new AuthController;