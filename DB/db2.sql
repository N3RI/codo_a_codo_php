create  database evento_php;

use evento_php;

create table invitados (
id int not null auto_increment primary key,
apellido varchar(50),
nombre varchar(55),
duracion varchar(50),
email varchar(50)
);


INSERT INTO invitados (apellido, nombre, email) VALUES
('Gates', 'Bill', 'bill.gates@cacphp.com'),
('Wozniak', 'Steve', 'steve.wozniak@cacphp.com'),
('Torvalds', 'Linus', 'linus.torvalds@cacphp.com'),
('Jobs', 'Steve', 'steve.jobs@cacphp.com'),
('Lovelace', 'Ada', 'ada.lovelace@cacphp.com'),
('Berners-Lee', 'Tim', 'tim.berners-lee@cacphp.com'),
('Dorsey', 'Jack', 'jack.dorsey@cacphp.com'),
('Knuth', 'Donald', 'donald.knuth@cacphp.com'),
('Hopper', 'Grace', 'grace.hopper@cacphp.com'),
('Gosling', 'James', 'james.gosling@cacphp.com');