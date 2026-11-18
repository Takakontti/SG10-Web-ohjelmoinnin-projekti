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

const getUserGroups = async (userId) => {
  const result = await pool.query(
    `SELECT id, group_name AS name
		 FROM movie_groups
		 WHERE group_name = 'public'
			 OR id IN (
				 SELECT group_id
				 FROM group_members
				 WHERE user_id = $1
			 )
		 ORDER BY group_name = 'public' DESC, group_name`,
    // ^ Tää järjestää ryhmät niin että public on aina ensinmäinen ja loput aakkosjärjestykseen.
    [userId]
  )

  return result.rows
}

export { getGroupUsernames, getUserGroups }
