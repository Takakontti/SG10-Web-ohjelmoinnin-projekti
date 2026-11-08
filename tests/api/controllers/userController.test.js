import { beforeEach,afterEach,describe,expect,it,vi } from 'vitest'

vi.mock('../../../api/models/user.js', () => ({
  registerUser: vi.fn(),
  checkForExistingUser: vi.fn(),
  verifyUser: vi.fn()
}))

import * as userControllerObject from '../../../api/controllers/userController.js'
import { checkForExistingUser, registerUser, verifyUser } from '../../../api/models/user.js'
import jwt from 'jsonwebtoken'

describe('createUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.resetAllMocks()
  })

  const createUserSpy = vi.spyOn(userControllerObject,'createUser')

  it('should return status 201, success message and rows from the model when password is 8 characters and has 1 special character, uppercase character and number', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Tester1!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'User created successfully',
      'user': {
        'username': 'testuser',
        'email': 'test@tester.fi'
      }
    }
    registerUser.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })
    checkForExistingUser.mockResolvedValue({
      rows:[]
    })

    await userControllerObject.createUser(req,res,vi.fn())

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })
  
  it('should return status 201, success message and rows from the model when password is 9 characters and has 2 special characters, uppercase characters and numbers', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'TTest12?!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'User created successfully',
      'user': {
        'username': 'testuser',
        'email': 'test@tester.fi'
      }
    }
    registerUser.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })
    checkForExistingUser.mockResolvedValue({
      rows:[]
    })

    await userControllerObject.createUser(req,res,vi.fn())

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 201, success message and rows from the model when password is 12 characters and has 4 uppercase characters and numbers and 2 lowercase characters', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'TESTer1234?!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'User created successfully',
      'user': {
        'username': 'testuser',
        'email': 'test@tester.fi'
      }
    }
    registerUser.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })
    checkForExistingUser.mockResolvedValue({
      rows:[]
    })

    await userControllerObject.createUser(req,res,vi.fn())

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 201, success message and rows from the model when password has 4 lowercase characters', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Ttest12!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'User created successfully',
      'user': {
        'username': 'testuser',
        'email': 'test@tester.fi'
      }
    }
    registerUser.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })
    checkForExistingUser.mockResolvedValue({
      rows:[]
    })

    await userControllerObject.createUser(req,res,vi.fn())

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })
  
  it('should return status 201, success message and rows from the model when password has 4 special characters and 1 lowercase character', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Te12!?@#'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'User created successfully',
      'user': {
        'username': 'testuser',
        'email': 'test@tester.fi'
      }
    }
    registerUser.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })
    checkForExistingUser.mockResolvedValue({
      rows:[]
    })

    await userControllerObject.createUser(req,res,vi.fn())

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 409 with response, when email is already in use', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Test123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'The email is already in use'
    }
    checkForExistingUser.mockResolvedValue({
      rows:[{
        email: 'test@tester.fi'
      }]
    })
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 409 with response, when username is already in use', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Test123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'The username is already in use'
    }
    checkForExistingUser.mockResolvedValue({
      rows:[{
        username: 'testuser'
      }]
    })
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 422 with response, when password is 4 characters', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Te1!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'Password must be at least 8 characters'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })
  
  it('should return status 422 with response, when password is 7 characters', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Test12!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'Password must be at least 8 characters'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })
  
  it('should return status 422 with response, when password has no uppercase characters', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'test123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'Password must contain at least one uppercase letter'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })
  
  it('should return status 422 with response, when password has no lowercase characters', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'TEST123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'Password must contain at least one lowercase letter'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 422 with response, when password has no numbers', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Testpas!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'Password must contain at least one number'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 422 with response, when password has no special characters', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Test1234'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'Password must contain at least one special character'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 422 with response, when email is not valid', async () => {
    const req = {
      body:{
        email: 'test@tester.a',
        username: 'testuser',
        password: 'Test123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'The provided email address is not valid'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 422 with response, when email is absent', async () => {
    const req = {
      body:{
        email:  '',
        username: 'testuser',
        password: 'Test123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'The provided email address is not valid'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should return status 422 with response, when username is absent', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: '',
        password: 'Test123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const expectedValue = {
      'message': 'Username is required'
    }
    
    await userControllerObject.createUser(req,res,vi.fn())
    
    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith(expectedValue)
  })

  it('should pass error in next when recieveing an error', async () => {
    const req = {
      body:{
        email: 'test@tester.fi',
        username: 'testuser',
        password: 'Test123!'
      }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    }
    const next = vi.fn()

    checkForExistingUser.mockRejectedValue(new Error('databaseError'))
    await userControllerObject.createUser(req,res,next)

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(next).toHaveBeenCalledWith(Error('databaseError'))
  })
})

describe('login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('JWT_SECRET', 'test-secret')
    vi.stubEnv('NODE_ENV', 'test')
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.unstubAllEnvs()
  })

  const loginSpy = vi.spyOn(userControllerObject, 'login')
  const credentials = {
    username: 'testuser',
    password: 'Test123!'
  }
  const createResponse = () => ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    cookie: vi.fn()
  })

  it('should authenticate with only username and password and set a valid cookie', async () => {
    const res = createResponse()
    verifyUser.mockResolvedValue({ id: 'user-123' })

    await userControllerObject.login({ body: credentials }, res, vi.fn())

    expect(loginSpy).toHaveBeenCalledOnce()
    expect(verifyUser).toHaveBeenCalledWith(credentials.username, credentials.password)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful' })
    const [cookieName, token, cookieOptions] = res.cookie.mock.calls[0]
    expect(res.cookie).toHaveBeenCalledOnce()
    expect(cookieName).toBe('auth')
    expect(jwt.verify(token, 'test-secret', { issuer: 'MovCha', algorithms: ['HS256'] })).toMatchObject({
      sub: 'user-123',
      iss: 'MovCha'
    })
    const deToken = jwt.decode(token)
    expect(deToken.exp - deToken.iat).toBe(30 * 60)
    expect(cookieOptions).toEqual({
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 60 * 1000
    })
    //expect(TheUnexpected)
  })

  it.each([false, null, undefined])('should return 401 and not set a cookie for invalid credentials (%s)', async (result) => {
    const res = createResponse()
    verifyUser.mockResolvedValue(result)

    await userControllerObject.login({ body: credentials }, res, vi.fn())

    expect(verifyUser).toHaveBeenCalledWith(credentials.username, credentials.password)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' })
    expect(res.cookie).not.toHaveBeenCalled()
  })

  it.each([
    ['an absent request body', undefined],
    ['a null request body', null],
    ['an empty request body', {}],
    ['a missing username', { password: credentials.password }],
    ['a missing password', { username: credentials.username }],
    ['an empty username', { ...credentials, username: '' }],
    ['a whitespace-only username', { ...credentials, username: '   ' }],
    ['an empty password', { ...credentials, password: '' }],
    ['a whitespace-only password', { ...credentials, password: '   ' }],
    ['a non-string username', { ...credentials, username: 123 }],
    ['a non-string password', { ...credentials, password: ['Test123!'] }]
  ])('should reject %s without querying the model or setting a cookie', async (_description, body) => {
    const res = createResponse()

    await userControllerObject.login({ body }, res, vi.fn())

    expect(loginSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' })
    expect(verifyUser).not.toHaveBeenCalled()
    expect(res.cookie).not.toHaveBeenCalled()
  })

  it('should pass model errors to the error middleware', async () => {
    const error = new Error('databaseError')
    const next = vi.fn()
    const res = createResponse()
    verifyUser.mockRejectedValue(error)

    await userControllerObject.login({ body: credentials }, res, next)

    expect(verifyUser).toHaveBeenCalledWith(credentials.username, credentials.password)
    expect(next).toHaveBeenCalledWith(error)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
    expect(res.cookie).not.toHaveBeenCalled()
  })
})