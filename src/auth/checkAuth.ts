/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict"

import { NextFunction, Request, Response } from "express"
import { findById } from "../services/apiKey.service"
import {
    BadRequestError,
    ForbiddenRequestError,
    NotFoundError,
} from "../core/error.response"
import { Types } from "mongoose"
import JWT from "jsonwebtoken"
import keytokenModel from "../models/keytoken.model"

const HEADER = {
    CLIENT_ID: "x-client-id",
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
}

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return fn(req, res, next).catch(next)
    }
}

const apiKey = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers[HEADER.API_KEY]?.toString()

    if (!key) {
        throw new ForbiddenRequestError()
    }

    const objKey = await findById(key)

    if (!objKey) {
        throw new ForbiddenRequestError()
    }

    req.objKey = objKey

    return next()
}

const permission = (permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.objKey.permissions) {
            throw new ForbiddenRequestError()
        }

        const isValid = req.objKey.permissions.includes(permission)

        if (!isValid) {
            throw new ForbiddenRequestError()
        }

        return next()
    }
}

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const clientID = req.headers["x-client-id"]

    if (!clientID) {
        throw new BadRequestError({ message: "Missing client id" })
    }

    const keyStore = await keytokenModel.findOne({
        user: new Types.ObjectId(clientID),
    })

    if (!keyStore) {
        throw new NotFoundError({ message: "User not found" })
    }

    const accessToken = req.headers["authorization"]

    if (!accessToken) {
        throw new BadRequestError({ message: "Invalid authorization" })
    }

    // eslint-disable-next-line no-useless-catch
    try {
        const decoded = JWT.verify(accessToken, keyStore.publicKey)

        req.keyStore = {
            _id: keyStore._id.toString(),
            user: keyStore.user.toString(),
            publicKey: keyStore.publicKey,
            privateKey: keyStore.privateKey,
        }

        return next()
    } catch (error) {
        throw error
    }
}

export { apiKey, permission, asyncHandler, authenticate }
