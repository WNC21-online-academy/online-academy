-- Create users view
DROP VIEW IF EXISTS Users_View CASCADE;
CREATE VIEW Users_View AS
SELECT r.name AS name_role, a.id, a.role, a.fullname, a.email, a.created_at, a.updated_at
FROM Users AS a
JOIN Roles AS r ON a.role = r.role;

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
SELECT cat.name AS name_category, r.rating, creator.name as name_creator c.* 
FROM Courses AS c
JOIN Categories AS cat ON cat.id = c.id_category
LEFT JOIN (
	SELECT id_course, avg(score) AS rating FROM Rating
	WHERE score != 0
	GROUP BY id_course
) AS r ON c.id = r.id_course
LEFT JOIN users AS creator ON creator.id = c.id_created_by;
