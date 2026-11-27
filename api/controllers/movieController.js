import { searchMovie,getMovie } from '../models/movie.js'

export const search = async (req, res, next) => {  
  try{
    const searchResultsEN = await searchMovie(req.query,'en-US')
    const searchResultsFI = await searchMovie(req.query,'fi-FI')  

    if(searchResultsEN.status!==200){
      return res.status(searchResultsEN.status).json({ message: searchResultsEN.statusText})
    }

    const simplifiedFI = searchResultsFI.data.results.filter((obj) => {
      if(obj.overview !== ''){
        return obj
      }
    })

    const searchResultsRaw = searchResultsEN.data.results.map(obj => {
      const finnishMovieData = simplifiedFI.find(FIobj => FIobj.id === obj.id)
      
      if(finnishMovieData !== undefined){
        return finnishMovieData
      }else{
        return obj
      }
    })

    if(searchResultsRaw[0]===undefined){
      return res.status(404).json({ message: 'No movies found' })
    }

    const searchResultsResolvedPosterPath = searchResultsRaw.map(obj => {
      if(obj.poster_path === null){
        return 'src/assets/posterNotFound.png'
      }else{
        return `https://image.tmdb.org/t/p/w342${obj.poster_path}`
      }
    })

    const searchResultsChoppedOverview = searchResultsRaw.map(obj => {
      if(obj.overview.length >= 400){
        return `${obj.overview.slice(0,397)}...`
      }else{
        return obj.overview
      }
    })

    const filteredSearchResults = {
      lastPage: searchResultsEN.data.total_pages,
      movieList: []
    }

    filteredSearchResults.movieList.push(searchResultsRaw.map((obj,index) => {  
      const runningCount = parseInt(req.query.index)+index+1

      if(obj.release_date !== ''){ // There's probably a better way to do this, but this works.
        if(obj.title !== obj.original_title){
          return ({
            id: runningCount,
            movieId: obj.id,
            title: obj.title,
            originalTitle: obj.original_title,
            releaseYear: ` (${obj.release_date.slice(0,4)})`,
            overview: searchResultsChoppedOverview[index],
            posterPath: searchResultsResolvedPosterPath[index]
          })
        }else{
          return ({
            id: runningCount,
            movieId: obj.id,
            title: obj.title,
            releaseYear: `(${obj.release_date.slice(0,4)})`,
            overview: searchResultsChoppedOverview[index],
            posterPath: searchResultsResolvedPosterPath[index]
          })
        }
      }else{
        if(obj.title !== obj.original_title){
          return ({
            id: runningCount,
            movieId: obj.id,
            title: obj.title,
            originalTitle: obj.original_title,
            overview: searchResultsChoppedOverview[index],
            posterPath: searchResultsResolvedPosterPath[index]
          })
        }else{
          return ({
            id: runningCount,
            movieId: obj.id,
            title: obj.title,
            overview: searchResultsChoppedOverview[index],
            posterPath: searchResultsResolvedPosterPath[index]
          })
        }
      }  
    }))
    
    return res.status(200).json({ message: 'Search was successful', data: filteredSearchResults })
  }catch(err){
    next(err)
  }
}

export const getMovieById = async (req,res,next) => {
  try{
    const resultsFI = await getMovie(req.query,'fi-FI')
    
    async function resultsFunc() {
      if(resultsFI.data.overview===''){
        return await getMovie(req.query,'en-US')
      }else{
        return resultsFI
      }
    }

    const resultsRaw = await resultsFunc()

    function getGenreNames() {// Do this for more things in order to improve backend speeds
      if(resultsFI.data.genres.length === 0){
        return resultsRaw.data.genres.map(genre => genre.name)
      }else{
        return resultsFI.data.genres.map(genre => genre.name)
      }
    }

    const genreNames = getGenreNames()

    function getProdCompanies() {
      if(resultsFI.data.production_companies.length === 0){
        return resultsRaw.data.production_companies.map(company => company.name)
      }else{
        return resultsRaw.data.production_companies.map(company => company.name)
      }
    }

    const prodCompanies = 'Tuotantoyhtiö(t): ' + getProdCompanies().join(", ")

    if(resultsRaw.status!==200){
      return res.status(resultsRaw.status).json({ message: resultsRaw.statusText})
    }

    function resolvePosterPath(){
      if(resultsRaw.data.poster_path === null){
        return 'src/assets/posterNotFound.png'
      }else{
        return `https://image.tmdb.org/t/p/w342${resultsRaw.data.poster_path}`
      }
    }

    const resolvedPosterPath = resolvePosterPath()

    function filterResults(){
      if(resultsRaw.data.release_date !== ''){ // There's probably a better way to do this, but this works.
        if(resultsRaw.data.title !== resultsRaw.data.original_title){
          return ({
            title: resultsRaw.data.title,
            originalTitle: resultsRaw.data.original_title,
            releaseYear: ` (${resultsRaw.data.release_date.slice(0,4)})`,
            overview: resultsRaw.data.overview,
            posterPath: resolvedPosterPath,
            genres: genreNames,
            studios: prodCompanies
          })
        }else{
          return ({
            title: resultsRaw.data.title,
            releaseYear: `(${resultsRaw.data.release_date.slice(0,4)})`,
            overview: resultsRaw.data.overview,
            posterPath: resolvedPosterPath,
            genres: genreNames,
            studios: prodCompanies
          })
        }
      }else{
        if(resultsRaw.data.title !== resultsRaw.data.original_title){
          return ({
            title: resultsRaw.data.title,
            originalTitle: resultsRaw.data.original_title,
            overview: resultsRaw.data.overview,
            posterPath: resolvedPosterPath,
            genres: genreNames,
            studios: prodCompanies
          })
        }else{
          return ({
            title: resultsRaw.data.title,
            overview: resultsRaw.data.overview,
            posterPath: resolvedPosterPath,
            genres: genreNames,
            studios: prodCompanies
          })
        }
      }
    }

    const filteredResults = filterResults()
    return res.status(200).json({ message: 'Fetch was successful', movieDetails: filteredResults})
  }catch(err){
    next(err)
  }
}