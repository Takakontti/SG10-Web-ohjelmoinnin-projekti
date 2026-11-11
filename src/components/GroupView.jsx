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
                
        <div className='main-foundation'>
          <div className='navigation-btn'>
            <div className="main-btn" onClick={mainPage}>H</div>
            <div className="main-btn" onClick={groupPage}>G</div>
            <div className="main-btn" onClick={movieReview}>MR</div>
          </div>
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