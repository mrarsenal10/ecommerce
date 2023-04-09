const express = require("express")
const { asyncHandler } = require("../../auth/checkAuth")
const ProductController = require("../../controllers/product.controller")
const validate = require("../../middleware/validate")
const {
    createProductSchema,
    updateProductSchema,
} = require("../../schema/product.schema")
const router = express.Router()

router.post(
    "/products",
    validate(createProductSchema),
    asyncHandler(ProductController.create)
)

router.patch(
    "/products/:id/:test",
    validate(updateProductSchema),
    asyncHandler(ProductController.update)
)

router.get("/products", asyncHandler(ProductController.getAll))

export default router
