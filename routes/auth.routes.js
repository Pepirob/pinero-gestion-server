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

router.post("/login", async (req, res, next) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        res.status(400).json({ errorMessage: "Los campos deben estar llenos" });
        return;
    }

    try {
        const foundUser = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });
        const errorMessage = "Email o contraseña no válidos";

        if (!foundUser) {
            res.status(400).json({ errorMessage });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!isPasswordCorrect) {
            res.status(400).json({ errorMessage });
            return;
        }

        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
        };

        const tokenConfig = {
            algorithm: "HS256",
            expiresIn: "3d",
        };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, tokenConfig);

        res.status(200).json({ authToken });
    } catch (error) {
        next(error);
    }
});

router.get("/verify", isAuthenticated, (req, res) => {
    res.status(200).json(req.payload);
});

module.exports = router