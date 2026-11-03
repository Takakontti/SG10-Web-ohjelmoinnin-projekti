import { Router } from 'express'
import { createUser } from '../controllers/userController.js'

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

export default router