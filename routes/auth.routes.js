const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const isAuthenticated = require('../middlewares/auth.middleware')

const PASSWORD = 'piñero65'
const EMAIL = 'infopinero3@gmail.com'

router.post('/signup', async (req, res, next) => {

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(PASSWORD, salt)
        await User.create({
            email: EMAIL,
            password: hashPassword
        })
        res.status(201).json()
    } catch (error) {
        next(error)
    }
})