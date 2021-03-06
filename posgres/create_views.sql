-- Create users view
DROP VIEW IF EXISTS Users_View CASCADE;
CREATE VIEW Users_View AS
SELECT r.name AS name_role, u.id, u.role, u.fullname, u.email, u.avatar, u.lock, u.created_at, u.updated_at
FROM Users AS u
JOIN Roles AS r ON u.role = r.role;

-- Create categories view
DROP VIEW IF EXISTS Categories_View CASCADE;
CREATE VIEW Categories_View AS
SELECT parent.name AS name_parent, counter.counter_courses, child.* 
FROM categories AS child
LEFT JOIN categories AS parent ON child.id_parent = parent.id
LEFT JOIN (
	SELECT id_category, COUNT(id_category) as counter_courses
	FROM courses
	GROUP BY id_category
) AS counter ON counter.id_category = child.id;

-- Create courses view
DROP VIEW IF EXISTS Courses_View CASCADE;
CREATE VIEW Courses_View AS
SELECT cat.name AS name_category, ro.rating, creator.fullname as name_creator, counter.counter_students, cou.* 
FROM Courses AS cou
LEFT JOIN Categories AS cat ON cat.id = cou.id_category
LEFT JOIN (
	SELECT id_course, avg(score) AS rating FROM Rating
	WHERE score != 0
	GROUP BY id_course
) AS ro ON cou.id = ro.id_course
LEFT JOIN users AS creator ON creator.id = cou.id_created_by
LEFT JOIN (
	SELECT id_course, COUNT(id_course) as counter_students
	FROM course_details
	GROUP BY id_course
) AS counter ON counter.id_course = cou.id;

-- Create lessons view
DROP VIEW IF EXISTS Lessons_View CASCADE;
CREATE VIEW Lessons_View AS
SELECT les.*, cou.name as name_course
FROM Lessons AS les
LEFT JOIN Courses AS cou ON cou.id = les.id_course;

-- Create rating view
DROP VIEW IF EXISTS Rating_View CASCADE;
CREATE VIEW Rating_View AS
SELECT rat.*, usr.fullname as name_student, usr.avatar as avatar_student
FROM Rating AS rat
LEFT JOIN Users AS usr ON usr.id = rat.id_student;