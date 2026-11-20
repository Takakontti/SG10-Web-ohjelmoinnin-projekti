import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './GroupView.css'
import NavBar from './NavBar'
import ReviewList from './review/ReviewList'
import GroupMembers from './GroupMembers'

export default function GroupView() {
  const [movieId, setMovieId] = useState('')
  const [refreshProp, setRefreshProp] = useState(0)
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [groupsError, setGroupsError] = useState('')
  const [groupName, setGroupName] = useState('')

  function updateReviews() {  // The changes made to this were completely useless, the function works WAY weirder than before. Also these changes will be reverted soon~
    setRefreshProp(movieId)
  }

  function groupNames(value){
    console.log('value: ', value)
    setSelectedGroupId(value)
    console.log('New: ',selectedGroupId)
    groups.map(getGroupNameById)

    function getGroupNameById(test){  // This doesnt work properly atm, for some reason it is lagging behind. test.name = 1 while groupName = 2 after setting it to 1
      if(test.id === value){
        console.log('Test.name: ', test.name)
        setGroupName(test.name)
        console.log(groupName)
        console.log('worked')
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
        console.log(response.data.groups[0])
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
            <h1>Ryhmänäkymä</h1>
            <div className='group-chat'>
              <div className='items'>
                <ReviewList movieId={refreshProp} />
              </div>

              <div className='search-bar'>
                <input id='review' type='value' size="40" placeholder="Hae elokuva arvosteluja..." onChange={event => setMovieId(event.target.value)}/>
                <button style={{ margin: '10px'}} onClick={updateReviews}>Päivitä</button>
              </div>
            </div>
          </div>

          <div className='group-chat-participants'>
            <h1>Jäsenet</h1>
            <GroupMembers groupName={selectedGroupId} />
          </div>
        </div>
      </div>
    </>
  )
}