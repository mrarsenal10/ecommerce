"use strict";
import bcrypt from "bcrypt";
import shopModel from "../models/shop.model";
import crypto from "crypto";
import KeyTokenService from "./keyToken.service";
import { createTokenPair } from "../auth/authUtils";
import { getInfo } from "../utils";
import { ConflictRequestError } from "../core/error.response";

const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({
        name,
        email,
        password,
    }: {
        name: string;
        email: string;
        password: string;
    }) => {
        console.log(email)
        const holder = await shopModel.findOne({ email }).lean();

        if (holder) {
            throw new ConflictRequestError({
                message: "Handle shop already registered",
            });
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
                userId: newShop._id.toString(),
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
                { userId: newShop._id.toString(), email },
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
    };
}

export default AccessService;
