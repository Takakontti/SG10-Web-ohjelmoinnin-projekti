import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './FrontPage.css'
import AboutBar from './components/AboutBar'
import { useState } from 'react'

export default function FrontPage() {

  const [query,setQuery] = useState('')
  const navigate = useNavigate()

  const authPage = () => {
    navigate('/Authentication/Login')
  }

  const mainPage = () => {
    navigate('/')
  }

  const groupPage = () => {
    navigate('/GroupView')
  }

  const movieReview = () => {
    navigate('/MovieReviews')
  }

  const searchPage = (event) => {
    event.preventDefault()
    navigate(`/search?query=${query.replaceAll(' ','_')}`)
  }

  return(
    <>
      <div className='main-top-bar'>
        <img src="" alt="" />
        <div className="profile_button" onClick={authPage}>Profile</div>
      </div>

      <div className='main-foundation'>
        <div className='navigation-btn'>
          <div className="main-btn" onClick={mainPage}>H</div>
          <div className="main-btn" onClick={groupPage}>G</div>
          <div className="main-btn" onClick={movieReview}>MR</div>
        </div>
        <div className='main-container'>
          <h1>MovCha</h1>
          
          <Form className="search-bar" onSubmit={event => searchPage(event)}> {/*Placeholder className, probably not needed*/}
            <div>
              <input size="40" type="text" placeholder="Search movies..." onChange={event => setQuery(event.target.value)} />
              <button style={{ margin: '10px'}} type="submit">Search</button>
            </div>
          </Form>
        </div>
      </div>
      <div className='main-bottom-bar'>
        <AboutBar />
      </div>
    </>
  )
}