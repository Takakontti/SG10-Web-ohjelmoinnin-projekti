import { Router } from 'express'
import { createUser, login } from '../controllers/userController.js'

const router = Router()

router.post('/register', createUser)
// esimerkki osoite ja JSON-data käyttäjän rekisteröintiin
/*
http://localhost:5173/api/user/register
{
    "email": "test@tester.fi",
    "username": "testuser",
    "password": "Test123!"
}
*/
router.post('/login', login)
// esimerkki osoite ja JSON-data käytäjän kirjautumiseen
/*
http://localhost:5173/api/user/login
{
    "email": "test@tester.fi",
    "username": "testuser",
    "password": "Test123!"
}
*/

export default router