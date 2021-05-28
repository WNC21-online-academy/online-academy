-- On update table trigger
CREATE OR REPLACE FUNCTION update_col_trig() RETURNS TRIGGER
   LANGUAGE plpgsql AS
$$BEGIN
   NEW.updated_at := CURRENT_TIMESTAMP;
   RETURN NEW;
END;$$;

-- Create tables
-- Facebook messenger state table
DROP TABLE IF EXISTS FbState CASCADE;
CREATE TABLE FbState (
  id_fb_user VARCHAR(50) PRIMARY KEY,
  is_searching BOOLEAN
);

-- User type table
DROP TABLE IF EXISTS AccountType CASCADE;
CREATE TABLE AccountType (
  id SERIAL PRIMARY KEY,
  type VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- User table
DROP TABLE IF EXISTS Account CASCADE;
CREATE TABLE Account (
  id SERIAL PRIMARY KEY,
  id_type INT NOT NULL,
  fullname VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_account_type FOREIGN KEY (id_type) REFERENCES AccountType (id)
);
CREATE TRIGGER set_updated_at_account
BEFORE INSERT OR UPDATE ON Account
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Course category table
DROP TABLE IF EXISTS Category CASCADE;
CREATE TABLE Category (
  id SERIAL PRIMARY KEY,
  id_parent INT,
  name VARCHAR(100) NOT NULL,
  CONSTRAINT fk_category_parent FOREIGN KEY (id_parent) REFERENCES Category (id)
);

-- Course table
DROP TABLE IF EXISTS Course CASCADE;
CREATE TABLE Course (
  id SERIAL PRIMARY KEY,
  id_category INT NOT NULL,
  id_created_by INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(200),
  content VARCHAR(1000),
  thumbnail VARCHAR(200),
  tutition INT,
  is_completed BOOLEAN,
  image_messenger VARCHAR(200),
  url VARCHAR(500),
  is_draft BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_course_category FOREIGN KEY (id_category) REFERENCES Category (id),
  CONSTRAINT fk_course_createdby FOREIGN KEY (id_created_by) REFERENCES Account (id)
);
CREATE TRIGGER set_updated_at_course
BEFORE INSERT OR UPDATE ON Course
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Rating table
DROP TABLE IF EXISTS Rating CASCADE;
CREATE TABLE Rating (
  id SERIAL PRIMARY KEY,
  id_course INT NOT NULL,
  id_student INT NOT NULL,
  score FLOAT NOT NULL,
  comment VARCHAR(100),
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rating_course FOREIGN KEY (id_course) REFERENCES Course (id),
  CONSTRAINT fk_rating_student FOREIGN KEY (id_student) REFERENCES Account (id),
  UNIQUE (id_course, id_student)
);
CREATE TRIGGER set_updated_at_rating
BEFORE INSERT OR UPDATE ON Rating
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Promotion table
DROP TABLE IF EXISTS Promotion CASCADE;
CREATE TABLE Promotion (
  id SERIAL PRIMARY KEY,
  id_course INT NOT NULL,
  price FLOAT NOT NULL,
  description VARCHAR(200),
  time_begin TIMESTAMPTZ,
  time_end TIMESTAMPTZ,
  CONSTRAINT fk_promotion_course FOREIGN KEY (id_course) REFERENCES Course (id)
);

-- Lesson table
DROP TABLE IF EXISTS Lesson CASCADE;
CREATE TABLE Lesson (
  id SERIAL PRIMARY KEY,
  id_course INT NOT NULL,
  sort_order INT UNIQUE NOT NULL,
  title VARCHAR(100),
  description VARCHAR(500),
  is_preview BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lesson_course FOREIGN KEY (id_course) REFERENCES Course (id)
);
CREATE TRIGGER set_updated_at_lesson
BEFORE INSERT OR UPDATE ON Lesson
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Attachment type table
DROP TABLE IF EXISTS AttachmentType CASCADE;
CREATE TABLE AttachmentType (
  id SERIAL PRIMARY KEY,
  type VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL
);

-- Attachment table
DROP TABLE IF EXISTS Attachment CASCADE;
CREATE TABLE Attachment (
  id SERIAL PRIMARY KEY,
  id_lesson INT,
  id_course INT,
  url VARCHAR(200),
  description VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_attachment_lesson FOREIGN KEY (id_lesson) REFERENCES Lesson (id),
  CONSTRAINT fk_attachment_course FOREIGN KEY (id_course) REFERENCES Course (id)
);
CREATE TRIGGER set_updated_at_attachment
BEFORE INSERT OR UPDATE ON Attachment
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- User course detail table
DROP TABLE IF EXISTS UserCourseDetail CASCADE;
CREATE TABLE UserCourseDetail (
  id_user INT NOT NULL,
  id_course INT NOT NULL,
  is_watchlist BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_user, id_course),
  CONSTRAINT fk_ucdetail_user FOREIGN KEY (id_user) REFERENCES Account (id),
  CONSTRAINT fk_ucdetail_course FOREIGN KEY (id_course) REFERENCES Course (id)
);
CREATE TRIGGER set_updated_at_ucdetail
BEFORE INSERT OR UPDATE ON UserCourseDetail
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- User lession detail table
DROP TABLE IF EXISTS UserLessonDetail CASCADE;
CREATE TABLE UserLessonDetail (
  id_user INT NOT NULL,
  id_lesson INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_user, id_lesson),
  CONSTRAINT fk_uldetail_user FOREIGN KEY (id_user) REFERENCES Account (id),
  CONSTRAINT fk_uldetail_lesson FOREIGN KEY (id_lesson) REFERENCES Lesson (id)
);
CREATE TRIGGER set_updated_at_uldetail
BEFORE INSERT OR UPDATE ON UserLessonDetail
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Refresh token table
DROP TABLE IF EXISTS RefreshToken CASCADE;
CREATE TABLE RefreshToken (
  id_user INT PRIMARY KEY,
  refresh_token VARCHAR(200),
  CONSTRAINT fk_rftoken_user FOREIGN KEY (id_user) REFERENCES Account (id)
);