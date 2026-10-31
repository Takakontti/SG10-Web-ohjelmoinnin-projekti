DROP TABLE IF EXISTS test;

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    description TEXT
);

INSERT INTO test (description) VALUES ('bar'), ('baz'), ('qux');

drop table if exists users, movie_groups, reviews, group_members;

create table users(
	id UUID primary key default gen_random_uuid(),
	username VARCHAR(20) not null unique,
	email VARCHAR(30) not null unique,
	password_hash TEXT not null
);

create table movie_groups(
	id UUID primary key default gen_random_uuid(), 
	group_name VARCHAR(40) not null unique,
	admin_id UUID references users(id) on delete cascade
);

create table reviews(
	id UUID primary key default gen_random_uuid(),
	user_id UUID references users(id) on delete cascade,
	stars SMALLINT not null check (stars >= 0 and stars <= 10),
	review TEXT,
	posted_date TIMESTAMPTZ default current_timestamp,
	movie_id INTEGER not null
);

create table group_members(
	id UUID primary key default gen_random_uuid(),
	user_id UUID references users(id) on delete cascade,
	group_id UUID references movie_groups(id) on delete cascade
);

insert into users(id,username,email,password_hash) values ('a000bc999c0b4ef8bb6d6bb9bd380a11','testuser1','testuser1@test.fi','1'), ('b000bc999c0b4ef8bb6d6bb9bd380a11','testuser2','testuser2@test.us.gov','2'), ('c000bc999c0b4ef8bb6d6bb9bd380a11','testuser3','testuser3@test.eu','3');
insert into movie_groups (id,group_name,admin_id) values ('a0eebc999c0b4ef8bb6d6bb9bd380a01','Testgroup1','a000bc999c0b4ef8bb6d6bb9bd380a11'), ('a0eebc999c0b4ef8bb6d6bb9bd380a02','Testgroup2','b000bc999c0b4ef8bb6d6bb9bd380a11');
insert into reviews (user_id,stars,review,movie_id) values ('a000bc999c0b4ef8bb6d6bb9bd380a11',10,'Lorem ipsum dolor sit amet',1);
insert into group_members (user_id,group_id) values ('a000bc999c0b4ef8bb6d6bb9bd380a11','a0eebc999c0b4ef8bb6d6bb9bd380a01'), ('b000bc999c0b4ef8bb6d6bb9bd380a11','a0eebc999c0b4ef8bb6d6bb9bd380a01'), ('b000bc999c0b4ef8bb6d6bb9bd380a11','a0eebc999c0b4ef8bb6d6bb9bd380a02'), ('c000bc999c0b4ef8bb6d6bb9bd380a11','a0eebc999c0b4ef8bb6d6bb9bd380a01'), ('c000bc999c0b4ef8bb6d6bb9bd380a11','a0eebc999c0b4ef8bb6d6bb9bd380a02');
