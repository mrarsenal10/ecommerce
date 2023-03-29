"use strict";

const { CREATED } = require("../core/success.response");
const ProductService = require("../services/product.service");

class ProductController {
    create = async (req, res, next) => {
        new CREATED({
            message: "Product created successfully",
            metadata: await ProductService.create(req.body),
        }).send(res);
    };
}

module.exports = new ProductController();
