UPDATE users
SET user_password = $2
WHERE user_id = $1;