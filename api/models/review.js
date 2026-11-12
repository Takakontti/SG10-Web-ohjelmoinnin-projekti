import { pool } from './db.js'

const createReview = async (user, stars, review, movie) => {
    const result = await pool.query(
      'INSERT INTO reviews(user_id, stars, review, movie_id) VALUES ($1, $2, $3, $4)',
      [user, stars, review, movie]
    )
    return result
  }, showReview = async (movieID) => {
    const result = await pool.query(
      'SELECT reviews.user_id, users.username, reviews.stars, reviews.review, reviews.posted_date FROM reviews LEFT JOIN users ON reviews.user_id = users.id WHERE reviews.movie_id = $1',
      [movieID]
    )
    return result.rows
  }

export { 
  createReview,
  showReview
}