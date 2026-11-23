import { searchMovie,getMovie } from '../models/movie.js'

export const search = async (req, res, next) => {  
  const searchResultsEN = await searchMovie(req.query,'en-US')
  const searchResultsFI = await searchMovie(req.query,'fi-FI')  
  
  const simplifiedFI = searchResultsFI.results.filter((obj) => {
    if(obj.overview !== ''){
      return obj
    }
  })

  const searchResultsRaw = searchResultsEN.results.map(obj => {
    const finnishMovieData = simplifiedFI.find(FIobj => FIobj.id === obj.id)
    
    if(finnishMovieData !== undefined){
      return finnishMovieData
    }else{
      return obj
    }
  })

  const searchResultsChoppedOverview = searchResultsRaw.map(obj => {
    if(obj.overview.length >= 400){
      return({
        movieId: obj.id,
        title: obj.title,
        originalTitle: obj.original_title,
        releaseDate: obj.release_date,
        overview: `${obj.overview.slice(0,397)}...`,
        posterPath: obj.poster_path
      })
    }else{
      return({
        movieId: obj.id,
        title: obj.title,
        originalTitle: obj.original_title,
        releaseDate: obj.release_date,
        overview: obj.overview,
        posterPath: obj.poster_path
      })
    }
  })

  const filteredSearchResults = {
    lastPage: searchResultsEN.total_pages,
    movieList: []
  }

  filteredSearchResults.movieList.push(searchResultsChoppedOverview.map((obj,index) => {  
    const runningCount = parseInt(req.query.index)+index+1
    console.log(obj)

    if(obj.releaseDate !== ''){ // There's probably a better way to do this, but this works.
      if(obj.title !== obj.originalTitle){
        return ({
          id: runningCount,
          movieId: obj.movieId,
          title: obj.title,
          originalTitle: obj.originalTitle,
          releaseYear: ` (${obj.releaseDate.slice(0,4)})`,
          overview: obj.overview,
          posterPath: obj.posterPath
        })
      }else{
        return ({
          id: runningCount,
          movieId: obj.movieId,
          title: obj.title,
          releaseYear: `(${obj.releaseDate.slice(0,4)})`,
          overview: obj.overview,
          posterPath: obj.posterPath
        })
      }
    }else{
      if(obj.title !== obj.originalTitle){
        return ({
          id: runningCount,
          movieId: obj.movieId,
          title: obj.title,
          originalTitle: obj.originalTitle,
          overview: obj.overview,
          posterPath: obj.posterPath
        })
      }else{
        return ({
          id: runningCount,
          movieId: obj.movieId,
          title: obj.title,
          overview: obj.overview,
          posterPath: obj.posterPath
        })
      }
    }  
  }))
  console.log(filteredSearchResults)
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