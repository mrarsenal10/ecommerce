"use strict";
const bcrypt = require("bcrypt");
const shopModel = require("../models/shop.model");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfo } = require("../utils");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            const holder = await shopModel.findOne({ email }).lean();

            if (holder) {
                return {
                    code: "xxx",
                    message: "shop already registered",
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP],
            });

            if (newShop) {
                const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                });

                // const privateKey = crypto.randomBytes(64).toString("base64");
                // const publicKey = crypto.randomBytes(64).toString("base64");
        
                console.log({ privateKey, publicKey })

                const keyStored = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey,
                });

                if (!keyStored) {
                    return {
                        code: "xxxx",
                        message: "public key string error",
                    };
                }

                const tokens = await createTokenPair(
                    { userId: newShop._id, email },
                    publicKey,
                    privateKey
                );

                return {
                    shop: getInfo({
                        object: newShop,
                        fields: ["_id", "email", "name"],
                    }),
                    tokens,
                };
            }

            return {
                code: 200,
                metadata: null,
            };
        } catch (error) {
            return {
                code: "xxx",
                message: error.message,
                status: "error",
            };
        }
    };
}

module.exports = AccessService;
