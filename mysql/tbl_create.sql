CREATE TABLE IF NOT EXISTS User(
	username varchar(20) NOT NULL,
	password  varchar(256),
	PRIMARY KEY (username)
);
