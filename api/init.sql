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

insert into users(id,username,email,password_hash) values ('10000000000000000000000000000000','testuser1','testuser1@test.fi','1'), ('20000000000000000000000000000000','testuser2','testuser2@test.us.gov','2'), ('30000000000000000000000000000000','testuser3','testuser3@test.eu','3');
insert into movie_groups (id,group_name,admin_id) values ('00000000000000000000000000000001','Testgroup1','10000000000000000000000000000000'), ('00000000000000000000000000000002','Testgroup2','20000000000000000000000000000000');
insert into reviews (user_id,stars,review,movie_id) values ('10000000000000000000000000000000',10,'Lorem ipsum dolor sit amet',1);
insert into group_members (user_id,group_id) values ('10000000000000000000000000000000','00000000000000000000000000000001'), ('20000000000000000000000000000000','00000000000000000000000000000001'), ('20000000000000000000000000000000','00000000000000000000000000000002'), ('30000000000000000000000000000000','00000000000000000000000000000001'), ('30000000000000000000000000000000','00000000000000000000000000000002');
