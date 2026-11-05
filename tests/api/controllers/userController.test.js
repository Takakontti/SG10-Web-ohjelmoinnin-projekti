import { beforeEach,afterEach,describe,expect,it,vi } from 'vitest'

vi.mock('../../../api/models/user.js', () => ({
  registerUser: vi.fn()
}))

import * as userControllerObject from '../../../api/controllers/userController.js'
import { registerUser } from '../../../api/models/user.js'

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

    await userControllerObject.createUser(req,res,vi.fn())

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(res.status).toHaveBeenCalledWith(201)
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

    registerUser.mockRejectedValue(new Error('databaseError'))
    await userControllerObject.createUser(req,res,next)

    expect(createUserSpy).toHaveBeenCalledOnce()
    expect(next).toHaveBeenCalledWith(Error('databaseError'))
  })
})