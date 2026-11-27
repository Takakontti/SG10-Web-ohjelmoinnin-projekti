import { useNavigate } from 'react-router'
import './TopBar.css'

export default function TopBar(){
  const navigate = useNavigate()

  const authPage = () => {
    navigate('/Authentication/Login')
  }

  return(
    <header>
      <button className="profile_button" onClick={authPage}>
        <i className='bi bi-person-fill' alt="Profiili"  />
      </button>
    </header>
  )
}
