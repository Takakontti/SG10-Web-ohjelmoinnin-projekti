import { pool } from './db.js'

const createReview = async (user, stars, review, movie) => {
  const result = await pool.query(
    'INSERT INTO reviews(user_id, stars, review, movie_id) VALUES ($1, $2, $3, $4)',
    [user, stars, review, movie]
  )
  return result
}

export { createReview }