import { searchMovie,getMovie } from "../models/movie.js"

export const search = async (req, res, next) => {  
  const searchResultsEN = await searchMovie(req.query,'en-US')
  const searchResultsFI = await searchMovie(req.query,'fi-FI')  
  
  const simplifiedFI = searchResultsFI.results.filter((obj) => {
    if(obj.overview !== ''){
      return obj
    }
  })

  const searchResults = searchResultsEN.results.map(obj => {
    const finnishMovieData = simplifiedFI.find(FIobj => FIobj.id === obj.id)
    
    if(finnishMovieData !== undefined){
      return finnishMovieData
    }else{
      return obj
    }
  })

  const filteredSearchResults = {
    lastPage: searchResultsEN.total_pages,
    movieList: []
  }

  filteredSearchResults.movieList.push(searchResults.map((obj,index) => {  
    const runningCount = parseInt(req.query.index)+index+1
    
    if(obj.title !== obj.original_title){
      return ({
        id: runningCount,
        movieId: obj.id,
        title: obj.title,
        original_title: obj.original_title,
        overview: obj.overview
      })
    }else{
      return ({
        id: runningCount,
        movieId: obj.id,
        title: obj.title,
        overview: obj.overview
      })
    }
  }))

  res.status(200).json({ message: 'Search was successful', data: filteredSearchResults })
}

export const getMovieById = async (req,res,next) => {
  const resultsFI = await getMovie(req.query,'fi-FI')
  
  async function resultsFunc() {
    if(resultsFI.overview===''){
      return await getMovie(req.query,'en-US')
    }else{
      return resultsFI
    }
  }
  
  const results = await resultsFunc()
  res.status(200).json({ message: 'Fetch was successful', movieDetails: results})
}