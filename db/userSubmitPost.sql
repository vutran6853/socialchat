INSERT INTO posts(author_id, post_title, post_img, post_content)
VALUES ($1, $2, $3, $4)
RETURNING author_id, post_title, post_img, post_content;
