import { pool } from './db.js'

const getGroupUsernames = async (groupId) => {
  const result = await pool.query(
    `SELECT DISTINCT users.username
		 FROM movie_groups AS groups
		 JOIN group_members AS member ON member.group_id = groups.id
		 JOIN users ON users.id = member.user_id
     WHERE groups.id = $1
		 ORDER BY users.username`,
    [groupId]
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

const isGroupAdmin = async (groupId, userId) => {
  const result = await pool.query(
    `SELECT 1
		 FROM group_members
		 WHERE group_id = $1 AND user_id = $2 AND is_admin = TRUE`,
    [groupId, userId]
  )

  return result.rowCount > 0
}

const createGroupMovieList = async (groupId, listName) => {
  const result = await pool.query(
    `INSERT INTO movie_lists (group_id, list_name)
		 VALUES ($1, $2)
		 RETURNING id, group_id, list_name, created_at`,
    [groupId, listName]
  )

  return result.rows[0]
}

const createNewGroup = async (groupName, userId) => {
  const result = await pool.query(
    `WITH new_group AS (
      INSERT INTO movie_groups (group_name)
      VALUES ($1)
      RETURNING id
    )
    INSERT INTO group_members (user_id, group_id, is_admin)
    SELECT $2, new_group.id, 't'
    FROM new_group`
    [groupName, userId]
  )

  return result.rows[0]
}

export { getGroupUsernames, getUserGroups, isGroupAdmin, createGroupMovieList, createNewGroup }
