"use strict";

const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        try {
            const metadata = await AccessService.signUp(req.body)

            return res.status(201).json({
                code: '20001',
                metadata,
            })
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AccessController()