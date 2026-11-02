import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get('/api/tests')
      setData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>MovCha</h1>
      <div className="search-bar">
        <input size="80" type="text" placeholder="Search..." />
        <button style={{ margin: '10px'}}>Search</button>
      </div>
      <div className="card">
        <div style= {{ margin: '10px', textAlign: 'left', background: '#4f1854'}}>
          <div>Movie card</div>
        </div>
        <div style= {{ margin: '10px', textAlign: 'left', background: '#4f1854'}}>
          <div>Movie card</div>
        </div>
      </div>
        {error && (
          <div style={{ marginTop: '20px', padding: '10px', background: '#ffebee', color: 'red' }}>
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}
    </>
  )
}

export default App
