"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken,
    }) => {
        try {
            const tokens = await keytokenModel.findOneAndUpdate(
                {
                    user: userId,
                },
                {
                    publicKey,
                    privateKey,
                    refreshToken,
                    refreshTokenUsed: [],
                },
                {
                    upsert: true,
                    new: true,
                }
            );

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyTokenService;
