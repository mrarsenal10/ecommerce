"use strict";

const statusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    BAD_REQUEST: 400,
};

const statusMessage = {
    FORBIDDEN: "Forbidden",
    CONFLICT: "Conflict error",
    BAD_REQUEST: "Bad request",
};

class ErrorResponse extends Error {
    constructor({ message, code, errors = null }) {
        super(message);
        this.status = code;
        this.errors = errors;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.CONFLICT,
        code = statusCode.CONFLICT,
    }) {
        super({ message, code });
    }
}

class ForbiddenERequestrror extends ErrorResponse {
    constructor(
        message = statusMessage.FORBIDDEN,
        code = statusCode.FORBIDDEN
    ) {
        super({ message, code });
    }
}

class BadRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.BAD_REQUEST,
        code = statusCode.BAD_REQUEST,
        errors = null,
    }) {
        super({ message, code, errors });
    }
}

module.exports = {
    ConflictRequestError,
    ForbiddenERequestrror,
    BadRequestError,
    ErrorResponse,
};
