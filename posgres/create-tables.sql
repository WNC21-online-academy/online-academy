-- On update table trigger
CREATE OR REPLACE FUNCTION update_col_trig() RETURNS TRIGGER
   LANGUAGE plpgsql AS
$$BEGIN
   NEW.updated_at := CURRENT_TIMESTAMP;
   RETURN NEW;
END;$$;

-- Create tables
-- Facebook messenger state table
DROP TABLE IF EXISTS FbStates CASCADE;
CREATE TABLE FbStates (
  id_fb_user VARCHAR(50) PRIMARY KEY,
  is_searching BOOLEAN
);

-- User roles table
DROP TABLE IF EXISTS Roles CASCADE;
CREATE TABLE Roles (
  role VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Users table
DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  role VARCHAR(100),
  fullname VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password VARCHAR(500),
  avatar VARCHAR(500),
  refresh_token VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_roles FOREIGN KEY (role) REFERENCES Roles (role)
);
CREATE TRIGGER set_updated_at_users
BEFORE INSERT OR UPDATE ON Users
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Categories table
DROP TABLE IF EXISTS Categories CASCADE;
CREATE TABLE Categories (
  id SERIAL PRIMARY KEY,
  id_parent INT,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_categories_parents FOREIGN KEY (id_parent) REFERENCES Categories (id)
);
CREATE TRIGGER set_updated_at_categories
BEFORE INSERT OR UPDATE ON Categories
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Courses table
DROP TABLE IF EXISTS Courses CASCADE;
CREATE TABLE Courses (
  id SERIAL PRIMARY KEY,
  id_category INT,
  id_created_by INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(200),
  content VARCHAR(1000),
  thumbnail VARCHAR(200),
  tutition INT,
  is_completed BOOLEAN,
  view_count INT,
  -- image_messenger VARCHAR(200),
  url VARCHAR(500),
  is_draft BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_courses_categories FOREIGN KEY (id_category) REFERENCES Categories (id),
  CONSTRAINT fk_courses_createdby FOREIGN KEY (id_created_by) REFERENCES Users (id)
);
CREATE TRIGGER set_updated_at_courses
BEFORE INSERT OR UPDATE ON Courses
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Rating table
DROP TABLE IF EXISTS Rating CASCADE;
CREATE TABLE Rating (
  id SERIAL PRIMARY KEY,
  id_course INT NOT NULL,
  id_student INT NOT NULL,
  score FLOAT NOT NULL DEFAULT 0,
  comment VARCHAR(1000),
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rating_courses FOREIGN KEY (id_course) REFERENCES Courses (id),
  CONSTRAINT fk_rating_users FOREIGN KEY (id_student) REFERENCES Users (id)
);
CREATE TRIGGER set_updated_at_rating
BEFORE INSERT OR UPDATE ON Rating
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Promotions table
DROP TABLE IF EXISTS Promotions CASCADE;
CREATE TABLE Promotions (
  id SERIAL PRIMARY KEY,
  id_course INT NOT NULL,
  price FLOAT NOT NULL,
  description VARCHAR(200),
  time_begin TIMESTAMPTZ,
  time_end TIMESTAMPTZ,
  CONSTRAINT fk_promotions_courses FOREIGN KEY (id_course) REFERENCES Courses (id)
);

-- Lessons table
DROP TABLE IF EXISTS Lessons CASCADE;
CREATE TABLE Lessons (
  id SERIAL PRIMARY KEY,
  id_course INT NOT NULL,
  sort_order INT UNIQUE NOT NULL,
  title VARCHAR(100),
  description VARCHAR(500),
  video VARCHAR(500),
  is_draft BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_lessons_courses FOREIGN KEY (id_course) REFERENCES Courses (id)
);
CREATE TRIGGER set_updated_at_lessons
BEFORE INSERT OR UPDATE ON Lessons
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- -- Attachment types table
-- DROP TABLE IF EXISTS AttachmentTypes CASCADE;
-- CREATE TABLE AttachmentTypes (
--   id SERIAL PRIMARY KEY,
--   type VARCHAR(100) UNIQUE NOT NULL,
--   name VARCHAR(100) NOT NULL
-- );

