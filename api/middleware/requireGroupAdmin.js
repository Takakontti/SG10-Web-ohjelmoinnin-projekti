import { isGroupAdmin } from '../models/group.js'
import * as uuid from 'uuid'

const requireGroupAdmin = async (req, res, next) => {
  if (!req.user.id) {
    //return res.status(401).json({ message: 'Authentication is required' })
  }

  const { groupId } = req.params
  const isUuid = uuid.validate(groupId)

  if (!isUuid) {
    return res.status(400).json({ message: 'A valid group ID is required' })
  }

  try {
    const isAdmin = await isGroupAdmin(groupId, req.user.id)

    if (!isAdmin) {
      return res.status(403).json({ message: 'Only group admins can perform this action' })
    }

    return next()
  } catch (error) {
    return next(error)
  }
}

export { requireGroupAdmin }
