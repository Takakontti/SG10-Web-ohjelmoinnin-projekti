import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './GroupView.css'
import NavBar from './NavBar'
import ReviewList from './review/ReviewList'
import GroupMembers from './GroupMembers'

export default function GroupView() {
  const [movieId, setMovieId] = useState('')
  const [getReview, setGetReview] = useState('')
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [groupsError, setGroupsError] = useState('')
  const [groupName, setGroupName] = useState('')

  function updateReviews() {
    setGetReview(selectedGroupId)
  }

  function groupNames(val){
    for(let i = 0; i < groups.length; i++){
      if(groups[i].id === val){
        setSelectedGroupId(val)
        setGroupName(groups[i].name)
        updateReviews()
      }
    }
  }

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await axios.get('/api/groups/user-groups')
        setGroups(response.data.groups)
        setSelectedGroupId(response.data.groups[0].id)
        setGroupName(response.data.groups[0].name)
        setGetReview(response.data.groups[0].id)
      } catch (error) {
        console.error('Failed to load review groups:', error)
        setGroupsError('Ryhmiä ei voitu hakea. Kirjaudu sisään ja yritä uudelleen.')
      } finally {
        setGroupsLoading(false)
      }
    }

    loadGroups()
  }, [])

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

            <button className="new-group-btn">Uusi ryhmä</button>
          </div>

          <div className='group-chat-section'>
            <h1>{groupName}</h1>
            <div className='group-chat'>
              <div className='items'>
                {selectedGroupId === '' ? <p>Odotetaan</p> : <ReviewList groupId={getReview} />}
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