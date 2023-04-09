"use strict";

import { Request, Response } from "express";

import { CREATED } from "../core/success.response";
import AccessService from "../services/access.service";

class AccessController {
    signUp = async (req: Request, res: Response) => {
        new CREATED({
            message: "Registered",
            metadata: await AccessService.signUp(req.body),
        }).send(res);
    };
}

export default new AccessController();