-- -- Attachments table
-- DROP TABLE IF EXISTS Attachments CASCADE;
-- CREATE TABLE Attachments (
--   id SERIAL PRIMARY KEY,
--   id_lesson INT,
--   id_course INT,
--   url VARCHAR(200),
--   description VARCHAR(500),
--   created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
--   CONSTRAINT fk_attachments_lessons FOREIGN KEY (id_lesson) REFERENCES Lessons (id),
--   CONSTRAINT fk_attachments_courses FOREIGN KEY (id_course) REFERENCES Courses (id)
-- );
-- CREATE TRIGGER set_updated_at_attachments
-- BEFORE INSERT OR UPDATE ON Attachments
-- FOR EACH ROW
-- EXECUTE FUNCTION update_col_trig();

-- Course detail table
DROP TABLE IF EXISTS Course_Details CASCADE;
CREATE TABLE Course_Details (
  id_user INT NOT NULL,
  id_course INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_user, id_course),
  CONSTRAINT fk_coursedetails_users FOREIGN KEY (id_user) REFERENCES Users (id),
  CONSTRAINT fk_coursedetails_courses FOREIGN KEY (id_course) REFERENCES Courses (id),
  UNIQUE (id_user, id_course)
);
CREATE TRIGGER set_updated_at_coursedetails
BEFORE INSERT OR UPDATE ON Course_Details
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Watchlist table
DROP TABLE IF EXISTS WatchLists CASCADE;
CREATE TABLE WatchLists (
  id_user INT NOT NULL,
  id_course INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_user, id_course),
  CONSTRAINT fk_watchlists_users FOREIGN KEY (id_user) REFERENCES Users (id),
  CONSTRAINT fk_watchlists_courses FOREIGN KEY (id_course) REFERENCES Courses (id),
  UNIQUE (id_user, id_course)
);
CREATE TRIGGER set_updated_at_watchlists
BEFORE INSERT OR UPDATE ON WatchLists
FOR EACH ROW
EXECUTE FUNCTION update_col_trig();

-- Refresh tokens table
DROP TABLE IF EXISTS RefreshTokens CASCADE;
CREATE TABLE RefreshTokens (
  id_user INT PRIMARY KEY,
  refresh_token VARCHAR(200),
  CONSTRAINT fk_rftokens_users FOREIGN KEY (id_user) REFERENCES Users (id)
);


-- Full text search
CREATE EXTENSION IF NOT EXISTS unaccent;
-- Courses
ALTER TABLE Courses ADD COLUMN name_tsv tsvector;

CREATE OR REPLACE FUNCTION courses_name_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS 
$$BEGIN NEW.name_tsv =
	setweight(to_tsvector(coalesce(unaccent(NEW.name))), 'A'); -- ||
	-- setweight(to_tsvector(coalesce(unaccent(NEW.description))), 'B') ||
	-- setweight(to_tsvector(coalesce(unaccent(NEW.content))), 'D');
RETURN NEW;
END;$$;	

CREATE TRIGGER courses_name_tsv_trigger BEFORE INSERT OR UPDATE
OF name, description, content ON Courses FOR EACH ROW
EXECUTE PROCEDURE courses_name_tsv_trigger_func();

CREATE INDEX courses_name_tsv_idx ON Courses USING GIN(name_tsv);

-- Categories
ALTER TABLE Categories ADD COLUMN name_tsv tsvector;

CREATE OR REPLACE FUNCTION categories_name_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS 
$$BEGIN NEW.name_tsv =
	setweight(to_tsvector(coalesce(unaccent(NEW.name))), 'A');
RETURN NEW;
END;$$;	

CREATE TRIGGER categories_name_tsv_trigger BEFORE INSERT OR UPDATE
OF name ON Categories FOR EACH ROW
EXECUTE PROCEDURE categories_name_tsv_trigger_func();

CREATE INDEX categories_name_tsv_idx ON Categories USING GIN(name_tsv);