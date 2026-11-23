import { useEffect, useState } from 'react'
import './SearchResults.css'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router'
import NavBar from './NavBar'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [searchData,setSearchData] = useState([])
  const [loading,setLoading] = useState(true)
  const [lastPage,setLastPage] = useState(0)
  const [getPage,setGetPage] = useState(1)
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
      }finally{
        setLoading(false)
      }
    }
    loadMovies()
  },[getPage])

  const nextPage = () => {
    if(lastPage===getPage){
      return
    }else{
      return(
        <button className='load-more-movie-cards' onClick={()=>{
          setLoading(true)
          setGetPage(getPage + 1)
        }}>
          Hae lisää elokuvia
        </button>
      )
    }
  }

  if(loading===true){
    return(<p>Haetaan elokuvia...</p>)
  }
  return (
    <>
      <section className='search-foundation'>
        <NavBar />
        <section className='search-container'>
          <h1>Hakutulokset:</h1>
          <ul className='movie-card-container'>
            {searchData.map(
              (movie) => {
                return(
                  <li className='movie-card' key={movie.id}>
                    <div className='movie-card-content' tabIndex={0} onClick={(event) => {moviePage(event,movie.movieId)}}>
                      <img src={`https://image.tmdb.org/t/p/w342${movie.posterPath}`} alt="" />
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