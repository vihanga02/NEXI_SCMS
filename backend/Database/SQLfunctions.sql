-- most ordered product finding function
DROP function IF EXISTS `max_order_product`;
DELIMITER $$
CREATE FUNCTION `max_order_product` ()
RETURNS VARCHAR(100)
READS SQL DATA
BEGIN
	DECLARE prod VARCHAR(100);
    SELECT product.Product_Name
    INTO prod
	FROM product_orders
    JOIN product ON product.Product_ID = product_orders.Product_ID
	WHERE Total_sales = (SELECT MAX(Total_sales) FROM product_orders);
RETURN prod;
END$$
DELIMITER ;


-- order_item table capacity calculating function
DROP FUNCTION IF EXISTS `calculate_capacity`;
DELIMITER $$
CREATE FUNCTION `calculate_capacity` (id INT)
RETURNS INT
READS SQL DATA
BEGIN
	DECLARE tot_capacity INT;
    SELECT Quantity*product.Capacity
    INTO tot_capacity
    FROM order_item
    JOIN product ON order_item.Product_ID = product.Product_ID
    WHERE Set_ID = id;
RETURN tot_capacity;
END$$
DELIMITER ;



-- order_item table price calculating function
DROP FUNCTION IF EXISTS `calculate_price`;
DELIMITER $$
CREATE FUNCTION `calculate_price` (id INT)
RETURNS INT
READS SQL DATA
BEGIN
	DECLARE tot_price INT;
    SELECT Quantity*product.Price
    INTO tot_price
    FROM order_item
    JOIN product ON order_item.Product_ID = product.Product_ID
    WHERE Set_ID = id;
RETURN tot_price;
END$$
DELIMITER ;


-- work hours of driver
DROP FUNCTION IF EXISTS `driver_hours_worked`;
DELIMITER $$
CREATE FUNCTION `driver_hours_worked` (date1 DATE, id INT)
RETURNS DECIMAL(4,2)
READS SQL DATA
BEGIN
	DECLARE hours DECIMAL(4,2);
    SELECT Hours_worked
    INTO hours
    FROM driver_work_hours dwh
    WHERE dwh.Week_number = WEEK(date1) AND
    dwh.Driver_ID = id;
RETURN hours;
END$$
DELIMITER ;



-- work hours of assistant
DROP FUNCTION IF EXISTS `assistant_hours_worked`;
DELIMITER $$
CREATE FUNCTION `assistant_hours_worked` (date1 DATE, id INT)
RETURNS DECIMAL(4,2)
READS SQL DATA
BEGIN
	DECLARE hours DECIMAL(4,2);
    SELECT Hours_worked
    INTO hours
    FROM assistant_work_hours awh
    WHERE awh.Week_number = WEEK(date1) AND
    awh.Assistant_ID = id;
RETURN hours;
END$$
DELIMITER ;







