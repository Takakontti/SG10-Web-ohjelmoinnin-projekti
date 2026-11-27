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
        return({
          movieId: obj.id,
          title: obj.title,
          originalTitle: obj.original_title,
          releaseDate: obj.release_date,
          overview: obj.overview,
          posterPath: 'src/assets/posterNotFound.png'
        })
      }else{
        return({
          movieId: obj.id,
          title: obj.title,
          originalTitle: obj.original_title,
          releaseDate: obj.release_date,
          overview: obj.overview,
          posterPath: `https://image.tmdb.org/t/p/w342${obj.poster_path}`
        })
      }
    })
    
    const searchResultsChoppedOverview = searchResultsResolvedPosterPath.map(obj => {
      if(obj.overview.length >= 400){
        return({
          movieId: obj.movieId,
          title: obj.title,
          originalTitle: obj.originalTitle,
          releaseDate: obj.releaseDate,
          overview: `${obj.overview.slice(0,397)}...`,
          posterPath: obj.posterPath
        })
      }else{
        return({
          movieId: obj.movieId,
          title: obj.title,
          originalTitle: obj.originalTitle,
          releaseDate: obj.releaseDate,
          overview: obj.overview,
          posterPath: obj.posterPath
        })
      }
    })

    const filteredSearchResults = {
      lastPage: searchResultsEN.data.total_pages,
      movieList: []
    }

    filteredSearchResults.movieList.push(searchResultsChoppedOverview.map((obj,index) => {  
      const runningCount = parseInt(req.query.index)+index+1

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
      const prodCompanyNameArray = []
      if(resultsFI.data.production_companies.length === 0){
        prodCompanyNameArray.push(resultsRaw.data.production_companies.map(company => company.name))
      }else{
        prodCompanyNameArray.push(resultsRaw.data.production_companies.map(company => company.name))
      }
      const prodCompanyNameString = prodCompanyNameArray.flat().join(", ")
      return 'Tuotantoyhtiö(t): ' + prodCompanyNameString
    }

    const prodCompanies = getProdCompanies()

    if(resultsRaw.status!==200){
      return res.status(resultsRaw.status).json({ message: resultsRaw.statusText})
    }

    function resolvePosterPath(){
      if(resultsRaw.data.poster_path === null){
        return({
          title: resultsRaw.data.title,
          originalTitle: resultsRaw.data.original_title,
          releaseDate: resultsRaw.data.release_date,
          overview: resultsRaw.data.overview,
          posterPath: 'src/assets/posterNotFound.png'
        })
      }else{
        return({
          title: resultsRaw.data.title,
          originalTitle: resultsRaw.data.original_title,
          releaseDate: resultsRaw.data.release_date,
          overview: resultsRaw.data.overview,
          posterPath: `https://image.tmdb.org/t/p/w342${resultsRaw.data.poster_path}`
        })
      }
    }

    const resultsResolvedPosterPath = resolvePosterPath()

    function filterResults(){
      if(resultsResolvedPosterPath.releaseDate !== ''){ // There's probably a better way to do this, but this works.
        if(resultsResolvedPosterPath.title !== resultsResolvedPosterPath.originalTitle){
          return ({
            title: resultsResolvedPosterPath.title,
            originalTitle: resultsResolvedPosterPath.originalTitle,
            releaseYear: ` (${resultsResolvedPosterPath.releaseDate.slice(0,4)})`,
            overview: resultsResolvedPosterPath.overview,
            posterPath: resultsResolvedPosterPath.posterPath,
            genres: genreNames,
            studios: prodCompanies
          })
        }else{
          return ({
            title: resultsResolvedPosterPath.title,
            releaseYear: `(${resultsResolvedPosterPath.releaseDate.slice(0,4)})`,
            overview: resultsResolvedPosterPath.overview,
            posterPath: resultsResolvedPosterPath.posterPath,
            genres: genreNames,
            studios: prodCompanies
          })
        }
      }else{
        if(resultsResolvedPosterPath.title !== resultsResolvedPosterPath.originalTitle){
          return ({
            title: resultsResolvedPosterPath.title,
            originalTitle: resultsResolvedPosterPath.originalTitle,
            overview: resultsResolvedPosterPath.overview,
            posterPath: resultsResolvedPosterPath.posterPath,
            genres: genreNames,
            studios: prodCompanies
          })
        }else{
          return ({
            title: resultsResolvedPosterPath.title,
            overview: resultsResolvedPosterPath.overview,
            posterPath: resultsResolvedPosterPath.posterPath,
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