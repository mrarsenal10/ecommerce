"use strict";

const { CREATED, OK } = require("../../core/success.response");
const ProductService = require("../../services/product.service");

class ProductController {
    create = async (req, res) => {
        new CREATED({
            message: "Product created successfully",
            metadata: await ProductService.create(req.body),
        }).send(res);
    };

    update = async (req, res) => {
        console.log(req.params.id, req.params);
        new OK({
            message: "Product updated successfully",
            metadata: await ProductService.update(req.params.id, req.body),
        }).send(res);
    };

    getAll = async () => {
        new OK({
            message: "Products",
            metadata: await ProductService.getAll(),
        }).send(res);
    };
}

export default new ProductController();
