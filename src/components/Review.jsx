import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Review.css'

const API_URL = '/api'
const STARS = [1, 2, 3, 4, 5]

const getStarIcon = (rating, star) => {
  if (rating >= star) return 'bi-star-fill'
  if (rating >= star - 0.5) return 'bi-star-half'
  return 'bi-star'
}

const postReview = (stars, reviewText, movieID) => {
  axios.post(`${API_URL}/reviews/post`, { stars, reviewText, movieID })
}

const getReviews = async (movieID) => {
  const response = await axios.get(`${API_URL}/reviews/get/${movieID}`)
  return response.data.review
}

function Review() {
  const [movieId, setMovieId] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [temporaryRating, setTemporaryRating] = useState(0)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!movieId) {
      setReviews([])
      return
    }

    const loadReviews = async () => {
      try {
        const movieReviews = await getReviews(movieId)
        setReviews(movieReviews)
      } catch (error) {
        setReviews([])
        console.error(`Failed to load reviews for movie ${movieId}:`, error)
      }
    }

    loadReviews()

  }, [movieId])

  const visualRating = temporaryRating || rating
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!movieId || rating === 0) {
      return
    }
    try {
      // API tallentaa tähdet kokonaisina numeroina 0:n ja 10:n välillä, joten tässä kerrotaan tähdet kahdella.
      await postReview(rating * 2, comment, movieId)
    } catch (error) {
      console.error('Failed to submit review:', error)
    }
  }

  return (
    <div className='review-wrapper'>
      <div className='review-form-container'>
        <h2 className='review-title'>Arvostele elokuva</h2>
        <form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId="formBasicMovieID">
            <Form.Label>Elokuvan ID:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Elokuva"
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId="formBasicRating">
            <Form.Label>Tähdet:</Form.Label>
            <div
              className='star-rating'
              role='group'
              onMouseLeave={() => setTemporaryRating(0)}
            >
              {STARS.map((star) => (
                <span className='star-rating-item' key={star}>
                  <i className={`bi ${getStarIcon(visualRating, star)} star-rating-icon`} aria-hidden='true' />
                  <button
                    className='star-rating-choice star-rating-half-left'
                    type='button'
                    onMouseEnter={() => setTemporaryRating(star - 0.5)}
                    onClick={() => setRating(star - 0.5)}
                  />
                  <button
                    className='star-rating-choice star-rating-half-right'
                    type='button'
                    onMouseEnter={() => setTemporaryRating(star)}
                    onClick={() => setRating(star)}
                  />
                </span>
              ))}
            </div>
          </Form.Group>
          <Form.Group className='mb-3 review-comment-group' controlId="formBasicComment">
            <Form.Label>Arvostelu:</Form.Label>
            <Form.Control
              as='textarea'
              className='rating-text'
              rows={5}
              placeholder="Kirjoita arvostelu..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <div className='button-box'>
            <Button className='review-buttons' onClick={() => navigate('/')}>Takaisin</Button>
            <Button className='review-buttons' type="submit">Lähetä</Button>
          </div>
        </form>
      </div>
      <ul className="reviewList">
        {reviews.map((review) => {
          const reviewRating = review.stars / 2

          return (
            <li className='review' key={`${review.user_id}-${review.posted_date}`}>
              <h2>{review.username || 'Käyttäjä'}</h2>
              <div
                className='review-stars'
                role='img'
              >
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
    </div>
  )
}

export default Review
