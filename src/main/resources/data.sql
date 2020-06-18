
-- -----------------------------------------------------
-- Data for table `Kibsur`.`Stores`
-- -----------------------------------------------------
START TRANSACTION;
USE `Kibsur`;
INSERT IGNORE INTO `Kibsur`.`Stores` (`store_id`, `address`, `city`, `state_or_provence`, `postal_code`) VALUES (1, NULL, NULL, NULL, NULL);
INSERT IGNORE INTO `Kibsur`.`Stores` (`store_id`, `address`, `city`, `state_or_provence`, `postal_code`) VALUES (2, NULL, NULL, NULL, NULL);
INSERT IGNORE INTO `Kibsur`.`Stores` (`store_id`, `address`, `city`, `state_or_provence`, `postal_code`) VALUES (3, NULL, NULL, NULL, NULL);
INSERT IGNORE INTO `Kibsur`.`Stores` (`store_id`, `address`, `city`, `state_or_provence`, `postal_code`) VALUES (4, NULL, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Kibsur`.`Categories`
-- -----------------------------------------------------
START TRANSACTION;
USE `Kibsur`;
INSERT IGNORE INTO `Kibsur`.`Categories` (`category_id`, `category_name`, `parent_category`) VALUES (1, 'Items', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Kibsur`.`Products`
-- -----------------------------------------------------
START TRANSACTION;
USE `Kibsur`;
INSERT IGNORE INTO `Kibsur`.`Products` (`product_id`, `product_name`, `product_description`, `category_id`) VALUES (1, 'Jelly Beans', 'Sweet, Chewy', 1);
INSERT IGNORE INTO `Kibsur`.`Products` (`product_id`, `product_name`, `product_description`, `category_id`) VALUES (2, 'Keyboards', 'Use these to type', 1);
INSERT IGNORE INTO `Kibsur`.`Products` (`product_id`, `product_name`, `product_description`, `category_id`) VALUES (3, 'Copper Wire', 'carries electricity', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Kibsur`.`Inventory`
-- -----------------------------------------------------
START TRANSACTION;
USE `Kibsur`;
INSERT IGNORE INTO `Kibsur`.`Inventory` (`store_id`, `product_id`, `amount_in_stock`, `retail_price`) VALUES (1, 1, 4, 1);
INSERT IGNORE INTO `Kibsur`.`Inventory` (`store_id`, `product_id`, `amount_in_stock`, `retail_price`) VALUES (1, 2, 5, 1);
INSERT IGNORE INTO `Kibsur`.`Inventory` (`store_id`, `product_id`, `amount_in_stock`, `retail_price`) VALUES (1, 3, 7, 1);
INSERT IGNORE INTO `Kibsur`.`Inventory` (`store_id`, `product_id`, `amount_in_stock`, `retail_price`) VALUES (2, 1, 3, 1);
INSERT IGNORE INTO `Kibsur`.`Inventory` (`store_id`, `product_id`, `amount_in_stock`, `retail_price`) VALUES (2, 2, 9, 1);
INSERT IGNORE INTO `Kibsur`.`Inventory` (`store_id`, `product_id`, `amount_in_stock`, `retail_price`) VALUES (2, 3, 3, 1);

COMMIT;
