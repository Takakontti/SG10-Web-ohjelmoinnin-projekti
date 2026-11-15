import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import { getStarIcon, STARS } from './reviewUtils'
import './ReviewForm.css'

function ReviewForm({ movieId, setMovieId, onSubmitted }) {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [temporaryRating, setTemporaryRating] = useState(0)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const visualRating = temporaryRating || rating
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!movieId || rating === 0) return

    setIsSubmitting(true)
    try {
      // API tallentaa tähdet kokonaisina numeroina 0:n ja 10:n välillä.
      await axios.post('/api/reviews/post', {
        stars: rating * 2,
        reviewText: comment,
        movieID: movieId,
      })
      onSubmitted()
    } catch (error) {
      console.error('Failed to submit review:', error)
      setSubmitError('Arvostelun lähettäminen epäonnistui.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='review-form-container'>
      <h2 className='review-title'>Arvostele elokuva</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicMovieID'>
          <Form.Label>Elokuvan ID:</Form.Label>
          <Form.Control
            type='number'
            placeholder='Elokuva'
            value={movieId}
            onChange={(event) => setMovieId(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicRating'>
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
        <Form.Group className='mb-3 review-comment-group' controlId='formBasicComment'>
          <Form.Label>Arvostelu:</Form.Label>
          <Form.Control
            as='textarea'
            className='rating-text'
            rows={5}
            placeholder='Kirjoita arvostelu...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <div className='button-box'>
          <Button className='review-buttons' onClick={() => navigate('/')}>Takaisin</Button>
          <Button className='review-buttons' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Lähetetään...' : 'Lähetä'}
          </Button>
        </div>
        {submitError && <p className='submit-alert' role='alert'>{submitError}</p>}
      </form>
    </div>
  )
}

export default ReviewForm
