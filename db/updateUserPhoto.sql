UPDATE users
SET user_profile_pic = $2
WHERE user_id = $1
RETURNING user_id, user_username, user_profile_pic;