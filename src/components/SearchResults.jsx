import { useEffect, useState } from 'react'
import './SearchResults.css'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router'
import NavBar from './NavBar'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [searchData,setSearchData] = useState([])
  const [lastPage,setLastPage] = useState(0)
  const [getPage,setGetPage] = useState(1)
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const moviePage = (event,id) => {
    event.preventDefault()
    navigate(`/movie?id=${id}`)
  }

  useEffect(() =>{
    async function loadMovies() {
      try{
        const searchPhrase = searchParams.get('query')
        
        const response = await axios.get(`/api/movie/search`,{ params: {
          query: searchPhrase,
          page: getPage,
          index: searchData.length || 0
        }})

        const data = await response.data.data
        const movieListFlat = await data.movieList.flat()
        setLastPage(data.lastPage)
        
        if(movieListFlat!==undefined){
          if(getPage===1){
            setSearchData(movieListFlat)
          }else{
            setSearchData((prevSearchData) => [...prevSearchData,...movieListFlat])
          }
        }
      }catch(err){
        if(err.status === 404){
          setError('Elokuvia ei löytynyt')
        }
        else setError('Jotain meni pieleen, yritä uudestaan myöhemmin')
        setLastPage(1)
      }
    }
    loadMovies()
    return
  },[getPage])

  const nextPage = () => {
    if(lastPage===getPage){
      if(error === ''){
        return(<p className='page-end'>Olet käynyt läpi kaikki hakutulokset.</p>)
      }else{
        return(<></>)
      }
    }else{
      return(
        <button className='load-more-movie-cards' onClick={()=>{
          setGetPage(getPage + 1)
        }}>
          Hae lisää elokuvia
        </button>
      )
    }
  }

  return (
    <>
      <section className='search-foundation'>
        <NavBar />
        <section className='search-container'>
          <h1>Hakutulokset:</h1>
          <h2 className='error-card'>{error}</h2>
          <ul className='movie-card-container'>
            {searchData.map(
              (movie) => {
                return(
                  <li className='movie-card' key={movie.id}>
                    <div className='movie-card-content' role='button' tabIndex={0} onClick={(event) => {moviePage(event,movie.movieId)}}>
                      <img src={movie.posterPath} alt="Movie poster" />
                      <div className='movie-card-text-box'>
                        <div className='movie-card-title-box'>
                          <h2>{movie.title}</h2>
                          <h3>{movie.originalTitle}{movie.releaseYear}</h3>
                        </div>
                        <p>{movie.overview}</p>
                      </div>
                    </div>
                  </li> 
                )
              }
            )}
          </ul>
          {nextPage()}
        </section>
      </section>
    </>
  )
}