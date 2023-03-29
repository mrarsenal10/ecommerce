const express = require("express");
const { asyncHandler } = require("../../auth/checkAuth");
const ProductController = require("../../controllers/product.controller");
const validate = require("../../middleware/validate");
const { createProductSchema } = require("../../schema/product.schema");
const router = express.Router();

router.post(
    "/products",
    validate(createProductSchema),
    asyncHandler(ProductController.create)
);

module.exports = router