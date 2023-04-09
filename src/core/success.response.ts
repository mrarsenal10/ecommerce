"use strict"

import { Response } from "express"

const reasonStatusCode = {
    OK: 200,
    CREATED: 201,
}

const reasonStatusMessage = {
    OK: "Success",
    CREATED: "Created",
}

class SuccessResponse {
    message: string
    status: number
    metadata: {}

    constructor({
        message,
        statusCode = reasonStatusCode.OK,
        statusMessage = reasonStatusMessage.OK,
        metadata = {},
    }: {
        message: string
        statusCode: number
        statusMessage: string
        metadata: {}
    }) {
        this.message = !message ? statusMessage : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res: Response) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({
        message,
        metadata,
        statusCode = reasonStatusCode.OK,
        statusMessage = reasonStatusMessage.OK,
    }: {
        message: string
        metadata: {}
        statusCode?: number
        statusMessage?: string
    }) {
        super({ message, metadata, statusCode, statusMessage })
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        metadata,
        statusCode = reasonStatusCode.CREATED,
        statusMessage = reasonStatusMessage.CREATED,
    }: {
        message: string
        metadata: {}
        statusCode?: number
        statusMessage?: string
    }) {
        super({
            message,
            metadata,
            statusCode,
            statusMessage,
        })
    }
}

export { OK, CREATED }
