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
    <div className='main-foundation'>
    
      <NavBar />
  
      <div className='main-container'>
        <h1>MovCha</h1>

        <Form className='search-bar-fp' role='search' onSubmit={event => searchPage(event)}>
          <input size="40" type="text" placeholder="Hae elokuvia..." onChange={event => setQuery(event.target.value)} />
          <button style={{ margin: '10px'}} type="submit">
            <i className="bi bi-search" aria-hidden='true' />
          </button>
        </Form>     
      </div>
    </div>
  )
}