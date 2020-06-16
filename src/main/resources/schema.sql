SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Kibsur
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Kibsur
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Kibsur` DEFAULT CHARACTER SET utf8 ;
USE `Kibsur` ;

-- -----------------------------------------------------
-- Table `Kibsur`.`Stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`Stores` (
  `store_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(30) NULL,
  `city` VARCHAR(20) NULL,
  `state_or_provence` VARCHAR(10) NULL,
  `postal_code` VARCHAR(5) NULL,
  PRIMARY KEY (`store_id`),
  UNIQUE INDEX `store_id_UNIQUE` (`store_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Kibsur`.`Employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`Employees` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `home_store` SMALLINT UNSIGNED NULL,
  `department_id` INT UNSIGNED NULL,
  `first_name` VARCHAR(20) NULL,
  `last_name` VARCHAR(30) NULL,
  `employee_phone` VARCHAR(9) NULL,
  `Employeescol` VARCHAR(45) NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `employee_id_UNIQUE` (`employee_id` ASC) VISIBLE,
  INDEX `FK_employees_stores_idx` (`home_store` ASC) VISIBLE,
  CONSTRAINT `FK_employees_stores`
    FOREIGN KEY (`home_store`)
    REFERENCES `Kibsur`.`Stores` (`store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Kibsur`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`Categories` (
  `category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Kibsur`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`Products` (
  `product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `product_description` VARCHAR(255) NULL,
  `category_id` INT UNSIGNED NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC) VISIBLE,
  INDEX `FK_products_categories_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `FK_products_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `Kibsur`.`Categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Kibsur`.`Shipments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`Shipments` (
  `shipment_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `cost` DECIMAL(8,2) NOT NULL,
  `number_of_units` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`shipment_id`),
  UNIQUE INDEX `shipment_id_UNIQUE` (`shipment_id` ASC) VISIBLE,
  INDEX `FK_shipments_products_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FK_shipments_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `Kibsur`.`Products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Kibsur`.`Sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`Sales` (
  `sale_event_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date_time` DATETIME NULL,
  `employee_id` INT NULL,
  `store_id` SMALLINT UNSIGNED NULL,
  `shipment_id` INT NULL,
  `amount_sold` INT NULL,
  `price_paid_per_unit` VARCHAR(45) NULL,
  PRIMARY KEY (`sale_event_id`),
  UNIQUE INDEX `sale_event_id_UNIQUE` (`sale_event_id` ASC) VISIBLE,
  INDEX `FK_sales_employees_idx` (`employee_id` ASC) VISIBLE,
  INDEX `FK_sales_stores_idx` (`store_id` ASC) VISIBLE,
  INDEX `FK_sales_products_idx` (`shipment_id` ASC) VISIBLE,
  CONSTRAINT `FK_sales_employees`
    FOREIGN KEY (`employee_id`)
    REFERENCES `Kibsur`.`Employees` (`employee_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_sales_shipments`
    FOREIGN KEY (`shipment_id`)
    REFERENCES `Kibsur`.`Shipments` (`shipment_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_sales_stores`
    FOREIGN KEY (`store_id`)
    REFERENCES `Kibsur`.`Stores` (`store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Kibsur`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`Inventory` (
  `store_id` SMALLINT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `amount_in_stock` INT UNSIGNED NULL,
  `retail_price` DECIMAL(8,2) NULL,
  PRIMARY KEY (`store_id`, `product_id`),
  INDEX `FK_inventory_products_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FK_inventory_stores`
    FOREIGN KEY (`store_id`)
    REFERENCES `Kibsur`.`Stores` (`store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_inventory_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `Kibsur`.`Products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Kibsur`.`ProductImages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Kibsur`.`ProductImages` (
  `product_id` INT UNSIGNED NOT NULL,
  `image_data` MEDIUMBLOB NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `product_id_UNIQUE` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FK_images_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `Kibsur`.`Products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;