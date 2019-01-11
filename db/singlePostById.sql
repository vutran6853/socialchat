SELECT post_id, post_title, post_img, post_content, user_username, user_profile_pic  from POSTS
INNER JOIN USERS
ON USERS.user_id = POSTS.AUTHOR_ID
WHERE post_id = $1;
