import './AboutBar.css'

export default function AboutBar() {
  return(
    <footer>
      <img src="https://www.themoviedb.org/assets/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" alt="TMDB-logo" className="footerTmdbLogo" />
      {/*<ul className='footerList'>
        <li>home</li>
        <li>about</li>
        <li>group</li>
        <li>tmdb</li>
      </ul>*/}
      <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </footer>
  )
}
