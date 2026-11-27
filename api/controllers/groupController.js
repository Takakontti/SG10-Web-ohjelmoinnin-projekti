import { getGroupUsernames, getUserGroups, createGroupMovieList, createNewGroup } from '../models/group.js'
import * as uuid from 'uuid'

const getGroupUsers = async (req, res, next) => {
    const { groupId } = req.params
  
    if (!uuid.validate(groupId)) {
      //return res.status(400).json({ message: 'A valid group ID is required' })
    }
  
    try {
      const usernames = await getGroupUsernames(groupId)
      return res.status(200).json({ usernames })
    } catch (error) {
      return next(error)
    }
  },
  getAvailableGroups = async (req, res, next) => {
    try {
      const groups = await getUserGroups(req.user.id)
      return res.status(200).json({ groups })
    } catch (error) {
      return next(error)
    }
  }

const createMovieList = async (req, res, next) => {
  const { groupId } = req.params
  const listName = req.body.listName

  if (listName.length === 0 || listName.length > 30) {
    return res.status(400).json({ message: 'List name must be between 1 and 30 characters' })
  }

  try {
    const list = await createGroupMovieList(groupId, listName)

    return res.status(201).json({ message: 'Movie list created successfully', list })
  } catch (error) {
    return next(error)
  }
}

const NewGroup = async (req, res, next) => {
  const groupName = req.body.groupName
  const userId = req.user.id

  try {
    const result = await createNewGroup(groupName, userId)

    return res.status(201).json({ message: 'Group created successfully', result })
  } catch (error) {
    // ? detailissa katsoo että onko se undefined vaikko ei
    if(error.detail?.includes('already exists')){
      return res.status(409).json({ message: 'Ryhmän nimi on jo käytössä' })
    }
    next(error)
  }
}

export { getGroupUsers, getAvailableGroups, createMovieList, NewGroup }
