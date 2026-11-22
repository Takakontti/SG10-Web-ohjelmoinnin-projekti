import { useEffect, useState } from 'react'
import axios from 'axios'

export default function GroupMembers({ groupId }) {
  const [usernames, setUsernames] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {

    let isCurrentReq = true

    const fetchGroupUsers = async () => {
      try {
        const response = await axios.get(`/api/groups/${encodeURIComponent(groupId)}/users`)
        if(isCurrentReq) setUsernames(response.data.usernames)
      } catch {
        if(isCurrentReq) setError('Ryhmän jäsenien lataaminen epäonnistui.')
      }
    }

    fetchGroupUsers()
    return () => {
      isCurrentReq = false
    } 
  }, [groupId])

  return (
    <ul className='group-participant-list'>
      {error ? <li role='alert'>{error}</li> : usernames.map((username) => (
        <li key={username}>{username}</li>
      ))}
    </ul>
  )
}
