const router = require("express").Router();
const Client = require("../models/Client.model");

router.post("/new", async (req, res, next) => {
    const { name, lastName, email, phone1, phone2, dni, address, location, postalCode, type } = req.body;
    try {
        const newClient = await Client.create({
            name,
            lastName,
            email,
            phone1,
            phone2,
            dni,
            address,
            location,
            postalCode,
            type
        });
        res.status(201).json(newClient);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
