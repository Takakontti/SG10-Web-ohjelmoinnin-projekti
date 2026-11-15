export const STARS = [1, 2, 3, 4, 5]

export const getStarIcon = (rating, star) => {
  if (rating >= star) return 'bi-star-fill'
  if (rating >= star - 0.5) return 'bi-star-half'
  return 'bi-star'
}