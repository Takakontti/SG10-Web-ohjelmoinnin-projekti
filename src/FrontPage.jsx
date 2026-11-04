import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Frontpage.css';
import AboutBar from './components/AboutBar';

export default function FrontPage() {
    return(
        <>
            <div className='main-wrapper'>
                <Form className='main-form-container'>
                    <img src="" alt="" />
                    <h1>MovCha</h1>
                    <div className="search-bar"> {/*Placeholder className, probably not needed*/}
                    <input size="80" type="text" placeholder="Search movies..." />
                    <button style={{ margin: '10px'}}>Search</button>
                    </div>
                </Form>
            </div>

            <AboutBar />
        </>
    )
}