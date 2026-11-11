import { Routes, Route, NavLink, useNavigate } from 'react-router'
import './App.css'
import FrontPage from './FrontPage'
import AboutBar from './components/AboutBar'
import Register from './components/Register'
import Login from './components/Login'
import SearchResults from './components/SearchResults'
import GroupView from './components/GroupView'
import Review from './components/Review'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/components/AboutBar' element={<AboutBar />} />
        <Route path='/Authentication/Register' element={<Register />} />
        <Route path='/Authentication/Login' element={<Login />} />
        <Route path='/search' element={<SearchResults />} />
        <Route path='/GroupView' element={<GroupView />} />
        <Route path='/MovieReviews' element={<Review />} />
      </Routes>
    </div>
  )
}

export default App
