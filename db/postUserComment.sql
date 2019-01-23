INSERT INTO comments(comments_text, author_id, comments_likes, comments_dislike, posts_id)
VALUES ($1, $2, 0, 0, $3);