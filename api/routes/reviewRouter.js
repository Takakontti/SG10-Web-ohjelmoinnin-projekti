import { Router } from 'express'
import { postReview, getReview } from '../controllers/reviewController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/post', requireAuth, postReview)

router.get('/get/:id', getReview)

export default router