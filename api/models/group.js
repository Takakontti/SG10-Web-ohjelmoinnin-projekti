import { pool } from './db.js'

const getGroupUsernames = async (groupName) => {
  const result = await pool.query(
    `SELECT DISTINCT users.username
		 FROM movie_groups AS groups
		 JOIN group_members AS member ON member.group_id = groups.id
		 JOIN users ON users.id = member.user_id
		 WHERE groups.group_name = $1
		 ORDER BY users.username`,
    [groupName]
  )

  return result.rows.map((row) => row.username)
}

export { getGroupUsernames }
