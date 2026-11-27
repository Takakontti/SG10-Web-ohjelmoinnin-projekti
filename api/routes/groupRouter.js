import { Router } from 'express'
import { getGroupUsers, getAvailableGroups, createMovieList } from '../controllers/groupController.js'
import { requireAuth } from '../middleware/auth.js'
import { requireGroupAdmin } from '../middleware/requireGroupAdmin.js'

const router = Router()

router.get('/:groupId/users', getGroupUsers)

router.get('/user-groups', requireAuth, getAvailableGroups)

router.post('/:groupId/lists/create', requireAuth, requireGroupAdmin, createMovieList)

export default router