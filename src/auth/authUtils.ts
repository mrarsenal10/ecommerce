"use strict"

import JWT from "jsonwebtoken"

type payload = {
    userId: string
    email: string
}

const createTokenPair: (
    payload: payload,
    publicKey: string,
    privateKey: string
) => { refreshToken: string; accessToken: string } = (
    payload,
    publicKey,
    privateKey
) => {
    const accessToken = JWT.sign(payload, publicKey, {
        // algorithm: "RS256",
        expiresIn: "2 days",
    })

    const refreshToken = JWT.sign(payload, privateKey, {
        // algorithm: "RS256",
        expiresIn: "7 days",
    })

    return { accessToken, refreshToken }
}

export { createTokenPair }
