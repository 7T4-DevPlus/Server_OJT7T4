const User = require('../models/user.model');
const { response } = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        const {username, password, role} = req.body

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

            res.json({success: true, message: 'User created', accessToken})
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal Server Error'})
        }
    }

    async login(req, res) {
        const {username, password} = req.body

        if (!username || !password)
        return res
        .status(400)
        .json({success: false, message: "Missing Username and/or password"})

        try {
            const user = await User.findOne({username})
            if (!user)
            return res.status(400).json({success: false, message: 'Username incorrect'})

            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid)
            return res.status(400).json({success: false, message: 'Password incorrect'})

            const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

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