INSERT INTO users(user_username, user_password, user_profile_pic)
VALUES ($1, $2, $3)
RETURNING user_username, user_profile_pic;