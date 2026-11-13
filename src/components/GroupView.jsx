import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './GroupView.css'
import NavBar from './NavBar'
import ReviewList from './ReviewList'

export default function GroupView() {
  const [movieId, setMovieId] = useState('')
  const [refreshProp, setRefreshProp] = useState(0)

  function updateReviews() {  // The changes made to this were completely useless, the function works WAY weirder than before. Also these changes will be reverted soon~
    console.log("here")
    setRefreshProp((val) => val + 1)
  }

  useEffect(() => {
    setMovieId()
    setRefreshProp()
  })

  return(
    <>
      <div className='main-foundation'>          
        
          <NavBar />

        <div className='main-group-container'>
          <div className='group-chat-button-container'>
            <button className="group-settings-btn">Asetukset</button>
            <button className="new-group-btn">Uusi ryhmä</button>
          </div>

          <div className='group-chat-section'>
            <h1>Ryhmänäkymä</h1>
            <ul className='group-chat'>
              <ReviewList movieId={movieId} refreshProp={refreshProp} />

              <div className='search-bar'>
                <input id='review' type='value' size="40" placeholder="Hae elokuva arvosteluja..." onChange={event => setMovieId(event.target.value)}/>
                <button style={{ margin: '10px'}} onClick={updateReviews}>Päivitä</button>
              </div>
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