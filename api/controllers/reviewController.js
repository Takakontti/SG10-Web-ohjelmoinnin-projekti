import { createReview, showReview } from '../models/review.js'

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
  }, getReview = async (req, res, next) => {
    const reviewID = req.params.id
    try {
      const reviewData = await showReview(reviewID)
      return res.status(200).json({ message: 'Review search succesful', review: reviewData })
    }
    catch(err) {
      next(err)
    }
  }

export { 
  postReview,
  getReview
}