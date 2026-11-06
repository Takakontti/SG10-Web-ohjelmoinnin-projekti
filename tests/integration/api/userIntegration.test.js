import 'dotenv/config'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import app from '../../../api/app.js'
import { pool } from '../../../api/models/db.js'

const testEmail = 'test@tester.fi'
const testUsername = 'testuser'
const testPassword = 'Test123!'

describe('POST /api/user/register (database integration)', () => {
  afterAll(async () => {
    await pool.end()
  })
  beforeAll(async () => {
    await pool.query('DELETE FROM users WHERE username = $1 OR email = $2', [testUsername,testEmail])
  })

  it('creates a user into the database', async () => {
    const integrationResponse = await request(app)
      .post('/api/user/register')
      .send({
        email: testEmail,
        username: testUsername,
        password: testPassword
      })
      .expect(201)
      .expect('Content-Type', /json/)

    expect(integrationResponse.body).toEqual({
      message: 'User created successfully',
      user: {
        email: 'test@tester.fi',
        username: 'testuser'
      }
    })
  })

  it('fails if username or email already exist in the database', async () => {
    const integrationResponse = await request(app)
      .post('/api/user/register')
      .send({
        email: testEmail,
        username: testUsername,
        password: testPassword
      })
      .expect(409)
      .expect('Content-Type', /json/)

    expect(integrationResponse.body).toEqual({
      message: 'The username is already in use',
    }||{
      message: 'The email is already in use',
    })
  })
  
  it('fails if one of the fields is missing', async () => {
    const integrationResponse = await request(app)
      .post('/api/user/register')
      .send({
        email: testEmail,
        password: testPassword
      })
      .expect(500)
      .expect('Content-Type', /json/)

    expect(integrationResponse.body.error.message).toEqual("Cannot read properties of undefined (reading 'length')") //Should probably handle this error
  })
})