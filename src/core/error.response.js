"use strict";

const statusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    UNAUTHORIZED: 410,
};

const statusMessage = {
    FORBIDDEN: "Forbidden",
    CONFLICT: "Conflict error",
    UNAUTHORIZED: "Unauthorized error",
};

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = statusMessage.CONFLICT, code = statusCode.CONFLICT) {
        super(message, code);
    }
}

class ForbiddenERequestrror extends ErrorResponse {
    constructor(
        message = statusMessage.FORBIDDEN,
        code = statusCode.FORBIDDEN
    ) {
        super(message, code);
    }
}

class AuthenticationError extends ErrorResponse {
    constructor(
        message = statusMessage.UNAUTHORIZED,
        code = statusCode.UNAUTHORIZED
    ) {
        super(message, code);
    }
}

module.exports = {
    ConflictRequestError,
    ForbiddenERequestrror,
    AuthenticationError,
};
