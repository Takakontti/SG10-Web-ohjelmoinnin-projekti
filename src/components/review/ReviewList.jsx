import { useEffect, useState } from 'react'
import axios from 'axios'
import { getStarIcon, STARS } from './reviewUtils'
import './ReviewList.css'

function ReviewList({ movieId, groupId, refreshProp }) {
  const [reviews, setReviews] = useState([])

  const getReviewsRoute = () => {
    if (groupId) return `/api/reviews/get/group/${groupId}`
    return `/api/reviews/get/${movieId}`
  }

  useEffect(() => {
    const reviewTargetId = groupId || movieId
    if (!reviewTargetId) {
      setReviews([])
      return
    }

    const loadReviews = async () => {
      try {
        const response = await axios.get(getReviewsRoute())
        setReviews(response.data.review)
      } catch (error) {
        setReviews([])
        console.error(`Failed to load reviews:`, error)
      }
    }

    loadReviews()
  }, [movieId, groupId, refreshProp])

  return (
    <ul className='reviewList'>
      {reviews.map((review) => {
        const reviewRating = review.stars / 2

        return (
          <li className='review' key={`${review.user_id}-${review.posted_date}`}>
            <h2>{review.username || 'Käyttäjä'}</h2>
            <div className='review-stars' role='img'>
              {STARS.map((star) => (
                <i
                  className={`bi ${getStarIcon(reviewRating, star)} star-rating-icon`}
                  key={star}
                  aria-hidden='true'
                />
              ))}
            </div>
            <p>{review.review}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default ReviewList
