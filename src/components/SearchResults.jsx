import { useEffect, useState } from 'react'
import './SearchResults.css'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router'
import AboutBar from './AboutBar.jsx'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const [searchData,setSearchData] = useState([])
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate()

  const mainPage = () => {
    navigate('/')
  }
  const groupPage = () => {
    navigate('/GroupView')
  }
  const movieReview = () => {
    navigate('/MovieReviews')
  }
  const moviePage = (event,id) => {
    event.preventDefault()
    navigate(`/movie?id=${id}`)
  }

  useEffect(() =>{
    async function loadMovies() {
      try{
        const searchPhrase = searchParams.get('query')
        const response = await axios.get(`/api/movie/search`,{ params: {
          query: searchPhrase
        }})
        const data = await response.data
        setSearchData(data.movieList)
      }finally{
        setLoading(false)
      }
    }
    loadMovies()
  },[])
  if(loading===true){
    return(<p>Haetaan elokuvia...</p>)
  }
  return (
    <>
      <section class='pageContainer'>
        <nav>
          <button class="nav-btn" onClick={mainPage}>H</button>
          <button class="nav-btn" onClick={groupPage}>G</button>
          <button class="nav-btn" onClick={movieReview}>MR</button>
        </nav>
        <section class='searchResults'>
          <img src="https://www.themoviedb.org/assets/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="TMDB-logo" className="tmdbLogoSearch" />
          <h1>Hakutulokset:</h1>
          <ul class='movieCardContainer'>
            {searchData[0].map(
              (movie) => {
                return(
                  <li class='movieCard' key={movie.id}>
                    <h2 onClick={event => moviePage(event,movie.movieId)}>{movie.title}</h2>
                    <p>{movie.overview}</p>
                  </li> 
                )
              }
            )}
          </ul>
        </section>
      </section>
      <AboutBar />
    </>
  )
}