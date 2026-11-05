import { beforeEach,afterEach,describe,expect,it,vi } from 'vitest'
import express from 'express'
import request from 'supertest'

vi.mock('../../../api/controllers/userController.js'/*, () => ({
  createUser: (req,res,next) => {
    res.status(201).json({
      message: 'User created successfully',
      user: {
        email: 'test@tester.fi',
        username: 'testuser'
      }
    })
  }
})*/);

import userRouter from '../../../api/routes/userRouter';
import { createUser } from '../../../api/controllers/userController'
import errorHandler from '../../../api/middleware/errorHandler';

const app = express()
app.use('/api/user', userRouter)
app.use(errorHandler)

describe('/api/user/register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  
  it('should call userController with POST method and recieve the response', async () => {
    createUser.mockImplementation((req,res,next) => {
      res.status(201).json({
        message: 'User created successfully',
        user: {
          email: 'test@tester.fi',
          username: 'testuser'
        }
      })
    })
    const routerResponse = await request(app)
      .post('/api/user/register')
      .send({
        email: "test@tester.fi",
        username: "testuser",
        password: "Test123!"
      })
      .expect(201)
      .expect('Content-Type', /json/)

    expect(routerResponse.body).toEqual({
      message: 'User created successfully',
      user: {
        email: 'test@tester.fi',
        username: 'testuser'
      }
    })
  })

  it('should list all available HTTP methods with the OPTIONS method', async () => {
    const routerResponse = await request(app)
      .options('/api/user/register')
      .expect(200)

    expect(routerResponse.header.allow).toBe('POST')
  })

  it('should return 404 if an undefined method is called', async () => {
    await request(app)
      .get('/api/user/register')
      .expect(404)
    await request(app)
      .put('/api/user/register')
      .expect(404)
    await request(app)
      .patch('/api/user/register')
      .expect(404)
    await request(app)
      .delete('/api/user/register')
      .expect(404)
    await request(app)
      .head('/api/user/register')
      .expect(404)
  })

  it('should call userController with POST method and recieve the error', async () => {
    createUser.mockImplementation((req,res,next) => {
      next(new Error('databaseError'))
    })
    const routerResponse = await request(app)
      .post('/api/user/register')
      .send({
        email: "test@tester.fi",
        username: "testuser",
        password: "Test123!"
      })
      .expect(500)

    expect(routerResponse.body.error.message).toBe('databaseError')
  })
})