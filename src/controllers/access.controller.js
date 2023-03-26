"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
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
