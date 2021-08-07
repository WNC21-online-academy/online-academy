-- Create course view
DROP VIEW IF EXISTS Course_View CASCADE;
CREATE VIEW Course_View AS
SELECT cat.name AS name_category, r.rating, c.* 
FROM course AS c
JOIN category AS cat ON cat.id = c.id_category
LEFT JOIN (
	SELECT id_course, avg(score) AS rating FROM rating
	WHERE score != 0
	GROUP BY id_course
) AS r ON c.id = r.id_course

