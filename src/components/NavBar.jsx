import { useNavigate } from "react-router"
import './NavBar.css'

export default function NavBar(){
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

  return(
    <nav>
      <button className="nav-btn" onClick={mainPage}>H</button>
      <button className="nav-btn" onClick={groupPage}>G</button>
      <button className="nav-btn" onClick={movieReview}>MR</button>
    </nav>
  )
}