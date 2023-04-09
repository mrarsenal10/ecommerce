"use strict"

import JWT from "jsonwebtoken"

type payload = {
    userId: string;
    email: string;
};

const createTokenPair = async (
    payload: payload,
    publicKey: string,
    privateKey: string
) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log("create token", error)
    }
}

// const verify = async () => {};

export { createTokenPair }
