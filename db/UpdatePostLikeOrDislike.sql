UPDATE posts 
SET post_likes = $1, post_dislikes = $2 
WHERE post_id = $3
RETURNING *