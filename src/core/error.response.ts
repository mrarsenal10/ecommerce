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
    status: number;
    errors: [] | null;

    constructor({
        message,
        code,
        errors = null,
    }: {
        message: string;
        code: number;
        errors?: [] | null;
    }) {
        super(message);
        this.status = code;
        this.errors = errors;

        Object.setPrototypeOf(this, ErrorResponse.prototype);
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

export {
    ConflictRequestError,
    ForbiddenERequestrror,
    BadRequestError,
    ErrorResponse,
};
