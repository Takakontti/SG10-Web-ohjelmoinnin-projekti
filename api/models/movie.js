import axios from "axios"

export const searchMovie = async (param,lang) => {
  const searchTerm = {...param}
  const HTTPOptions = {
    'method': 'GET',
    'url': `https://api.themoviedb.org/3/search/movie?query=${searchTerm.query}&include_adult=true&language=${lang}&page=${searchTerm.page}`,
    'headers': {
      'Authorization': `Bearer ${process.env.TMDB_API_READ_ACCESS}`
    }
  }
  const result = await axios(HTTPOptions)
  return result.data
}

export const getMovie = async (param,lang) => {
  const id = {...param}
  const HTTPOptions = {
    'method': 'GET',
    'url': `https://api.themoviedb.org/3/movie/${id.query}?language=${lang}`,
    'headers': {
      'Authorization': `Bearer ${process.env.TMDB_API_READ_ACCESS}`
    }
  }
  const result = await axios(HTTPOptions)
  return result.data
}