const Product = require("../models/product.model");
const { getInfo } = require("../utils");

class ProductService {
    static create = async ({ name, isPublished }) => {
        try {
            const newProduct = await Product.create({ name, isPublished });

            return getInfo({
                fields: ["name", "isPublished"],
                object: newProduct.dataValues,
            });
        } catch (error) {
            // throw new
        }
    };
}

module.exports = ProductService;
