import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getStarIcon, STARS } from './reviewUtils'
import './ReviewForm.css'

function ReviewForm({ movieId, onSubmitted }) {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [temporaryRating, setTemporaryRating] = useState(0)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [groupsError, setGroupsError] = useState('')
  const visualRating = temporaryRating || rating
  const navigate = useNavigate()

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await axios.get('/api/groups/review-options')
        setGroups(response.data.groups)
        setSelectedGroupId(response.data.groups[0].id)
      } catch (error) {
        console.error('Failed to load review groups:', error)
        setGroupsError('Ryhmiä ei voitu hakea. Kirjaudu sisään ja yritä uudelleen.')
      } finally {
        setGroupsLoading(false)
      }
    }

    loadGroups()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    if (!movieId || !selectedGroupId || rating === 0) return

    setIsSubmitting(true)
    try {
      // API tallentaa tähdet kokonaisina numeroina 0:n ja 10:n välillä.
      await axios.post('/api/reviews/post', {
        stars: rating * 2,
        reviewText: comment,
        movieID: movieId,
        groupID: selectedGroupId,
      })
      const selectedGroup = groups.find((group) => group.id === selectedGroupId)
      setSubmitSuccess(`Arvostelu lähetettiin onnistuneesti ${selectedGroup.name || 'valittuun'} ryhmään.`)
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
        <Form.Group className='mb-3' controlId='formReviewGroup'>
          <Form.Label>Ryhmä:</Form.Label>
          <Form.Select
            className='group-select'
            value={selectedGroupId}
            onChange={(event) => setSelectedGroupId(event.target.value)}
            disabled={groupsLoading || groups.length === 0}
          >
            {!groupsLoading && groups.map((group) => (
              <option value={group.id} key={group.id}>{group.name}</option>
            ))}
          </Form.Select>
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
          <Button className='review-buttons' type='submit' disabled={isSubmitting || !movieId || !selectedGroupId}>
            {isSubmitting ? 'Lähetetään...' : 'Lähetä'}
          </Button>
        </div>
        {!movieId && <p role='status'>Elokuvaa ei ole valittu. Avaa arvostelu elokuvan sivulta.</p>}
        {groupsError && <p className='submit-alert' role='alert'>{groupsError}</p>}
        {submitError && <p className='submit-alert' role='alert'>{submitError}</p>}
        {submitSuccess && <p className='submit-success' role='status'>{submitSuccess}</p>}
      </form>
    </div>
  )
}

export default ReviewForm
