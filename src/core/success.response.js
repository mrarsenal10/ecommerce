"use strict";

const reasonStatusCode = {
    OK: 200,
    CREATED: 201,
};

const reasonStatusMessage = {
    OK: "Success",
    CREATED: "Created",
};

class SuccessResponse {
    constructor({
        message,
        statusCode = reasonStatusCode.OK,
        statusMessage = reasonStatusMessage.OK,
        metadata = {},
    }) {
        this.message = !message ? statusMessage : message;
        this.status = statusCode;
        this.metada = metadata;
    }

    send(res, headers) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        metadata,
        statusCode = reasonStatusCode.CREATED,
        statusMessage = reasonStatusMessage.CREATED,
    }) {
        super({
            message,
            metadata,
            statusCode,
            statusMessage,
        });
    }
}

module.exports = {
    OK,
    CREATED,
}
