"use strict";

import keytokenModel from "../models/keytoken.model";

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
    }: {
        userId: number;
        publicKey: string;
        privateKey: string;
    }) => {
        try {
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey,
            });

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}

export default KeyTokenService;
