//Маршруты
import express from "express"
import AuthController from "../controllers/authController"


const router: express.Router = express.Router()

const controller: AuthController = new AuthController()

router.route('/register')
    .post(controller.register)

router.route('/login')
    .post(controller.auth)

router.route('/verify')
    .post(controller.verify)

router.route('/me')
    .get(controller.me)

export default router