import { useNavigate } from "react-router"
import './TopBar.css'

export default function TopBar(){
  const navigate = useNavigate()

  const authPage = () => {
    navigate('/Authentication/Login')
  }

  return(
    <header>
      <img src="" alt="Profiili" className="profile_button" onClick={authPage} />
    </header>
  )
}
