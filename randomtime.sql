DROP TABLE IF EXISTS weekplans;

BEGIN;

CREATE TABLE weekplan (id INT PRIMARY KEY, author CHAR(50), plan TEXT);