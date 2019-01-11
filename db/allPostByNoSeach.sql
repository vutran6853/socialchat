SELECT post_id, post_title, post_img, post_content, user_id, user_username, user_profile_pic  from POSTS
INNER JOIN USERS
ON USERS.user_id = POSTS.AUTHOR_ID
WHERE NOT user_id = $1;