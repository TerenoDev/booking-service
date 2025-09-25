// Маршруты
import express from "express"
import { authMiddleware } from "../middleware"
import BookingController from "../controllers/bookingController"


const router: express.Router = express.Router()

const controller: BookingController = new BookingController()

router.route('')
    .post(authMiddleware, controller.create)

router.route('')
    .get(authMiddleware, controller.list)

router.route('/:id')
    .get(authMiddleware, controller.get)

router.route('/:id')
    .delete(authMiddleware, controller.delete)

router.route('/:id')
    .patch(authMiddleware, controller.update)

export default router