import { getGroupUsernames, getUserGroups } from '../models/group.js'

const getGroupUsers = async (req, res, next) => {
  const { groupName } = req.params
  
  if (typeof groupName !== 'string' || groupName.trim() === '') {
    return res.status(400).json({ message: 'A valid group name is required' })
  }
  
  try {
    const usernames = await getGroupUsernames(groupName)
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

export { getGroupUsers, getAvailableGroups }
