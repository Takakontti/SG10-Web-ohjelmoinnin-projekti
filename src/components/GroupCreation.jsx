import { Form, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import './GroupCreation.css'

function groupCreation() {
  const navigate = useNavigate()
  const [groupName, setGroupName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState ({})

  const groupPage = () => {
    navigate('/GroupView')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!groupName.trim()) newErrors.form = 'Ryhmä nimi vaaditaan.'

    // This excludes all unwanted special charactes
    if (/[@#$€%&*^¨~=¿;|§½+\\,/£{}()<>`´¸\[\]":]/.test(groupName)) newErrors.form = 'Sallitut erikoismerkit on = ! ? \' _ -'
    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length > 0) {
      return
    }

    setIsCreating(true)
    try {
      await axios.post('/api/groups/new-group', {
        groupName: groupName
      })

      setSuccess({form: 'Ryhmän luominen onnistui!'})
    } catch (error) {
      setErrors({ form: error.response.data.message })
    } finally {
      setIsCreating(false)
    }
  }

  return(
    <>
        <div className='group-creation-foundation'>
            <div className='group-creation-form'>
                <h2 className='title' >Luo uusi ryhmä</h2>
                <Form onSubmit={handleSubmit}>
                    <div className='group-creation-alert-field'>
                        {errors.form && <Alert className='group-creation-error' variant="danger" role="alert">{errors.form}</Alert>}
                        {success.form && <Alert className='group-creation-success' variant="success" role="alert">{success.form}</Alert>}
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Ryhmän nimi:</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Nimi tähän..."
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value)
                            // Tyhjentää errorit ja success messaget kun kenttään kirjoitetaan
                            setErrors((currentErrors) => ({ ...currentErrors, form: undefined }))
                            setSuccess((success) => ({ ...success, form: undefined }))
                        }} />
                    </Form.Group>
                    <div className='group-create-buttons-container'>
                        <Button className="group-create-buttons" onClick={groupPage}>Takaisin</Button>
                        <Button variant="primary" type="submit" 
                            className="group-create-buttons"
                            onClick={() => {
                                // Tyhjentää success kentän jotta voit tehdä monta ryhmää ilman että success field on kokoajan näkyvillä
                                setSuccess((success) => ({ ...success, form: undefined }))
                            }}
                            disabled={isCreating}>
                                {isCreating ? 'Luodaan...' : 'Luo Ryhmä'}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    </>
  )
}

export default groupCreation