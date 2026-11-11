import React from 'react'
import './AboutBar.css'

const AboutBar = () => {
  return(
    <div className='AboutBar'>
      {/*<img src="" alt="" />*/}
      <ul>
        <li>home</li>
        <li>about</li>
        <li>group</li>
        <li>This product uses the TMDB API but is not endorsed or certified by TMDB.</li>
      </ul>
    </div>
  )
}

export default AboutBar
