import express from 'express';
const access = express.Router()

import accessController from "../../controllers/access.controller";
import expressAsyncHandler from 'express-async-handler';

access.post('/shop/signup', expressAsyncHandler(accessController.signUp))

export default access