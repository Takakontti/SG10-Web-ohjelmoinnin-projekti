import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './GroupView.css'

export default function FrontPage() {

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
    <>
      <div className='main-top-bar'>
        <img src="" alt="" />
        <div className="profile_button" >Profile</div>
      </div>

      <div className='main-foundation'>

        <div className='navigation-btn'>
          <div className="main-btn" onClick={mainPage}>H</div>
          <div className="main-btn" onClick={groupPage}>G</div>
          <div className="main-btn" onClick={movieReview}>MR</div>
        </div>

        <div className='main-group-container'>               
          <div className='group-chat-button-container'>
            <button className="group-settings-btn" /*onClick={movieReview}*/>Asetukset</button>
            <button className="new-group-btn" /*onClick={movieReview}*/>Uusi ryhmä</button>
          </div>

          <div className='group-chat-section'>
            <h1>Ryhmänäkymä</h1>
            <ul className='group-chat'>
              <li className='item'>Arvostelu Kortti</li>
              <li className='item'>Arvostelu Kortti</li>
            </ul>
          </div> 

          <div className='group-chat-participants'>
            <h1>Osallistujat</h1>
          </div>            
        </div>
      </div>
    </>
  )
}