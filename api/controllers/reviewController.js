import { createReview } from '../models/review.js'

const postReview = async (req, res, next) => {
  const { stars, reviewText, movieID } = req.body

  try {
    const userId = req.user.id
    await createReview(userId, stars, reviewText, movieID)
    return res.status(201).json({ message: 'Review created successfully' })
  }
  catch(err) {
    next(err)
  }
}

export { postReview }