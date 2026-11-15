import { Router } from 'express'
import { getGroupUsers } from '../controllers/groupController.js'

const router = Router()

router.get('/:groupName/users', getGroupUsers)

export default router