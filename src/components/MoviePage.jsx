import { useEffect,useState } from "react"
import axios from "axios"
import { useSearchParams,useNavigate } from "react-router"
import './MoviePage.css'
import Review from "./Review"
import NavBar from "./NavBar.jsx"

export default function MoviePage() {
  const [searchParams] = useSearchParams()
  const [movieData,setMovieData] = useState([])
  const [loading,setLoading] = useState(true)
  
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
     <section className='pageContainer'>
        <NavBar />
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
    </>
  )
}