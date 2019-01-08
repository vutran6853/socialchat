CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_username VARCHAR(255),
	user_password VARCHAR(255),
	user_profile_pic TEXT
);

CREATE TABLE posts (
	post_id SERIAL PRIMARY KEY,
	post_title VARCHAR(45),
	post_img TEXT,
	post_content TEXT,
	author_id INTEGER REFERENCES users(user_id)
);


INSERT INTO users(user_username, user_password, user_profile_pic)
VALUES ($1, $2, $3)
RETURNING user_username, user_profile_pic;


