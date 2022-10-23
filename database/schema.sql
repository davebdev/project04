-- when first creating database:
-- start up psql in CLI by typing 'psql postgres'
-- create database by typing 'CREATE DATABASE wedding_mgr;'
-- quit database with '\q'

-- on each refresh of db, insert this file by navigating to the project folder in the CLI
-- and using the following command:
-- 'psql wedding_mgr < database/schema.sql'

DROP TABLE IF EXISTS admins;
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    fname TEXT,
    lname TEXT
);

DROP TABLE IF EXISTS invites CASCADE;
CREATE TABLE IF NOT EXISTS invites (
    id SERIAL PRIMARY KEY,
    primary_email TEXT UNIQUE,
    invite_status TEXT DEFAULT 'To be invited',
    logged_in_timestamp DATE,
    logged_in_guest TEXT,
    comments TEXT
);

DROP TABLE IF EXISTS guests CASCADE;
CREATE TABLE IF NOT EXISTS guests (
    id SERIAL PRIMARY KEY,
    invite_id INT REFERENCES invites(id) ON DELETE CASCADE,
    fname TEXT,
    lname TEXT,
    email TEXT UNIQUE,
    rsvp TEXT,
    dietary_reqs TEXT,
    age_bracket TEXT
);

DROP TABLE IF EXISTS emails CASCADE;
CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    invite_id INT REFERENCES invites(id) ON DELETE CASCADE,
    email_template TEXT,
    send_status TEXT,
    send_timestamp TEXT,
    content TEXT
);