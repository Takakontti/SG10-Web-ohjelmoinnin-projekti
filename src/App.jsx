import { Routes, Route, NavLink, useNavigate } from 'react-router';
import './App.css'
import FrontPage from './FrontPage';
import AboutBar from './components/AboutBar';
import Register from './components/Register';

function App() {

  const navigate = useNavigate();

  const auth = () => {
    navigate('/Authentication');
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/components/AboutBar' element={<AboutBar />} />
        <Route path='/Authentication' element={<Register />} />
      </Routes>

      <div className="profile_button" onClick={auth}>Profile</div>

      {/*<div className="card">
        <div style= {{ margin: '10px', textAlign: 'left', background: '#4f1854'}}>
          <div>Movie card</div>
        </div>
        <div style= {{ margin: '10px', textAlign: 'left', background: '#4f1854'}}>
          <div>Movie card</div>
        </div>
      </div>*/}
    </div>
  )
}

export default App
