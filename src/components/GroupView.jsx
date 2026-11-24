import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import axios from 'axios'
import './GroupView.css'
import NavBar from './NavBar'
import ReviewList from './review/ReviewList'
import GroupMembers from './GroupMembers'

export default function GroupView() {
  const navigate = useNavigate()
  const location = useLocation()
  const requestedGroupId = location.state?.selectedGroupId || ''
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(requestedGroupId)
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [groupsError, setGroupsError] = useState('')
  const [groupName, setGroupName] = useState('')

  function groupNames(value) {
    const selectedGroup = groups.find((group) => group.id === value)

    if (selectedGroup) {
      setSelectedGroupId(selectedGroup.id)
      setGroupName(selectedGroup.name)
    }
  }

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await axios.get('/api/groups/user-groups')
        const availableGroups = response.data.groups || []
        setGroups(availableGroups)

        const requestedGroup = availableGroups.find((group) => group.id === requestedGroupId)
        const groupToSelect = requestedGroup || availableGroups[0]

        if (groupToSelect) {
          setSelectedGroupId(groupToSelect.id)
          setGroupName(groupToSelect.name)
        } else {
          setSelectedGroupId('')
          setGroupName('')
        }
      } catch (error) {
        console.error('Failed to load review groups:', error)
        setGroupsError('Ryhmiä ei voitu hakea. Kirjaudu sisään ja yritä uudelleen.')
      } finally {
        setGroupsLoading(false)
      }
    }

    loadGroups()
  }, [requestedGroupId])

  return(
    <>
      <div className='main-foundation'>
        
        <NavBar />

        <div className='main-group-container'>
          <div className='group-chat-button-container'>
            <button className="group-settings-btn">
              <i className="bi bi-gear-fill" aria-hidden="true" />
            </button>

            <Form.Group className='mb-3' controlId='formReviewGroup'>
              <Form.Select
                className='group-select'
                value={selectedGroupId}
                onChange={(event) => groupNames(event.target.value)}
                disabled={groupsLoading || groups.length === 0}
              >
                {!groupsLoading && groups.map((group) => (
                  <option value={group.id} key={group.id}>{group.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <button
              className="new-list-btn"
              type="button"
              title="Luo lista"
              disabled={groupsLoading || !selectedGroupId}
              onClick={() => navigate('/CreateMovieList', {
                state: { selectedGroupId, selectedGroupName: groupName }
              })}
            >
              {/* Tähän ehkä löytyy sopivampi ikoni mutta tää on sopivin mitä löysin. */}
              <i className="bi bi-list-ul" aria-hidden="true" />
            </button>
          </div>

          <div className='group-chat-section'>
            <h1>{groupName}</h1>
            <div className='group-chat'>
              <div className='items'>
                {selectedGroupId === '' ? <p>Odotetaan</p> : <ReviewList groupId={selectedGroupId} />}
              </div>

              <div className='search-bar'>
                {/*<button style={{ margin: '10px'}} onClick={updateReviews}>Päivitä</button>*/}
              </div>
            </div>
          </div>

          <div className='group-chat-participants'>
            <h1>Jäsenet</h1>
            {selectedGroupId === '' ? <p>Odotetaan</p> : <GroupMembers groupId={selectedGroupId} />}
          </div>
        </div>
      </div>
    </>
  )
}