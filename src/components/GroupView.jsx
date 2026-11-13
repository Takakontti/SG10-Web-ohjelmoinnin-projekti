import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './GroupView.css'
import NavBar from './NavBar'

export default function FrontPage() {
  const navigate = useNavigate()

  return(
    <>
      <div className='main-foundation'>          
        
          <NavBar />

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