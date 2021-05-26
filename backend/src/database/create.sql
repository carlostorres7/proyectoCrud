--DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id serial not null,
	name varchar(50) not null UNIQUE,
	city varchar(100) not null,
	createdat timestamp not null default now(),
	updatedat timestamp not null default now(),
	primary key (id)
);

CREATE TABLE task (
	id serial not null,
	name varchar(50) not null UNIQUE,
	createdat timestamp not null default now(),
	updatedat timestamp not null default now(),
	primary key (id)
);