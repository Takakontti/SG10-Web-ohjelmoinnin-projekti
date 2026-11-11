import axios from "axios"

export const searchMovie = async (param) => {
  const searchTerm = {...param}
  //We're currently missing the functionality to search page 2, 3... High priority to implement
  //Searching for multiple languages requires multiple queries... probably an if(searchResults.some) check in controller
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

export const getMovie = async (param) => {
  const id = {...param}
  console.log(id)
  const HTTPOptions = {
    'method': 'GET',
    'url': `https://api.themoviedb.org/3/movie/${id.query}`,
    'headers': {
      'Authorization': `Bearer ${process.env.TMDB_API_READ_ACCESS}`
    }
  }
  const result = await axios(HTTPOptions)
  return result.data
}