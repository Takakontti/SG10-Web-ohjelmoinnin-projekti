import { searchMovie,getMovie } from "../models/movie.js"

export const search = async (req, res, next) => {
  console.log(req.query)
  const searchResults = await searchMovie(req.query)
  const filteredSearchResults = []
  filteredSearchResults.push(searchResults.map(extractId))
  function extractId(obj,index) {
    return ({
      id: index,
      movieId: obj.id,
      title: obj.title,
      overview: obj.overview
    })
  }
  res.status(200).json({ message: 'Search was successful', movieList: filteredSearchResults })
}

export const getMovieById = async (req,res,next) => {
  console.log(req.query)
  const results = await getMovie(req.query)
  console.log(results)
  res.status(200).json({ message: 'Fetch was successful', movieDetails: results})
}