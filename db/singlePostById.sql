SELECT post_id, post_title, post_img, post_content, post_likes, post_dislikes, user_username, user_profile_pic 
FROM posts
INNER JOIN users
ON users.user_id = posts.author_id
WHERE post_id = $1;