SELECT comments_id, comments_text, comments_likes, comments_dislike, post_id, user_profile_pic, user_username
FROM comments
INNER JOIN posts 
ON posts.post_id = comments.posts_id
INNER JOIN users 
ON users.user_id = comments.author_id
WHERE post_id = $1;
