import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'
import './Review.css'

// Tämä sivu ei varmaan säily kovin kauan mutta on olemassa, jotta arvostelu komponentteja voi testata.

function Review() {
  const [movieId, setMovieId] = useState('')
  const [refreshProp, setRefreshProp] = useState(0)

  return (
    <div className='review-wrapper'>
      <ReviewForm
        movieId={movieId}
        setMovieId={setMovieId}
        onSubmitted={() => setRefreshProp((value) => value + 1)}
      />
      <ReviewList movieId={movieId} refreshProp={refreshProp} />
    </div>
  )
}

export default Review
