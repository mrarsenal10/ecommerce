"use strict"

import keytokenModel from "../models/keytoken.model"

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken = null
    }: {
        userId: string
        publicKey: string
        privateKey: string
        refreshToken?: string | null
    }) => {
        try {
            const filter = { user: userId }
            const update = {
                privateKey,
                publicKey,
                refreshTokensUsed: [],
                refreshToken,
            }
            const options = {
                upsert: true,
                new: true,
            }

            const tokens = await keytokenModel.findOneAndUpdate(
                filter,
                update,
                options,
            )

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

export default KeyTokenService
