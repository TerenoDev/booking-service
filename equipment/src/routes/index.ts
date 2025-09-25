import express from 'express'
import equipmentRoutes from './equipmentroutes';
import categoriesEquipmentRoutes from './categoriesEquipmentRoutes';


const router: express.Router = express.Router()

router.use('/equipment', equipmentRoutes)
router.use('/categories-equipment', categoriesEquipmentRoutes)

export default router