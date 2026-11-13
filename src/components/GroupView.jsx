import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './GroupView.css'
import NavBar from './NavBar'
import ReviewList from './ReviewList'

export default function GroupView() {
  const [movieId, setMovieId] = useState('')
  const [refreshProp, setRefreshProp] = useState(0)

  function handleSubmit() {
    let src = document.getElementById("review")
    let val = src.value
    getReview(val)
  }

  const getReview = (val) => {  // Dont know if this seperate function is needed, made it to be safe and didnt test other implimentations.
    setMovieId(val)
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
                <input id='review' type='value' size="40" placeholder="Hae elokuva arvosteluja..." />
                <button style={{ margin: '10px'}} onClick={handleSubmit}>Hae</button>
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