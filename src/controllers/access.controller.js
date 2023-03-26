"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res);
    };

    signUp = async (req, res, next) => {
        // try {
        new CREATED({
            message: "Registered",
            metadata: await AccessService.signUp(req.body),
        }).send(res);
        // } catch (error) {
        //     next(error);
        // }
    };
}

module.exports = new AccessController();
