const { BadRequestError } = require("../core/error.response");
const Product = require("../models/mysql/product.model");
const { getInfo, getInfoArray } = require("../utils");

class ProductService {
    static create = async ({ name, isPublished }) => {
        try {
            const newProduct = await Product.create({ name, isPublished });

            return getInfo({
                fields: ["name", "isPublished"],
                object: newProduct.dataValues,
            });
        } catch (error) {
            throw new BadRequestError({ message: error.message });
        }
    };

    static update = async (id, { name }) => {
        try {
            const foundProduct = await Product.findOne({ where: { id: id } });

            if (!foundProduct) {
                throw new BadRequestError({ message: "Product not found" });
            }

            const result = await Product.update(
                {
                    name,
                    updatedAt: Date.now(),
                },
                {
                    where: {
                        id,
                    },
                    plain: true,
                }
            );

            return { name };
        } catch (error) {
            throw new BadRequestError({ message: error.message });
        }
    };

    static getAll = async () => {
        try {
            const products = await Product.findAll();
console.log(products)
            return getInfoArray({
                fields: ["name", "isPublished"],
                data: products,
            });
        } catch (error) {
            throw new BadRequestError({ message: error.message });
        }
    };
}

export default ProductService;
