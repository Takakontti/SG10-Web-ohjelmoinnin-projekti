import { useEffect,useState } from "react"
import axios from "axios"
import { useSearchParams,useNavigate } from "react-router"
import './MoviePage.css'
import AboutBar from "./AboutBar"
import Review from "./Review"

export default function MoviePage() {
  const [searchParams] = useSearchParams()
  const [movieData,setMovieData] = useState([])
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

  useEffect(() =>{
    async function loadMovies() {
      try{
        const searchPhrase = searchParams.get('id') //64690
        const response = await axios.get(`/api/movie/id`,{ params: {
          query: searchPhrase
        }})
        const data = response.data
        setMovieData(data.movieDetails)
      }finally{
        setLoading(false)
      }
    }
    loadMovies()
  },[])
  if(loading===true){
    return(<p>Haetaan elokuvan tietoja...</p>)
  }
  return(
    <>
     <p>
     </p>
     <section className='pageContainer'>
        <nav>
          <button className="nav-btn" onClick={mainPage}>H</button>
          <button className="nav-btn" onClick={groupPage}>G</button>
          <button className="nav-btn" onClick={movieReview}>MR</button>
        </nav>
        <section className='mainContainer'>
          <section className='movieInfo'>
            <section className="imageWrapper">
              <img src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`} alt="" className='poster' />
              <img src="https://www.themoviedb.org/assets/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="TMDB-logo" className="tmdbLogo" />
            </section>
            <section className="movieText">
              <h1>{movieData.title}</h1>
              <p>{movieData.overview}</p>
            </section>
          </section>
          <section className="reviews">
            <Review />
          </section>
        </section>
      </section>
      <AboutBar />
    </>
  )
}