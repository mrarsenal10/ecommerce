const express = require('express');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router()

const accessController = require("../../controllers/access.controller");

router.post('/shop/signup', asyncHandler(accessController.signUp))

module.exports = router