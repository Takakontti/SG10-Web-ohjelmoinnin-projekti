import { useState } from 'react'
import { useSearchParams } from 'react-router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ReviewForm from './ReviewForm'
import MovieReviewList from './MovieReviewList'
import './Review.css'

// Tämä sivu ei varmaan säily kovin kauan mutta on olemassa, jotta arvostelu komponentteja voi testata.

function Review() {
  const [searchParams] = useSearchParams()
  const movieId = searchParams.get('id') || ''
  const [refreshProp, setRefreshProp] = useState(0)

  return (
    <div className='review-wrapper'>
      <ReviewForm
        movieId={movieId}
        onSubmitted={() => setRefreshProp((value) => value + 1)}
      />
      <MovieReviewList movieId={movieId} refreshProp={refreshProp} />
    </div>
  )
}

export default Review
