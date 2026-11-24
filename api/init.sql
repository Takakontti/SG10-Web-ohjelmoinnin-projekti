drop table if exists users, movie_groups, reviews, group_members, movie_lists, movie_list_items;

create table users(
	id UUID primary key default gen_random_uuid(),
	username VARCHAR(20) not null unique,
	email VARCHAR(30) not null unique,
	password_hash TEXT not null
);

create table movie_groups(
	id UUID primary key default gen_random_uuid(), 
	group_name VARCHAR(30) not null unique
);

create table group_members(
	id UUID primary key default gen_random_uuid(),
	user_id UUID references users(id) on delete cascade,
	group_id UUID references movie_groups(id) on delete cascade,
	is_admin BOOLEAN not null default FALSE
);

create table movie_lists(
	id UUID primary key default gen_random_uuid(),
	group_id UUID references movie_groups(id) on delete cascade,
	list_name VARCHAR(30) not null,
	created_at TIMESTAMPTZ not null default current_timestamp
);

create table movie_list_items(
	list_id UUID not null unique references movie_lists(id) on delete cascade,
	movie_id INTEGER not null,
	position INTEGER not null unique check (position >= 0),
	primary key (list_id, movie_id)
);

create table reviews(
	id UUID primary key default gen_random_uuid(),
	user_id UUID references users(id) on delete cascade,
	stars SMALLINT not null check (stars >= 1 and stars <= 10),
	review TEXT,
	posted_date TIMESTAMPTZ default current_timestamp,
	movie_id INTEGER not null,
	group_id UUID not null default '10000000-0000-8000-b000-000000000000' references movie_groups(id) on delete cascade
);

insert into users(id,username,email,password_hash) values ('00000000-0000-8000-b000-100000000000','testuser','test@tester.fi','$2b$10$jyB2UDAJZLi5xkkdUVYhEuM3ZuSSk2bYLgEiPt0kiFhFHPQsn/YAK');
insert into movie_groups (id,group_name) values ('10000000-0000-8000-b000-000000000000','public');

-- AI generated test data starts here

INSERT INTO users(id,username,email,password_hash) VALUES
	('a0000001-0000-8000-b000-000000000001','user_01','user01@test.io','$2b$12$abcdef01'),
	('a0000001-0000-8000-b000-000000000002','user_02','user02@test.io','$2b$12$abcdef02'),
	('a0000001-0000-8000-b000-000000000003','user_03','user03@test.io','$2b$12$abcdef03'),
	('a0000001-0000-8000-b000-000000000004','user_04','user04@test.io','$2b$12$abcdef04'),
	('a0000001-0000-8000-b000-000000000005','user_05','user05@test.io','$2b$12$abcdef05'),
	('a0000001-0000-8000-b000-000000000006','user_06','user06@test.io','$2b$12$abcdef06'),
	('a0000001-0000-8000-b000-000000000007','user_07','user07@test.io','$2b$12$abcdef07'),
	('a0000001-0000-8000-b000-000000000008','user_08','user08@test.io','$2b$12$abcdef08'),
	('a0000001-0000-8000-b000-000000000009','user_09','user09@test.io','$2b$12$abcdef09'),
	('a0000001-0000-8000-b000-000000000010','user_10','user10@test.io','$2b$12$abcdef10'),
	('a0000001-0000-8000-b000-000000000011','user_11','user11@test.io','$2b$12$abcdef11'),
	('a0000001-0000-8000-b000-000000000012','user_12','user12@test.io','$2b$12$abcdef12'),
	('a0000001-0000-8000-b000-000000000013','user_13','user13@test.io','$2b$12$abcdef13'),
	('a0000001-0000-8000-b000-000000000014','user_14','user14@test.io','$2b$12$abcdef14'),
	('a0000001-0000-8000-b000-000000000015','user_15','user15@test.io','$2b$12$abcdef15'),
	('a0000001-0000-8000-b000-000000000016','user_16','user16@test.io','$2b$12$abcdef16'),
	('a0000001-0000-8000-b000-000000000017','user_17','user17@test.io','$2b$12$abcdef17'),
	('a0000001-0000-8000-b000-000000000018','user_18','user18@test.io','$2b$12$abcdef18'),
	('a0000001-0000-8000-b000-000000000019','user_19','user19@test.io','$2b$12$abcdef19'),
	('a0000001-0000-8000-b000-000000000020','user_20','user20@test.io','$2b$12$abcdef20'),
	('a0000001-0000-8000-b000-000000000021','user_21','user21@test.io','$2b$12$abcdef21'),
	('a0000001-0000-8000-b000-000000000022','user_22','user22@test.io','$2b$12$abcdef22'),
	('a0000001-0000-8000-b000-000000000023','user_23','user23@test.io','$2b$12$abcdef23'),
	('a0000001-0000-8000-b000-000000000024','user_24','user24@test.io','$2b$12$abcdef24'),
	('a0000001-0000-8000-b000-000000000025','user_25','user25@test.io','$2b$12$abcdef25');

