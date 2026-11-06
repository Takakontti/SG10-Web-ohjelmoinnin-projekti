import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './Frontpage.css';
import AboutBar from './components/AboutBar';



export default function FrontPage() {

    const navigate = useNavigate();

    const authPage = () => {
        navigate('/Authentication/Login');
    }

    const mainPage = () => {
        navigate('/');
    }

    const groupPage = () => {
        navigate('/GroupView');
    }

    const movieReview = () => {
        navigate('/MovieReviews');
    }

    return(
        <>
            <div className='main-top-bar'>
                <img src="" alt="" />
                <div className="profile_button" onClick={authPage}>Profile</div>
            </div>

            <div className='main-foundation'>
                
            </div>

            <div className='main-foundation'>
                
                <div className='main-foundation'>
                    <div className='navigation-btn'>
                        <div className="main-btn" onClick={mainPage}>H</div>
                        <div className="main-btn" onClick={groupPage}>G</div>
                        <div className="main-btn" onClick={movieReview}>MR</div>
                    </div>
                </div>

                <div className='main-page-foundation'>
                    <div className='main-base'>

                        
                        <div className='main-wrapper'>
                            <div className='main-container'>
                                <h1>MovCha</h1>

                                <div className="search-bar"> {/*Placeholder className, probably not needed*/}
                                    <input size="40" type="text" placeholder="Search movies..." />
                                    <button style={{ margin: '10px'}}>Search</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='main-foundation'>
                    
                </div>

                
            </div>
            <AboutBar />
        </>
    )
}