"use strict";
const bcrypt = require("bcrypt");
const shopModel = require("../models/shop.model");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfo } = require("../utils");
const {
    ConflictRequestError,
    AuthenticationError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        const holder = await shopModel.findOne({ email }).lean();

        if (holder) {
            throw new ConflictRequestError("Handle shop already registered");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [RoleShop.SHOP],
        });

        if (newShop) {
            const { privateKey, publicKey } = crypto.generateKeyPairSync(
                "rsa",
                {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                }
            );

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
    };

    static login = async ({ email, password, refreshToken }) => {
        const foundShop = await findByEmail(email);

        if (!foundShop) {
            throw new ConflictRequestError("Shop not registered");
        }

        const match = await bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new AuthenticationError();
        }

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

        const token = await createTokenPair(
            { userId: foundShop._id, email },
            publicKey,
            privateKey
        );

        await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            privateKey,
            publicKey,
            refreshToken: token.refreshToken,
        });

        return {
            shop: getInfo({
                object: foundShop,
                fields: ["_id", "email", "name"],
            }),
        };
    };
}

module.exports = AccessService;
