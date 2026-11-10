import { Router } from 'express'
import { postReview } from '../controllers/reviewController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/post', requireAuth, postReview)

export default router