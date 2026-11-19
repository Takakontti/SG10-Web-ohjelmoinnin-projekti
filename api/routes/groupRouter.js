import { Router } from 'express'
import { getGroupUsers, getAvailableGroups } from '../controllers/groupController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/:groupName/users', getGroupUsers)

router.get('/review-options', requireAuth, getAvailableGroups)

export default router