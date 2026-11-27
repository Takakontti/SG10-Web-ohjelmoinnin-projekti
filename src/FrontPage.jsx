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
        <h1 className='logo-colour-3' >MovCha</h1>

        <Form className='search-bar-fp' role='search' onSubmit={event => searchPage(event)}>
          <input size="40" type="text" placeholder="Hae elokuvia..." onChange={event => setQuery(event.target.value)} />
          <button style={{ margin: '10px'}} type="submit">
            <i className="bi bi-search" aria-hidden='true' />
          </button>
        </Form>

        <div className='colour-container'>
          <h1 className='logo-colour-1' >MovCha</h1>
          <h1 className='logo-colour-2' >MovCha</h1>
          <h1 className='logo-colour-3' >MovCha</h1>
          <h1 className='logo-colour-4' >MovCha</h1>
          <h1 className='logo-colour-5' >MovCha</h1>
        </div>

        <div className='colour-container' >
          <h1 className='main-colour-1' >MovCha</h1>
          <h1 className='main-colour-2' >MovCha</h1>
          <h1 className='main-colour-3' >MovCha</h1>
          <h1 className='main-colour-4' >MovCha</h1>
          <h1 className='main-colour-5' >MovCha</h1>
        </div>
      </div>
    </div>
  )
}