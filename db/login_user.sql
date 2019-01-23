SELECT user_id, user_username, user_profile_pic 
FROM users
WHERE user_username = $1 
AND user_password = $2;