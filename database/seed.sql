-- after inserting the schema into the db, insert this file by navigating to the project folder in the CLI
-- and using the following command:
-- 'psql wedding_mgr < database/seed.sql'
-- Note: passwords for users are same as usernames

TRUNCATE admins restart identity cascade;
INSERT INTO admins(email, password, fname, lname) VALUES
('davidpaulbuckley@gmail.com', '$2b$10$MpJ6/6Zp/zGWhsJJfI3vbOOZB7gQuehjMdeelyRTK4yLoxsR6V306', 'Dave', 'Buckley'),
('tysondonnelly@gmail.com', '$2b$10$FbO8/bULrdH.OL1Hc8U3d.F4Mg88Qvahrmj0YUMe2PoIYRH4KQFPa', 'Tyson', 'Donnelly');

TRUNCATE invites restart identity cascade;
INSERT INTO invites(primary_email, invite_status, logged_in_timestamp, logged_in_guest, comments) VALUES
('guest1@ga.com', null, null, null, null),
('guest4@ga.com', null, null, null, null);


TRUNCATE guests restart identity cascade;
INSERT INTO guests(invite_id, fname, lname, email, rsvp, dietary_reqs, age_bracket) VALUES
(1, 'One', 'Guest', 'guest1@ga.com', 'Yes', 'Vegan', 'A'),
(1, 'Two', 'Guest', 'guest2@ga.com', 'Yes', 'N/A', 'A'),
(1, 'Three', 'Guest', NULL , 'Yes', 'N/A', 'C'),
(2, 'Four', 'Guest', 'guest4@ga.com', 'No', 'N/A', 'A');