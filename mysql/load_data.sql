INSERT INTO Users  (Username, Password) VALUES ('AAA', 'BB'),('AA', 'BB'),('A', 'BB');

INSERT INTO Papers  (Title,Address, GitHub,Abstract,Stars,Authors,Pulish_time) VALUES 
('fasdfds', 'fdsaf', 'fasdfds', 'fdsaf', 3, 'fdsaf', STR_TO_DATE('2014-07-09', '%Y-%m-%d')),
('fasdfds', 'fdsaf', 'fasdfds', 'fdsaf', 3, 'fdsaf', STR_TO_DATE('2014-07-10', '%Y-%m-%d'));


INSERT INTO Subjects  (Name) VALUES 
('sbsb'),
('sbsbbss');

INSERT INTO Comments(Commenter_ID,Paper_ID,Content,Comment_time, Father_comment_ID) VALUES 
(1,2,'大傻逼',STR_TO_DATE('2014-07-09 23:30:00', '%Y-%m-%d %H:%i:%s'), '1'),
(1,2,'大傻逼',STR_TO_DATE('2014-07-09 23:30:00', '%Y-%m-%d %H:%i:%s'), '1');

INSERT INTO Comments(Commenter_ID,Paper_ID,Content,Comment_time) VALUES 
(1,2,'dasd',STR_TO_DATE('2014-07-09 23:30:00', '%Y-%m-%d %H:%i:%s')),
(1,2,'fasdf',STR_TO_DATE('2015-07-09 23:30:00', '%Y-%m-%d %H:%i:%s'));


INSERT INTO Archives(USER_ID,Paper_ID,Archive_time) VALUES 
(1,2,STR_TO_DATE('2014-07-09 23:30:00', '%Y-%m-%d %H:%i:%s')),
(2,1,STR_TO_DATE('2015-07-09 23:30:00', '%Y-%m-%d %H:%i:%s'));


INSERT INTO Like_Paper(USER_ID,Paper_ID,Like_time) VALUES 
(1,2,STR_TO_DATE('2014-07-09 23:30:00', '%Y-%m-%d %H:%i:%s')),
(2,1,STR_TO_DATE('2015-07-09 23:30:00', '%Y-%m-%d %H:%i:%s'));


INSERT INTO Like_Comment(USER_ID,Comment_ID,Like_time) VALUES 
(1,2,STR_TO_DATE('2014-07-09 23:30:00', '%Y-%m-%d %H:%i:%s')),
(2,2,STR_TO_DATE('2015-07-09 23:30:00', '%Y-%m-%d %H:%i:%s'));


INSERT INTO Follow(USER_ID,Subject_ID) VALUES 
(1,2),
(2,2);


INSERT INTO In_Subject(Paper_ID,Subject_ID) VALUES 
(1,2),
(2,2);
