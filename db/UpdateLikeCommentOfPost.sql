UPDATE comments 
SET comments_likes = $1 
WHERE comments_id = $2
Returning *

