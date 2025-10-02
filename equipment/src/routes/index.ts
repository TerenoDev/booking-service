import express from 'express'
import categoriesEquipmentRoutes from './categoriesEquipmentRoutes';
import equipmentRoutes from "./equipmentRoutes";


const router: express.Router = express.Router()

router.use('/equipment', equipmentRoutes)
router.use('/categories-equipment', categoriesEquipmentRoutes)

export default router