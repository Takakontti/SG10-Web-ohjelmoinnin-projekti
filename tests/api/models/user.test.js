import { describe,it,expect,vi,beforeEach,afterEach } from 'vitest'

vi.mock('../../../api/models/db.js', () => ({
  pool: {
    query: vi.fn()
  }
}))

import { registerUser,checkForExistingUser } from '../../../api/models/user.js'
import { pool } from '../../../api/models/db.js'

describe('registerUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const password = 'Test123!'

  it('should return username and email on success', async () => { 
    pool.query.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })

    const returnValue = await registerUser('test@tester.fi','testuser',password)

    expect(returnValue.rows[0].username).toBe('testuser')
    expect(returnValue.rows[0].email).toBe('test@tester.fi')
  })

  it('should throw error on recieving database error', async () => { 
    pool.query.mockRejectedValue(new Error('databaseError'))

    await expect(registerUser('test@tester.fi','testuser',password)).rejects.toThrow('databaseError')
  })
})

describe('checkForExistingUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return username if username exists', async () => { 
    pool.query.mockResolvedValue({
      rows:[{
        username: 'testuser'
      }]
    })

    const returnValue = await checkForExistingUser('test@tester.fi','testuser')

    expect(returnValue.rows).toEqual([{
      username: 'testuser'
    }])
  })

  it('should return email if email exists', async () => { 
    pool.query.mockResolvedValue({
      rows:[{
        email: 'test@tester.fi'
      }]
    })

    const returnValue = await checkForExistingUser('test@tester.fi','testuser')

    expect(returnValue.rows).toEqual([{
      email: 'test@tester.fi'
    }])
  })

  it('should return both username and email if both exist', async () => { 
    pool.query.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })

    const returnValue = await checkForExistingUser('test@tester.fi','testuser')

    expect(returnValue.rows).toEqual([{
      username: 'testuser',
      email: 'test@tester.fi'
    }])
  })

  it('should return empty table if email and username are new', async () => { 
    pool.query.mockResolvedValue({
      rows:[]
    })

    const returnValue = await checkForExistingUser('test@tester.fi','testuser')

    expect(returnValue.rows).toEqual([])
  })

  it('should throw error on recieving database error', async () => { 
    pool.query.mockRejectedValue(new Error('databaseError'))

    await expect(checkForExistingUser('test@tester.fi','testuser')).rejects.toThrow('databaseError')
  })
})