INSERT INTO movie_groups(id,group_name) VALUES
	('a1b2c3d4-0001-8a00-b000-000000000001','Action Movie Fans'),
	('a1b2c3d4-0002-8a00-b000-000000000002','Sci-Fi Enthusiasts'),
	('a1b2c3d4-0003-8a00-b000-000000000003','Comedy Club'),
	('a1b2c3d4-0004-8a00-b000-000000000004','Horror Night Owls'),
	('a1b2c3d4-0005-8a00-b000-000000000005','Documentary Watchers'),
	('a1b2c3d4-0006-8a00-b000-000000000006','Romance Fans'),
	('a1b2c3d4-0007-8a00-b000-000000000007','Animation Lovers'),
	('a1b2c3d4-0008-8a00-b000-000000000008','Thriller Seekers'),
	('a1b2c3d4-0009-8a00-b000-000000000009','Classic Cinema Club'),
	('a1b2c3d4-0010-8a00-b000-000000000010','Indie Film Fans'),
	('a1b2c3d4-0011-8a00-b000-000000000011','Superhero Squad'),
	('a1b2c3d4-0012-8a00-b000-000000000012','Western Movie Group'),
	('a1b2c3d4-0013-8a00-b000-000000000013','Mystery Solvers'),
	('a1b2c3d4-0014-8a00-b000-000000000014','Fantasy Realm Fans'),
	('a1b2c3d4-0015-8a00-b000-000000000015','Foreign Film Circle'),
	('a1b2c3d4-0016-8a00-b000-000000000016','Musical Movie Lovers'),
	('a1b2c3d4-0017-8a00-b000-000000000017','War History Films'),
	('a1b2c3d4-0018-8a00-b000-000000000018','Biography Film Fans'),
	('a1b2c3d4-0019-8a00-b000-000000000019','Adventure Seekers'),
	('a1b2c3d4-0020-8a00-b000-000000000020','Stop Motion Club'),
	('a1b2c3d4-0021-8a00-b000-000000000021','Noir Film Group'),
	('a1b2c3d4-0022-8a00-b000-000000000022','Family Movie Night'),
	('a1b2c3d4-0023-8a00-b000-000000000023','Auteur Film Society'),
	('a1b2c3d4-0024-8a00-b000-000000000024','Cult Classic Fans'),
	('a1b2c3d4-0025-8a00-b000-000000000025','Anime Movie Watchers');

-- Partially AI-generated data starts here

