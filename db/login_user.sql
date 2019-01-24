SELECT user_id, user_username, user_profile_pic, user_email
FROM users
WHERE user_username = $1 
AND user_password = $2;