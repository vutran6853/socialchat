CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_username VARCHAR(255) UNIQUE,
	user_password VARCHAR(255),
	user_profile_pic TEXT,
	users_email VARCHAR(255)
);

INSERT INTO users (user_username, user_password, user_profile_pic)
VALUES ($1, $2, $3)
RETURNING user_username, user_profile_pic;


CREATE TABLE posts (
	post_id SERIAL PRIMARY KEY,
	post_title VARCHAR(45),
	post_img TEXT,
	post_content TEXT,
	post_dislikes INTEGER,
	post_likes INTEGER,
	author_id INTEGER REFERENCES users(user_id)
);

INSERT INTO posts (author_id, post_title, post_img, post_content)
VALUES ($1, $2, $3, $4)
RETURNING author_id, post_title, post_img, post_content;


CREATE TABLE comments (
	comments_id SERIAL PRIMARY KEY,
	comments_text TEXT,
	author_id INTEGER REFERENCES users(user_id),
	comments_likes INTEGER,
	comments_dislike INTEGER,
	posts_id INTEGER REFERENCES posts(post_id)
)


SELECT post_id, post_title, post_img, post_content, user_id, user_username, user_profile_pic
FROM posts
INNER JOIN users
ON users.user_id = posts.author_id
WHERE NOT user_id = $1;


SELECT post_id, post_title, post_img, post_content, user_id, user_username, user_profile_pic  
FROM posts
INNER JOIN users
ON users.user_id = POSTS.author_id
WHERE post_title LIKE '%' ||  $1 || '%';


SELECT user_id, user_username, user_profile_pic 
FROM users
WHERE user_username = $1 AND user_password = $2;


SELECT post_id, post_title, post_img, post_content, post_likes, post_dislikes, user_username, user_profile_pic 
FROM posts
INNER JOIN users
ON users.user_id = posts.author_id
WHERE post_id = $1;


SELECT comments_id, comments_text, comments_likes, comments_dislike, post_id, user_profile_pic, user_username
FROM comments
INNER JOIN posts 
ON posts.post_id = comments.posts_id
INNER JOIN users 
ON users.user_id = comments.author_id
WHERE post_id = $1;
