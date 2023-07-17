const router = require("express").Router();

const authRouter = require('./auth.routes')
router.use('/auth', authRouter)

const clientRouter = require('./client.routes')
router.use('/client', clientRouter)

module.exports = router;
