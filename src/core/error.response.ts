"use strict"

const statusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
}

const statusMessage = {
    FORBIDDEN: "Forbidden",
    CONFLICT: "Conflict error",
    BAD_REQUEST: "Bad request",
    NOT_FOUND: "Not found",
}

class ErrorResponse implements Error {
    name: string
    message: string
    status: number
    errors?: [] | null

    constructor({
        message,
        code,
        errors,
    }: {
        message: string
        code: number
        errors?: [] | null
    }) {
        this.name = "Error response"
        this.message = message
        this.status = code
        this.errors = errors
        // Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.CONFLICT,
        code = statusCode.CONFLICT,
    }: { message?: string; code?: number } = {}) {
        super({ message, code })
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.FORBIDDEN,
        code = statusCode.FORBIDDEN,
    }: {
        message?: string
        code?: number
    } = {}) {
        super({ message, code })
    }
}

class BadRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.BAD_REQUEST,
        code = statusCode.BAD_REQUEST,
        errors = null,
    }) {
        super({ message, code, errors })
    }
}

class NotFoundError extends ErrorResponse {
    constructor({
        message = statusMessage.NOT_FOUND,
        code = statusCode.NOT_FOUND,
    }: {
        message: string
        code?: number
    }) {
        super({ message, code })
    }
}

export {
    ConflictRequestError,
    ForbiddenRequestError,
    BadRequestError,
    ErrorResponse,
    NotFoundError
}
