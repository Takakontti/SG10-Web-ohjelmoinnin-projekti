import { Routes, Route, NavLink, useNavigate } from 'react-router'
import './App.css'
import FrontPage from './FrontPage'
import AboutBar from './components/AboutBar'
import Register from './components/Register'
import Login from './components/Login'
import GroupView from './components/GroupView'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/components/AboutBar' element={<AboutBar />} />
        <Route path='/Authentication/Register' element={<Register />} />
        <Route path='/Authentication/Login' element={<Login />} />
        <Route path='/GroupView' element={<GroupView />} />
      </Routes>
    </div>
  )
}

export default App
