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
        <button className='loadMore' onClick={()=>{
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
      <section className='pageContainer'>
        <NavBar />
        <section className='searchResults'>
          <img src="https://www.themoviedb.org/assets/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="TMDB-logo" className="tmdbLogoSearch" />
          <h1>Hakutulokset:</h1>
          <ul className='movieCardContainer'>
            {searchData.map(
              (movie) => {
                return(
                  <li className='movieCard' key={movie.id}>
                    <div className='titleBox' onClick={(event) => {moviePage(event,movie.movieId)}}>
                      <h2>{movie.title}</h2>
                      <h3>{movie.original_title}</h3>
                    </div>
                    <p>{movie.overview}</p>
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