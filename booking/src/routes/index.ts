import express from "express"
import bookingRoutes from './bookingRoutes'

const router: express.Router = express.Router()

router.use('/booking', bookingRoutes)

export default router