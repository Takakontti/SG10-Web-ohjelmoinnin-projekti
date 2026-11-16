import { useNavigate } from 'react-router'
import './NavBar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

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
      <button className="nav-btn" onClick={mainPage}>
        <i className="bi bi-house-fill" aria-hidden="true" />
      </button>
      <button className="nav-btn" onClick={groupPage}>
        <i className="bi bi-people-fill" aria-hidden="true" />
      </button>
      <button className="nav-btn" onClick={movieReview}>
        <i className="bi bi-star-fill" aria-hidden="true" />
      </button>
    </nav>
  )
}