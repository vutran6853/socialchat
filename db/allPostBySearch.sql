SELECT post_id, post_title, post_img, post_content, user_id, user_username, user_profile_pic  
FROM posts
INNER JOIN users
ON users.user_id = POSTS.author_id
WHERE post_title LIKE '%' ||  $1 || '%';
