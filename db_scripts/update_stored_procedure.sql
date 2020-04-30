CREATE DEFINER=`root`@`localhost` PROCEDURE `give_points`(IN points_user varchar(45))
BEGIN
UPDATE `stylepointsbot`.`points_users`
SET
`points` = `points` + 1
WHERE `user` = points_user;
SELECT `points_users`.`points`
FROM `stylepointsbot`.`points_users` where `points_users`.`user` = points_user ;
END