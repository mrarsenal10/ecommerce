"use strict"

import { NextFunction, Request, Response } from "express"
import { findById } from "../services/apiKey.service"
import { ForbiddenRequestError } from "../core/error.response"

const HEADER = {
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

export { apiKey, permission, asyncHandler }
