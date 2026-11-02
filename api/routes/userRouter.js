import { Router } from 'express'
import { createUser } from '../controllers/userController.js'

const router = Router()

router.post('/register', createUser)
// example address and body for testing in bruno/postman
/*
http://localhost:5173/api/user/register
{
    "email": "test@tester.fi",
    "username": "testuser",
    "password": "Test123!"
}
*/

export default router