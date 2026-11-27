import { pool } from './db.js'

// Tää näyttää tyhmältä mutta javascript ottaa tässä annetun arvon vain jos groupID on undefined.
const createReview = async (user, stars, review, movie, groupID = '10000000-0000-8000-b000-000000000000') => { 
    const result = await pool.query(
      'INSERT INTO reviews(user_id, stars, review, movie_id, group_id) VALUES ($1, $2, $3, $4, $5)',
      [user, stars, review, movie, groupID]
    )
    return result
  }, 
  showReview = async (movieID) => {
    const result = await pool.query(
      `SELECT reviews.user_id, users.username, reviews.stars, reviews.review, reviews.posted_date 
      FROM reviews 
      LEFT JOIN users 
      ON reviews.user_id = users.id 
      WHERE reviews.movie_id = $1
      AND reviews.group_id = '10000000-0000-8000-b000-000000000000'
      ORDER BY reviews.posted_date ASC`,
      [movieID]
    )
    return result.rows
  },
  showGroupReviews = async (groupID, limit, offset) => {
    const result = await pool.query(
      `SELECT reviews.id, reviews.user_id, users.username, reviews.stars, reviews.review, reviews.movie_id, reviews.group_id, reviews.posted_date
      FROM reviews
      LEFT JOIN users
      ON reviews.user_id = users.id
      WHERE reviews.group_id = $1
      ORDER BY reviews.posted_date DESC, reviews.id DESC
      LIMIT $2 OFFSET $3`,
      [groupID, limit, offset]
    )
    return result.rows
  }

export { 
  createReview,
  showReview,
  showGroupReviews
}