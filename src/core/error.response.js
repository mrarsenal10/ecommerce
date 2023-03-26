"use strict";

const statusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
};

const statusMessage = {
    FORBIDDEN: "Forbidden",
    CONFLICT: "Conflict error",
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

module.exports = {
    ConflictRequestError,
    ForbiddenERequestrror,
};
