import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Review.css'

const API_URL = '/api'

const reviewPost = async (stars, reviewText, movieID) => {
  const response = await axios.post(`${API_URL}/reviews/post`, { stars, reviewText, movieID })
  return response.data
}


function Review() {
  
  const [movieID, setMovie] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [temporaryRating, setTemporaryRating] = useState(0)

  const stars = Array.from({ length: 5 }, (_, index) => index + 1)
  const visualRating = temporaryRating || rating

  const navigate = useNavigate()

  const mainPage = () => {
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!movieID || rating === 0) {
      return
    }
    try {
      // The API stores half-star ratings as integers from 1 to 10.
      const userData = await reviewPost(rating * 2, comment, movieID)
      console.log('Register successful:', userData)

    } catch (error) {
      console.error('Failed to submit review:', error)
    }
    console.log('Review attempted with:', { rating, comment, movieID })
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
              value={movieID} 
              onChange={(e) => setMovie(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId="formBasicRating">
            <Form.Label>Tähdet:</Form.Label>
            <div
              className='star-rating'
              role='group'
              onMouseLeave={() => setTemporaryRating(0)}
            >
              {stars.map((star) => {
                const icon = visualRating >= star
                  ? 'bi-star-fill'
                  : visualRating >= star - 0.5
                    ? 'bi-star-half'
                    : 'bi-star'

                return (
                  <span className='star-rating-item' key={star}>
                    <i className={`bi ${icon} star-rating-icon`} aria-hidden='true' />
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
                )
              })}
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
            <Button className='review-buttons' onClick={mainPage}>Takaisin</Button>
            <Button className='review-buttons' type="submit">Lähetä</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Review