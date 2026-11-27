import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import './CreateMovieList.css'
import NavBar from './NavBar'

export default function CreateMovieList() {
  const navigate = useNavigate()
  const location = useLocation()
  // tätä ? merkkiä pitää käyttää jotta sivu ei kaadu jos state ei ole annettu.
  const requestedGroupId = location.state?.selectedGroupId || ''
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(requestedGroupId)
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [listName, setListName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await axios.get('/api/groups/user-groups')
        const availableGroups = response.data.groups || []
        setGroups(availableGroups)
        const selectedGroupExists = availableGroups.some((group) => group.id === requestedGroupId)
        if (selectedGroupExists) setSelectedGroupId(requestedGroupId)
        else setSelectedGroupId(availableGroups[0].id || '')
      } catch (error) {
        console.error('Failed to load groups:', error)
        setMessage('Ryhmien lataaminen epäonnistui. Kirjaudu sisään ja yritä uudelleen.')
        setMessageType('error')
      } finally {
        setGroupsLoading(false)
      }
    }

    loadGroups()
  }, [requestedGroupId])

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setMessageType('')

    const trimmedName = listName.trim()
    if (!selectedGroupId) {
      setMessage('Valitse ryhmä.')
      setMessageType('error')
      return
    }
    if (!trimmedName) {
      setMessage('Anna listalle nimi.')
      setMessageType('error')
      return
    }
    if (trimmedName.length > 30) {
      setMessage('Listan nimi ei saa olla yli 30 merkkiä.')
      setMessageType('error')
      return
    }

    setIsSubmitting(true)
    try {
      await axios.post(`/api/groups/${selectedGroupId}/lists/create`, {
        listName: trimmedName
      })
      setMessage('Elokuvalista luotu onnistuneesti.')
      setMessageType('success')
      setListName('')
      setTimeout(() => {
        navigate('/GroupView', { state: { selectedGroupId } })
      }, 1000)
    } catch (error) {
      console.error('Failed to create movie list:', error)
      setMessage(error.response.data.message || 'Elokuvalistan luominen epäonnistui.')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='main-foundation'>
      <NavBar />

      <main className='create-movie-list-page'>
        <button
          className='back-to-group-btn'
          type='button'
          onClick={() => navigate('/GroupView', { state: { selectedGroupId } })}
        >
          <i className='bi bi-arrow-left' aria-hidden='true' />
          Takaisin ryhmään
        </button>

        <section className='create-movie-list-card'>
          <h2>Luo elokuvalista</h2>
          <p className='create-movie-list-description'>
            Luo uusi lista ryhmällesi.
          </p>

          {groupsLoading ? (
            <p>Loading groups...</p>
          ) : (
            <form className='create-movie-list-form' onSubmit={handleSubmit}>
              <label>Ryhmä</label>
              <select
                value={selectedGroupId}
                onChange={(event) => setSelectedGroupId(event.target.value)}
                disabled={groups.length === 0}
              >
                {groups.length === 0 ? (
                  <option value=''>Ryhmiä ei löytynyt</option>
                ) : (
                  groups.map((group) => (
                    <option value={group.id} key={group.id}>{group.name}</option>
                  ))
                )}
              </select>

              <label>Listan nimi</label>
              <input
                type='text'
                value={listName}
                onChange={(event) => setListName(event.target.value)}
                placeholder='Esim. Suosikit'
                maxLength='30'
                autoFocus
              />

              <button type='submit' disabled={isSubmitting || groups.length === 0}>
                {isSubmitting ? 'Luodaan...' : 'Luo lista'}
              </button>
            </form>
          )}

          {message && (
            <p className={`create-movie-list-message ${messageType}`} >
              {message}
            </p>
          )}
        </section>
      </main>
    </div>
  )
}
