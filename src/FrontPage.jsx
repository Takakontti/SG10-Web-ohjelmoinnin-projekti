import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './FrontPage.css'
import { useState } from 'react'
import NavBar from './components/NavBar'

export default function FrontPage() {
  const [query,setQuery] = useState('')
  const navigate = useNavigate()

  const searchPage = (event) => {
    event.preventDefault()
    navigate(`/search?query=${query.replaceAll(' ','_')}`)
  }

  return(
    <>
      <div className='main-foundation'>          
        <div className='main-foundation'>
          <NavBar />
        </div>

        <div className='main-page-foundation'>
          <div className='main-base'>

                        
            <div className='main-wrapper'>
              <div className='main-container'>
                <h1>MovCha</h1>

                <Form role='search' onSubmit={event => searchPage(event)}>
                  <input size="40" type="text" placeholder="Hae elokuvia..." onChange={event => setQuery(event.target.value)} />
                  <button style={{ margin: '10px'}} type="submit">Hae</button>
                </Form>

              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}