import { createReview, showReview, showGroupReviews } from '../models/review.js'

const postReview = async (req, res, next) => {
    const { stars, reviewText, movieID, groupID } = req.body

    try {
      const userId = req.user.id
      await createReview(userId, stars, reviewText, movieID, groupID || undefined)
      return res.status(201).json({ message: 'Review created successfully' })
    }
    catch(err) {
      next(err)
    }
  }, 
  getReview = async (req, res, next) => {
    const reviewID = req.params.id
    try {
      const reviewData = await showReview(reviewID)
      return res.status(200).json({ message: 'Review search succesful', review: reviewData })
    }
    catch(err) {
      next(err)
    }
  },
  getGroupReviews = async (req, res, next) => {
    const { groupID } = req.params

    try {
      const reviewData = await showGroupReviews(groupID)
      return res.status(200).json({ message: 'Group review search successful', review: reviewData })
    } catch (err) {
      next(err)
    }
  }

export { 
  postReview,
  getReview,
  getGroupReviews
}