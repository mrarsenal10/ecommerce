import express from "express"
const access = express.Router()

import accessController from "../../controllers/access.controller"
import { asyncHandler, authenticate } from "../../auth/checkAuth"

access.post("/shop/signup", asyncHandler(accessController.signUp))
access.post("/shop/login", asyncHandler(accessController.login))

access.use(asyncHandler(authenticate))

access.post("/shop/logout", asyncHandler(accessController.logout))

export default access
