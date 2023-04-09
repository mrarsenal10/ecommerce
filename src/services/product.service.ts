import { BadRequestError } from "../core/error.response"
import Product from "../models/product.model"
import { getInfo, getInfoArray } from "../utils"

class ProductService {
    static create = async ({
        name,
        isPublished,
    }: {
        name: string
        isPublished: string
    }) => {
        try {
            const newProduct = await Product.create({ name, isPublished })

            return getInfo({
                fields: ["name", "isPublished"],
                object: newProduct.dataValues,
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new BadRequestError({ message: err.message })
            }
        }
    }

    static update = async (id: string, { name }: { name: string }) => {
        try {
            const foundProduct = await Product.findOne({ where: { id: id } })

            if (!foundProduct) {
                throw new BadRequestError({ message: "Product not found" })
            }

            await Product.update(
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
            )

            return { name }
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new BadRequestError({ message: err.message })
            }
        }
    }

    static getAll = async () => {
        try {
            const products = await Product.findAll()
            return getInfoArray({
                fields: ["name", "isPublished"],
                data: products,
            })
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new BadRequestError({ message: err.message })
            }
        }
    }
}

export default ProductService
