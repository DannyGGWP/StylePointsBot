CREATE TABLE `stylepointsbot`.`points_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `points` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