INSERT INTO reviews(user_id,stars,review,posted_date,movie_id) VALUES
	('a0000001-0000-8000-b000-000000000001',8,'A stunning visual masterpiece with incredible pacing. The soundtrack alone is worth the price of admission.','2025-01-14 09:23:47.512 +0000',64690),
	('a0000001-0000-8000-b000-000000000002',3,'Started strong but fell apart in the third act. Too many subplots for one film.','2025-02-02 14:07:33.891 -0500',64690),
	('a0000001-0000-8000-b000-000000000003',10,'','2025-01-28 22:15:09.004 +0530',64690),
	('a0000001-0000-8000-b000-000000000004',6,'Decent performances but the director clearly overreached with the runtime. Could easily be trimmed by 20 minutes.','2025-03-11 08:44:21.337 +0100',64690),
	('a0000001-0000-8000-b000-000000000005',1,'Unwatchable from start to finish. Worst sequel of the decade, hands down.','2025-02-19 17:30:55.678 -0800',64690),
	('a0000001-0000-8000-b000-000000000006',9,'The emotional climax had me in tears. A rare gem that truly delivers on its promises.','2025-01-05 11:02:18.445 +0900',64690),
	('a0000001-0000-8000-b000-000000000007',4,'','2025-03-22 19:55:42.210 -0300',64690),
	('a0000001-0000-8000-b000-000000000008',7,'Solid genre film with a few surprising twists. Not groundbreaking but thoroughly entertaining.','2025-02-08 06:18:33.756 +0000',64690),
	('a0000001-0000-8000-b000-000000000009',2,'The CGI was so bad it broke immersion every five minutes. Save your money.','2025-01-30 13:41:07.992 -0500',64690),
	('a0000001-0000-8000-b000-000000000010',8,'','2025-03-01 20:29:14.583 +0530',64690),
	('a0000001-0000-8000-b000-000000000011',5,'Middle-of-the-road adaptation. Faithful to the source material but lacks any spark of its own.','2025-02-14 10:33:26.117 +0100',64690),
	('a0000001-0000-8000-b000-000000000012',10,'A transcendent experience. I watched it twice in one day and will undoubtedly watch it again this weekend.','2025-01-20 16:08:49.334 -0800',64690),
	('a0000001-0000-8000-b000-000000000013',1,'','2025-03-15 04:52:11.845 +0900',64690),
	('a0000001-0000-8000-b000-000000000014',6,'The lead actor carried this entire film on his shoulders. The supporting cast was forgettable at best.','2025-02-25 12:17:38.602 -0300',64690),
	('a0000001-0000-8000-b000-000000000015',9,'','2025-01-09 23:44:56.271 +0000',64690),
	('a0000001-0000-8000-b000-000000000016',3,'Predictable plot, flat dialogue, and an ending that made no sense. Two stars would be generous.','2025-03-08 07:26:19.490 -0500',64690),
	('a0000001-0000-8000-b000-000000000017',7,'A fun ride with heart. The animation style is a perfect fit for the story being told.','2025-02-03 15:51:44.728 +0530',64690),
	('a0000001-0000-8000-b000-000000000018',4,'','2025-01-25 18:33:02.156 +0100',64690),
	('a0000001-0000-8000-b000-000000000019',8,'Brilliant use of practical effects. You can feel the craft in every frame. A love letter to filmmaking itself.','2025-03-19 11:09:27.883 -0800',64690),
	('a0000001-0000-8000-b000-000000000020',5,'Neither here nor there. I fell asleep during the second reel and woke up for the credits.','2025-02-11 21:47:53.419 +0900',64690),
	('a0000001-0000-8000-b000-000000000021',9,'','2025-01-17 09:12:36.650 -0300',64690),
	('a0000001-0000-8000-b000-000000000022',2,'The franchise is dead and this film is its obituary. Every trope has been exhausted to the point of mockery.','2025-03-25 14:28:41.974 +0000',64690),
	('a0000001-0000-8000-b000-000000000023',7,'','2025-02-06 16:55:08.231 -0500',64690),
	('a0000001-0000-8000-b000-000000000024',6,'Respectable but uninspired. The director will likely find a better vehicle for his ideas next time around.','2025-01-31 05:38:14.509 +0530',64690),
	('a0000001-0000-8000-b000-000000000025',10,'I cannot find the words. Simply put, this is the best film I have seen in twenty years of going to the cinema.','2025-03-04 19:03:27.762 +0100',64690),
	('a0000001-0000-8000-b000-000000000001',9,'Absolutely stunning cinematography. The director pulled off an impossible shot sequence in the third act that had the entire theater on their feet.','2024-03-15 14:30:22.185 +0500',5672),
	('a0000001-0000-8000-b000-000000000002',7,'Good pacing but the middle act drags a bit. The supporting cast more than carries the weight of the narrative.','2024-01-08 09:12:45.732 +0000',690),
	('a0000001-0000-8000-b000-000000000003',3,'I really wanted to love this one. The premise is solid but the execution falls flat. Too many clichés for my taste.','2023-11-22 18:45:03.911 -0500',1),
	('a0000001-0000-8000-b000-000000000004',10,'A masterpiece. Every single frame is a work of art. I have already rewatched it three times and I will keep going.','2024-02-19 22:10:55.407 +0900',2),
	('a0000001-0000-8000-b000-000000000005',1,'','2023-12-01 06:33:18.256 +0100',3),
	('a0000001-0000-8000-b000-000000000006',5,'Decent enough. Not great, not terrible. It gets the job done if you are looking for a quick two-hour distraction.','2024-04-02 11:27:41.883 -0800',4),
	('a0000001-0000-8000-b000-000000000007',8,'The score alone is worth the ticket price. Hans Zimmer outdid himself this time around.','2023-10-14 16:55:29.640 +0300',5),
	('a0000001-0000-8000-b000-000000000008',2,'Unbearable. I left at the forty-minute mark. The dialogue is wooden and the plot holes are the size of a car.','2024-03-28 08:19:37.521 +0000',6),
	('a0000001-0000-8000-b000-000000000009',6,'A solid rewatch. The first viewing was more impactful but it still holds up surprisingly well.','2023-09-05 20:41:12.094 +1000',6),
	('a0000001-0000-8000-b000-000000000010',4,'The visuals are gorgeous but the story underneath is thin. A pretty package with nothing to say.','2024-05-11 13:08:54.377 -0300',8),
	('a0000001-0000-8000-b000-000000000011',9,'The final twist completely recontextualizes everything you have seen before. Brilliant writing.','2023-08-19 17:22:08.816 +0530',9),
	('a0000001-0000-8000-b000-000000000012',1,'','2024-01-25 04:56:33.442 +0700',7841),
	('a0000001-0000-8000-b000-000000000013',7,'Better than expected. The second half is significantly stronger than the first. The lead actor delivers a career-best performance.','2023-12-15 19:34:47.209 -0600',12345),
	('a0000001-0000-8000-b000-000000000014',10,'I am not even sure what to say. It broke something open in me that I did not know was closed. A once-in-a-lifetime experience.','2024-02-03 23:58:11.653 +0000',54321),
	('a0000001-0000-8000-b000-000000000015',3,'The first twenty minutes are promising but then it loses all momentum. By the end I was just waiting for the credits.','2023-11-08 10:14:26.918 +0200',67890),
	('a0000001-0000-8000-b000-000000000016',8,'A thrilling ride from start to finish. The stunts are practical and you can feel every impact. No CGI nonsense here.','2024-04-18 15:47:02.335 +0930',9876),
	('a0000001-0000-8000-b000-000000000017',5,'','2023-10-30 07:29:55.148 -0700',234567),
	('a0000001-0000-8000-b000-000000000018',6,'It does not reinvent the wheel but it executes its genre conventions with confidence and a fun energy.','2024-03-07 12:53:38.761 +0400',134567),
	('a0000001-0000-8000-b000-000000000019',2,'The pacing is all wrong. Scenes that should be quick montages stretch on forever while key moments get rushed past.','2023-09-21 21:05:19.527 +0000',145678),
	('a0000001-0000-8000-b000-000000000020',9,'The ensemble cast is phenomenal. Every single character gets a moment to shine without stealing from the others.','2024-05-22 09:38:44.290 +0800',156789),
	('a0000001-0000-8000-b000-000000000021',4,'Not bad but forgettable. I could not tell you who directed it or what year it was released by now.','2023-08-04 14:16:07.834 -0400',167890),
	('a0000001-0000-8000-b000-000000000022',7,'','2024-01-12 18:22:31.466 +0600',245678),
	('a0000001-0000-8000-b000-000000000023',1,'I do not even know how this got made. It offends no one, says nothing, and wastes two hours of your life.','2023-07-19 11:44:59.203 +0000',256789),
	('a0000001-0000-8000-b000-000000000024',8,'A quiet, confident film that trusts its audience. No explosions, no twists. Just great acting and a beautiful story told well.','2024-02-27 16:03:28.574 +1100',267890),
	('a0000001-0000-8000-b000-000000000025',5,'It is fine. That is the most I can say. You will not be disappointed but you will not be thrilled either.','2023-12-28 05:17:42.919 -0200',278901),
	('00000000-0000-8000-b000-100000000000',9,$review$Nicolas Winding Refn's Drive arrives like a bruise forming in slow motion—a film that lingers in your mind long after the credits roll, fading out into a neon haze. At just over an hour, this neo-noir is an exercise in restraint and intensity, telling the story of a taciturn Hollywood stunt driver (Ryan Gosling) who moonlights as a getaway driver at night and whose quiet domestic life is shattered when his neighbor's ex-husband pulls a botched bank job. What makes Drive extraordinary is not what happens, but how it feels: every frame is steeped in a melancholy so thick you can almost taste it, balanced against bursts of visceral, unflinching violence.

The visual language of Drive is perhaps its most immediately arresting quality. Refn and cinematographer Anthony Dod Mantle bath the film in a palette of electric oranges, deep purples, and cold blues that make Los Angeles look like a city existing in a fever dream or a 1980s music video. The night scenes glow with synthetic warmth while the daylight stretches into something pale and indifferent. It's a look that has become iconic—mimicked endlessly in thumbnails, posters, and fashion spreads—but in context, it serves the story perfectly. The beauty is a veneer over something rotten, just as the protagonist's calm exterior hides a capacity for devastating rage.

Ryan Gosling's performance is the film's gravitational center, and he commits fully to playing the character as near-silent, communicating through small gestures, a half-smile, or the set of his jaw. It's a risky choice that could have made him feel absent, but Gosling fills the void with an almost physical stillness that makes every moment he finally speaks or acts land with enormous weight. Carey Mulligan brings a gentle, grounded warmth as Irene, the mother trying to hold her family together, while Bryan Cranston delivers a lean, tense performance as the ex-husband whose desperation sets everything in motion. The supporting cast is sharp without stealing the spotlight from Gosling's enigmatic presence.

The soundtrack by Junk XL (the alias of composer Cliff Martinez) is inseparable from the film's identity. Tracks like "A Real Hero" and "The Watch" pulse with synth-driven urgency that turns even a simple car chase into something operatic. The score doesn't merely accompany the action; it is the emotional engine of the film, giving voice to the protagonist's inner life where dialogue cannot reach. Pacing-wise, Refn trusts his audience, letting scenes breathe and letting silence do the work. When the violence does erupt in the third act, it's sudden, brutal, and deeply personal—there's no spectacle, just consequence.

Drive is not a perfect film. A few of its stylistic choices tip toward self-consciousness, and the narrative takes some shortcuts that a more traditional structure might have handled more smoothly. But these are minor niggles in an otherwise accomplished and genuinely moving piece of work. It's a rare movie that feels both meticulously crafted and emotionally raw, a neo-noir that cares about its characters' hearts as much as their fates. It earned a place in the conversation about modern cinema for good reason, and it rewards rewatching with new details surfacing in every frame.$review$,'2015-01-01 01:00:00.000 +0200',64690);

