/*import { describe,it,expect,vi,beforeEach,afterEach } from 'vitest'

vi.mock('axios'){
  axios: vi.fn()
}

import { searchMovie,getMovie } from '../../../api/models/movie'
import axios from 'axios'

describe('searchMovie',()=>{
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return the search results on success',async()=>{
    axios.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: {
        content_type: 'application/json',
        connection: 'keep-alive'
      },
      config: {
        method: 'get',
        url: 'https://api.themoviedb.org/3/search/movie?query=test&include_adult=true&language=fi-FI&page=1'
      },
      data: {
        page: 1,
        results: [{
          id: 1,
          title: 'testMovie'
        }],
        total_pages: 1,
        total_results: 1
      }
    })

    const params = {
      query
    }
  })
})*/

import { describe, expect, it } from 'vitest'

describe('test suite sanity check', () => {
  it('always passes', () => {
    expect(true).toBe(true)
  })
})