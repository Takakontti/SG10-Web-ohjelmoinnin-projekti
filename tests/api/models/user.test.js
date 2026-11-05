import { describe,it,expect,vi,beforeEach,afterEach } from 'vitest'

vi.mock('../../../api/models/db.js', () => ({
  pool: {
    query: vi.fn()
  }
}))

import * as userObject from '../../../api/models/user.js'
import { pool } from '../../../api/models/db.js'

describe('registerUser', () => {
  beforeEach(() => {
    vi.clearAllMocks
  })
  afterEach(() => {
    vi.restoreAllMocks
  })

  const password = 'Test123!'

  const registerUserSpy = vi.spyOn(userObject,'registerUser')

  it('should return username and email on success', async () => { 
    pool.query.mockResolvedValue({
      rows:[{
        username: 'testuser',
        email: 'test@tester.fi'
      }]
    })

    const returnValue = await userObject.registerUser('test@tester.fi','testuser',password)

    expect(registerUserSpy).toHaveBeenCalledOnce()
    expect(returnValue.rows[0].username).toBe('testuser')
    expect(returnValue.rows[0].email).toBe('test@tester.fi')
  })

  it('should throw error on recieving database error', async () => { 
    pool.query.mockRejectedValue(new Error('databaseError'))

    await expect(userObject.registerUser('test@tester.fi','testuser',password)).rejects.toThrow('databaseError')
    expect(registerUserSpy).toHaveBeenCalledOnce()
  })
})