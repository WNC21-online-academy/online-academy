DROP TABLE IF EXISTS State CASCADE;
CREATE TABLE State (
  id_fb_user VARCHAR(50) PRIMARY KEY,
  is_searching BOOLEAN
);

DROP TABLE IF EXISTS Category CASCADE;
CREATE TABLE Category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS Course CASCADE;
CREATE TABLE Course (
  id SERIAL PRIMARY KEY,
  id_category INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(100),
  image_messenger VARCHAR(500),
  url VARCHAR(500),
  CONSTRAINT fk_course_category FOREIGN KEY (id_category) REFERENCES category (id)
);