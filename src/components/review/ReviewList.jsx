import { useEffect, useState } from 'react'
import axios from 'axios'
import { getStarIcon, STARS } from './reviewUtils'
import './ReviewList.css'

function ReviewList({ movieId, refreshProp }) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!movieId) {
      setReviews([])
      return
    }

    const loadReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/get/${movieId}`)
        setReviews(response.data.review)
      } catch (error) {
        setReviews([])
        console.error(`Failed to load reviews for movie ${movieId}:`, error)
      }
    }

    loadReviews()
  }, [movieId, refreshProp])

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
