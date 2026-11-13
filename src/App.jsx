import { Routes, Route } from 'react-router'
import './App.css'
import FrontPage from './FrontPage'
import AboutBar from './components/AboutBar'
import Register from './components/Register'
import Login from './components/Login'
import SearchResults from './components/SearchResults'
import GroupView from './components/GroupView'
import Review from './components/Review'
import MoviePage from './components/MoviePage'
import TopBar from './components/TopBar'

function App() {

  return (
    <div className='fix'>
      <TopBar />
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/Authentication/Register' element={<Register />} />
        <Route path='/Authentication/Login' element={<Login />} />
        <Route path='/search' element={<SearchResults />} />
        <Route path='/GroupView' element={<GroupView />} />
        <Route path='/MovieReviews' element={<Review />} />
        <Route path='/movie' element={<MoviePage />} />
      </Routes>
      <AboutBar />
    </div>
  )
}

export default App
