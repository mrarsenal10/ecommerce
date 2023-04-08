"use strict";

import { Request, Response } from "express";

import { CREATED } from "../core/success.response";
import AccessService from "../services/access.service";

class AccessController {
    signUp = async (_req: Request, _res: Response) => {
        new CREATED({
            message: "Registered",
            metadata: await AccessService.signUp(_req.body),
        }).send(_res);
    };
}

export default new AccessController();