import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './GroupView.css'
import NavBar from './NavBar'

export default function FrontPage() {
  const navigate = useNavigate()

  return(
    <>
      <div className='main-foundation'>          
        <div className='main-foundation'>
          <NavBar />
        </div>

        <div className='main-page-foundation'>
          <div className='main-base'>
            <div className='main-wrapper'>
              <div className='main-group-container'>               
                <div className='group-chat-section-main'>
                  <div className='group-chat-button-container'>
                    <div className="group-settings-btn" /*onClick={movieReview}*/>Settings</div>
                    <div className="new-group-btn" /*onClick={movieReview}*/>Create new group</div>
                  </div>
                    
                    <div className='group-chat'>
                      <h1>GroupView</h1>
                    </div>
                    
                    <div className='group-chat-participants'>
                      <h1>Participants list</h1>
                    </div>              
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='main-foundation'>
                    
        </div>

      </div>
    </>
  )
}