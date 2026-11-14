drop table if exists users, movie_groups, reviews, group_members;

create table users(
	id UUID primary key default gen_random_uuid(),
	username VARCHAR(20) not null unique,
	email VARCHAR(30) not null unique,
	password_hash TEXT not null
);

create table movie_groups(
	id UUID primary key default gen_random_uuid(), 
	group_name VARCHAR(40) not null unique
);

create table group_members(
	id UUID primary key default gen_random_uuid(),
	user_id UUID references users(id) on delete cascade,
	group_id UUID references movie_groups(id) on delete cascade,
	is_admin BOOLEAN not null default FALSE
);

create table reviews(
	id UUID primary key default gen_random_uuid(),
	user_id UUID references users(id) on delete cascade,
	stars SMALLINT not null check (stars >= 0 and stars <= 10),
	review TEXT,
	posted_date TIMESTAMPTZ default current_timestamp,
	movie_id INTEGER not null,
	group_id UUID references movie_groups(id) on delete cascade
);

insert into users(id,username,email,password_hash) values ('10000000000000000000000000000000','testuser1','testuser1@test.fi','1'), ('20000000000000000000000000000000','testuser2','testuser2@test.us.gov','2'), ('30000000000000000000000000000000','testuser3','testuser3@test.eu','3');
insert into movie_groups (id,group_name) values ('00000000000000000000000000000001','Testgroup1'), ('00000000000000000000000000000002','Testgroup2');
insert into reviews (user_id,stars,review,movie_id,group_id) values ('10000000000000000000000000000000',10,'Lorem ipsum dolor sit amet',1,'00000000000000000000000000000001');
insert into group_members (user_id,group_id,is_admin) values ('10000000000000000000000000000000','00000000000000000000000000000001',true), ('20000000000000000000000000000000','00000000000000000000000000000001',false), ('20000000000000000000000000000000','00000000000000000000000000000002',true), ('30000000000000000000000000000000','00000000000000000000000000000001',false), ('30000000000000000000000000000000','00000000000000000000000000000002',false);
