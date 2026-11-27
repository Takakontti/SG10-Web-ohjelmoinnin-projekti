import { Router } from 'express'
import { getGroupUsers, getAvailableGroups, createMovieList, NewGroup } from '../controllers/groupController.js'
import { requireAuth } from '../middleware/auth.js'
import { requireGroupAdmin } from '../middleware/requireGroupAdmin.js'

const router = Router()

router.get('/:groupId/users', getGroupUsers)

router.get('/user-groups', requireAuth, getAvailableGroups)

router.post('/:groupId/lists/create', requireAuth, requireGroupAdmin, createMovieList)

router.post('/new-group', requireAuth, NewGroup)

export default router