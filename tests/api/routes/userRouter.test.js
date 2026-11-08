import { beforeEach,afterEach,describe,expect,it,vi } from 'vitest'
import express from 'express'
import request from 'supertest'

vi.mock('../../../api/controllers/userController.js')

import userRouter from '../../../api/routes/userRouter'
import { createUser, login } from '../../../api/controllers/userController'
import errorHandler from '../../../api/middleware/errorHandler'

const app = express()
app.use(express.json())
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
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Test123!'
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
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Test123!'
      })
      .expect(500)

    expect(routerResponse.body.error.message).toBe('databaseError')
  })
})

describe('/api/user/login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should route valid login requests to the controller and returns success', async () => {
    login.mockImplementation((req, res) => {
      res.cookie('auth', 'test-token', { httpOnly: true })
      res.status(200).json({ message: 'Login successful' })
    })

    const routerResponse = await request(app)
      .post('/api/user/login')
      .send({ username: 'testuser', password: 'Test123!' })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(routerResponse.body).toEqual({ message: 'Login successful' })
    expect(routerResponse.headers['set-cookie'][0]).toContain('auth=test-token')
    expect(login).toHaveBeenCalledOnce()
    expect(login.mock.calls[0][0].body).toEqual({
      username: 'testuser',
      password: 'Test123!'
    })
  })

  it('should route invalid credentials to the controller and returns 401', async () => {
    login.mockImplementation((req, res) => {
      res.status(401).json({ message: 'Invalid credentials' })
    })

    const routerResponse = await request(app)
      .post('/api/user/login')
      .send({ username: 'testuser', password: 'Wrong123!' })
      .expect(401)
      .expect('Content-Type', /json/)

    expect(routerResponse.body).toEqual({ message: 'Invalid credentials' })
    expect(login).toHaveBeenCalledOnce()
  })

  it('should list POST as the available HTTP method with OPTIONS', async () => {
    const routerResponse = await request(app)
      .options('/api/user/login')
      .expect(200)

    expect(routerResponse.header.allow).toBe('POST')
  })

  it('should return 404 for unsupported methods on the login route', async () => {
    await request(app)
      .get('/api/user/login')
      .expect(404)
    await request(app)
      .put('/api/user/login')
      .expect(404)
    await request(app)
      .patch('/api/user/login')
      .expect(404)
    await request(app)
      .delete('/api/user/login')
      .expect(404)
    await request(app)
      .head('/api/user/login')
      .expect(404)
  })

  it('should forward controller errors to the error middleware', async () => {
    login.mockImplementation((req, res, next) => {
      next(new Error('databaseError'))
    })

    const routerResponse = await request(app)
      .post('/api/user/login')
      .send({ email: 'test@tester.fi', username: 'testuser', password: 'Test123!' })
      .expect(500)

    expect(routerResponse.body.error.message).toBe('databaseError')
    expect(login).toHaveBeenCalledOnce()
  })
})
