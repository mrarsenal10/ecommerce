"use strict";

import express from "express";
import access from "./access";

const router = express.Router();
import { apiKey, asyncHandler, permission } from "../auth/checkAuth";


router.use(asyncHandler(apiKey));
router.use(asyncHandler(permission("0000")));

router.use("/v1/api", access);
// router.use("/v1/api", require("./product"));

export default router;
