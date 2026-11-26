import { useEffect,useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router'
import './MoviePage.css'
import ReviewForm from './review/ReviewForm.jsx'
import ReviewList from './review/ReviewList.jsx'
import NavBar from './NavBar.jsx'

export default function MoviePage() {
  const [searchParams] = useSearchParams()
  const [movieData,setMovieData] = useState({
    genres: [] 
  }) // Interesting syntax
  const [refreshProp,setRefreshProp] = useState(0)
  const searchPhrase = searchParams.get('id') //64690

  useEffect(() =>{
    async function loadMovies() {
      try{
        const response = await axios.get(`/api/movie/id`,{ params: {
          query: searchPhrase
        }})
        console.log(response)
        const data = response.data
        setMovieData(data.movieDetails)
      }catch(err){
        return <p>ERROR: {err}</p>
      }
    }
    loadMovies()
  },[])

  return(
    <>
      <div className='movie-foundation'>
        <NavBar />
        <div className='movie-container'>
          <div className='movie-info-container'>
              <img src={movieData.posterPath} alt="movie poster" className='movie-page-poster' />
            <div className="movie-text-container">
              <h1>{movieData.title}</h1>
              <h2>{movieData.originalTitle}{movieData.releaseYear}</h2>
              <p id='movie-studios'>{movieData.studios}</p>
              <ul className='movie-genres'>
                {movieData.genres.map(
                  (genre,index) => {
                    return(
                      <li key={index} className='movie-genre-item'>
                        <p>{genre}</p>
                      </li>
                    )
                  }
                )}
              </ul>
              <p>{movieData.overview}</p>
            </div>
          </div>
          <div className='movie-review-container'>
            <div className='movie-review-form-box'>
              <ReviewForm movieId={searchPhrase} onSubmitted={()=>{setRefreshProp(value => value+1)}} />
            </div>
            <ReviewList movieId={searchPhrase} refreshProp={refreshProp}/>
          </div>
        </div>
      </div>
    </>
  )
}