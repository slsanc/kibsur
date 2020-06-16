-- -----------------------------------------------------
-- Data for table `Kibsur`.`Products`
-- -----------------------------------------------------
START TRANSACTION;
USE `Kibsur`;
INSERT IGNORE INTO `Kibsur`.`Products` (`product_id`, `product_name`, `product_description`) VALUES (1, 'Jelly Beans', 'Sweet, Chewy');
INSERT IGNORE INTO `Kibsur`.`Products` (`product_id`, `product_name`, `product_description`) VALUES (2, 'Keyboards', 'Use these to type');
INSERT IGNORE INTO `Kibsur`.`Products` (`product_id`, `product_name`, `product_description`) VALUES (3, 'Copper Wire', 'carries electricity');

COMMIT;