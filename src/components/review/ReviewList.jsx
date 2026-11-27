import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Virtuoso } from 'react-virtuoso'
import { getStarIcon, STARS } from './reviewUtils'
import './ReviewList.css'

const PAGE_SIZE = 8
const FIRST_ITEM_INDEX = 100000

function ReviewList({ groupId }) {
  const [reviews, setReviews] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [firstItemIndex, setFirstItemIndex] = useState(FIRST_ITEM_INDEX)
  const virtuosoRef = useRef(null)
  const loadingOlderRef = useRef(false)
  const scrollAnchorRef = useRef(null)

  const route = `/api/reviews/get/group/${groupId}`

  useEffect(() => {
    if (!groupId) return

    const controller = new AbortController()
    setReviews([])
    setHasMore(false)
    setError('')
    setFirstItemIndex(FIRST_ITEM_INDEX)
    setLoading(true)

    async function loadReviews() {
      try {
        const response = await axios.get(route, {
          params: { limit: PAGE_SIZE, offset: 0 },
          signal: controller.signal
        })
        const initialReviews = [...response.data.review].reverse()
        scrollAnchorRef.current = {
          index: FIRST_ITEM_INDEX + initialReviews.length - 1
        }
        setReviews(initialReviews)
        setHasMore(Boolean(response.data.hasMore))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError('Arvosteluja ei voitu hakea.')
          console.error('Failed to load reviews:', requestError)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadReviews()

    return () => controller.abort()
  }, [route, groupId])

  useLayoutEffect(() => {
    if (scrollAnchorRef.current !== null) {
      virtuosoRef.current?.scrollToIndex({
        index: scrollAnchorRef.current.index,
      })
      scrollAnchorRef.current = null
    }
  }, [reviews, firstItemIndex])

  const loadOlderReviews = useCallback(async () => {
    if (loadingOlderRef.current || !hasMore) return

    loadingOlderRef.current = true
    setError('')

    try {
      const response = await axios.get(route, {
        params: { limit: PAGE_SIZE, offset: reviews.length }
      })
      const olderReviews = [...response.data.review].reverse()

      if (olderReviews.length) {
        const addedCount = olderReviews.length
        setFirstItemIndex((index) => index - addedCount)
        setReviews((previous) => [...olderReviews, ...previous])
      }
      setHasMore(Boolean(response.data.hasMore))
    } catch (requestError) {
      setError('Arvostelujen haku epäonnistui.')
      console.error('Failed to load additional reviews:', requestError)
    } finally {
      loadingOlderRef.current = false
    }
  }, [hasMore, reviews, route])

  if (loading && reviews.length === 0) {
    return <div className='review-list-status'>Haetaan arvosteluja...</div>
  }

  if (error) {
    return <div className='review-list-status'>{error}</div>
  }

  return (
    <Virtuoso
      ref={virtuosoRef}
      key={groupId}
      style={{ height: '100%', width: '100%' }}
      data={reviews}
      firstItemIndex={firstItemIndex}
      startReached={loadOlderReviews}
      computeItemKey={(_, review) => review.id}
      skipAnimationFrameInResizeObserver
      increaseViewportBy={{ top: 300 }}
      itemContent={(_, review) => {
        const rating = review.stars / 2

        return (
          <li className='review'>
            <h2>{review.username || 'Käyttäjä'}</h2>
            <div className='review-stars' role='img'>
              {STARS.map((star) => (
                <i
                  className={`bi ${getStarIcon(rating, star)} star-rating-icon`}
                  key={star}
                  aria-hidden='true'
                />
              ))}
            </div>
            <p>{review.review}</p>
          </li>
        )
      }}
    />
  )
}

export default ReviewList
