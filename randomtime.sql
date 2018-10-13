/* psql -h localhost -p 5433 -d randomTime -U randomTime --password */
DROP TABLE IF EXISTS weekplan;
CREATE TABLE weekplan (id INT PRIMARY KEY, author VARCHAR(50), plan TEXT, config TEXT, password VARCHAR(50));
INSERT INTO weekplan (id, author) VALUES (1, 'John Doe');