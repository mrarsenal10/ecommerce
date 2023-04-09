"use strict"
import bcrypt from "bcrypt"
import shopModel from "../models/shop.model"
import crypto from "crypto"
import KeyTokenService from "./keyToken.service"
import { createTokenPair } from "../auth/authUtils"
import { getInfo } from "../utils"
import { BadRequestError, ConflictRequestError } from "../core/error.response"

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
}

class AccessService {
    static login = async ({
        email,
        password,
    }: {
        email: string
        password: string
    }) => {
        // checking email
        const foundShop = await shopModel.findOne({ email }).lean().exec()

        if (!foundShop) {
            throw new BadRequestError({ message: "Shop not found" })
        }

        if (!(await bcrypt.compare(password, foundShop.password))) {
            throw new BadRequestError({ message: "Password mismatch" })
        }

        const publicKey = crypto.randomBytes(64).toString("hex")
        const privateKey = crypto.randomBytes(64).toString("hex")

        // create token pair
        const tokens =
            (await createTokenPair(
                {
                    userId: foundShop._id.toString(),
                    email,
                },
                publicKey,
                privateKey
            )) || {}

        await KeyTokenService.createKeyToken({
            userId: foundShop._id.toString(),
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        })

        return {
            shop: getInfo({
                fields: ["_id", "name", "email"],
                object: foundShop,
            }),
            tokens,
        }
    }

    static signUp = async ({
        name,
        email,
        password,
    }: {
        name: string
        email: string
        password: string
    }) => {
        const holder = await shopModel.findOne({ email }).lean()

        if (holder) {
            throw new ConflictRequestError({
                message: "Handle shop already registered",
            })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [RoleShop.SHOP],
        })

        if (newShop) {
            const privateKey = crypto.randomBytes(64).toString("hex")
            const publicKey = crypto.randomBytes(64).toString("hex")

            const keyStored =
                (await KeyTokenService.createKeyToken({
                    userId: newShop._id.toString(),
                    publicKey,
                    privateKey,
                })) || {}

            if (!keyStored) {
                return {
                    code: "xxxx",
                    message: "public key string error",
                }
            }

            const tokens = await createTokenPair(
                { userId: newShop._id.toString(), email },
                publicKey,
                privateKey
            )

            return {
                shop: getInfo({
                    object: newShop,
                    fields: ["_id", "email", "name"],
                }),
                tokens,
            }
        }

        return {
            code: 200,
            metadata: null,
        }
    }
}

export default AccessService
