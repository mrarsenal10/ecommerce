"use strict";

import express from "express";
import access from "./access";

const router = express.Router();
// import { apiKey, permission } from "../auth/checkAuth";

// router.use(apiKey);
// router.use(permission("0000"));

router.use("/v1/api", access);
// router.use("/v1/api", require("./product"));

export default router;