insert into group_members(user_id,group_id,is_admin) values
	('a0000001-0000-8000-b000-000000000006','a1b2c3d4-0001-8a00-b000-000000000001',true),
	('a0000001-0000-8000-b000-000000000024','a1b2c3d4-0002-8a00-b000-000000000002',true),
	('a0000001-0000-8000-b000-000000000017','a1b2c3d4-0003-8a00-b000-000000000003',true),
	('a0000001-0000-8000-b000-000000000007','a1b2c3d4-0004-8a00-b000-000000000004',true),
	('a0000001-0000-8000-b000-000000000002','a1b2c3d4-0005-8a00-b000-000000000005',true),
	('a0000001-0000-8000-b000-000000000017','a1b2c3d4-0006-8a00-b000-000000000006',true),
	('a0000001-0000-8000-b000-000000000025','a1b2c3d4-0007-8a00-b000-000000000007',true),
	('a0000001-0000-8000-b000-000000000023','a1b2c3d4-0008-8a00-b000-000000000008',true),
	('a0000001-0000-8000-b000-000000000017','a1b2c3d4-0009-8a00-b000-000000000009',true),
	('a0000001-0000-8000-b000-000000000017','a1b2c3d4-0010-8a00-b000-000000000010',true),
	('a0000001-0000-8000-b000-000000000017','a1b2c3d4-0011-8a00-b000-000000000011',true),
	('a0000001-0000-8000-b000-000000000008','a1b2c3d4-0012-8a00-b000-000000000012',true),
	('a0000001-0000-8000-b000-000000000015','a1b2c3d4-0013-8a00-b000-000000000013',true),
	('a0000001-0000-8000-b000-000000000020','a1b2c3d4-0014-8a00-b000-000000000014',true),
	('a0000001-0000-8000-b000-000000000002','a1b2c3d4-0015-8a00-b000-000000000015',true),
	('a0000001-0000-8000-b000-000000000011','a1b2c3d4-0016-8a00-b000-000000000016',true),
	('a0000001-0000-8000-b000-000000000024','a1b2c3d4-0017-8a00-b000-000000000017',true),
	('a0000001-0000-8000-b000-000000000002','a1b2c3d4-0018-8a00-b000-000000000018',true),
	('a0000001-0000-8000-b000-000000000007','a1b2c3d4-0019-8a00-b000-000000000019',true),
	('a0000001-0000-8000-b000-000000000022','a1b2c3d4-0020-8a00-b000-000000000020',true),
	('a0000001-0000-8000-b000-000000000002','a1b2c3d4-0021-8a00-b000-000000000021',true),
	('a0000001-0000-8000-b000-000000000024','a1b2c3d4-0022-8a00-b000-000000000022',true),
	('a0000001-0000-8000-b000-000000000011','a1b2c3d4-0023-8a00-b000-000000000023',true),
	('a0000001-0000-8000-b000-000000000024','a1b2c3d4-0024-8a00-b000-000000000024',true),
	('a0000001-0000-8000-b000-000000000025','a1b2c3d4-0025-8a00-b000-000000000025',true),
	('a0000001-0000-8000-b000-000000000001','a1b2c3d4-0006-8a00-b000-000000000006',false),
	('a0000001-0000-8000-b000-000000000001','a1b2c3d4-0004-8a00-b000-000000000004',true),
	('a0000001-0000-8000-b000-000000000019','a1b2c3d4-0003-8a00-b000-000000000003',false),
	('a0000001-0000-8000-b000-000000000024','a1b2c3d4-0020-8a00-b000-000000000020',false),
	('a0000001-0000-8000-b000-000000000007','a1b2c3d4-0016-8a00-b000-000000000016',false),
	('a0000001-0000-8000-b000-000000000009','a1b2c3d4-0023-8a00-b000-000000000023',true),
	('a0000001-0000-8000-b000-000000000002','a1b2c3d4-0010-8a00-b000-000000000010',false),
	('a0000001-0000-8000-b000-000000000003','a1b2c3d4-0019-8a00-b000-000000000019',true),
	('a0000001-0000-8000-b000-000000000014','a1b2c3d4-0021-8a00-b000-000000000021',false),
	('a0000001-0000-8000-b000-000000000005','a1b2c3d4-0004-8a00-b000-000000000004',false),
	('a0000001-0000-8000-b000-000000000025','a1b2c3d4-0014-8a00-b000-000000000014',false),
	('a0000001-0000-8000-b000-000000000022','a1b2c3d4-0010-8a00-b000-000000000010',true),
	('a0000001-0000-8000-b000-000000000020','a1b2c3d4-0008-8a00-b000-000000000008',false),
	('a0000001-0000-8000-b000-000000000006','a1b2c3d4-0001-8a00-b000-000000000001',false),
	('a0000001-0000-8000-b000-000000000007','a1b2c3d4-0014-8a00-b000-000000000014',true),
	('a0000001-0000-8000-b000-000000000002','a1b2c3d4-0004-8a00-b000-000000000004',false),
	('a0000001-0000-8000-b000-000000000016','a1b2c3d4-0002-8a00-b000-000000000002',false),
	('a0000001-0000-8000-b000-000000000016','a1b2c3d4-0024-8a00-b000-000000000024',false),
	('a0000001-0000-8000-b000-000000000010','a1b2c3d4-0013-8a00-b000-000000000013',false),
	('a0000001-0000-8000-b000-000000000006','a1b2c3d4-0023-8a00-b000-000000000023',false),
	('a0000001-0000-8000-b000-000000000014','a1b2c3d4-0023-8a00-b000-000000000023',false),
	('a0000001-0000-8000-b000-000000000009','a1b2c3d4-0001-8a00-b000-000000000001',false),
	('a0000001-0000-8000-b000-000000000018','a1b2c3d4-0020-8a00-b000-000000000020',false),
	('a0000001-0000-8000-b000-000000000007','a1b2c3d4-0023-8a00-b000-000000000023',false),
	('a0000001-0000-8000-b000-000000000023','a1b2c3d4-0013-8a00-b000-000000000013',false),
	('00000000-0000-8000-b000-100000000000','a1b2c3d4-0006-8a00-b000-000000000006',false);

-- AI generated test data ends here