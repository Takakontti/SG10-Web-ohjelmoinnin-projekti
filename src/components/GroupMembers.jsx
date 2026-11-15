import { useEffect, useState } from 'react'
import axios from 'axios'

export default function GroupMembers({ groupName }) {
  const [usernames, setUsernames] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {

    const fetchGroupUsers = async () => {
      try {
        const response = await axios.get(`/api/groups/${encodeURIComponent(groupName)}/users`)
        setUsernames(response.data.usernames)
      } catch {
        setError('Ryhmän jäsenien lataaminen epäonnistui.')
      }
    }

    fetchGroupUsers()
  }, [groupName])

  return (
    <ul className='group-participant-list'>
      {error ? <li role='alert'>{error}</li> : usernames.map((username) => (
        <li key={username}>{username}</li>
      ))}
    </ul>
  )
}
