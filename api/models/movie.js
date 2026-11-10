import axios from "axios"

export const searchMovie = async (param) => {
  const searchTerm = {...param}
  //We're currently missing the functionality to search page 2, 3... High priority to implement
  const HTTPOptions = {
    'method': 'GET',
    'url': `https://api.themoviedb.org/3/search/movie?query=${searchTerm.query}&include_adult=true&language=en-US&page=1`,
    'headers': {
      'Authorization': `Bearer ${process.env.TMDB_API_READ_ACCESS}`
    }
  }
  const result = await axios(HTTPOptions)
  return result.data.results
}