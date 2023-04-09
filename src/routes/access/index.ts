import express from "express"
const access = express.Router()

import accessController from "../../controllers/access.controller"
import { asyncHandler } from "../../auth/checkAuth"

access.post("/shop/signup", asyncHandler(accessController.signUp))
access.post("/shop/login", asyncHandler(accessController.login))

export default access
