DROP TRIGGER IF EXISTS driver_status_after_assign;
DELIMITER $$
CREATE TRIGGER driver_status_after_assign
	AFTER INSERT ON order_delivery
    FOR EACH ROW
BEGIN
	UPDATE driver d
    RIGHT JOIN Delivery_Schedule ds ON ds.Driver_ID = d.Driver_ID
    SET Availability = 'On_Trip'
    WHERE NEW.delivery_ID = ds.delivery_ID;
	
    UPDATE truck t
    RIGHT JOIN Delivery_Schedule ds ON ds.truck_ID = t.truck_ID
    SET Availability = 0
    WHERE NEW.delivery_ID = ds.delivery_ID;
    
    UPDATE driver_assistant da
    RIGHT JOIN Delivery_Schedule ds ON ds.Assistant_ID = da.Assistant_ID
    SET Availability = 'On_Trip'
    WHERE NEW.delivery_ID = ds.delivery_ID;
END $$
DELIMITER ;




DROP TRIGGER IF EXISTS capacity_decrease_after_order;
DELIMITER $$
CREATE TRIGGER capacity_decrease_after_order
	AFTER INSERT ON order_delivery
    FOR EACH ROW
BEGIN
	DECLARE capacity INT;
    DECLARE TrainID INT;
    
    SELECT Total_capacity
    INTO capacity
    FROM orders
    WHERE orders.Order_ID = NEW.Order_id;

    -- Newly added -----------------------------------------------------------------------------------------

    SELECT ds.Train_ID
    INTO TrainID
    FROM order_delivery 
    JOIN delivery_schedule ds ON ds.Delivery_id = order_delivery.Delivery_ID

    WHERE order_delivery.Order_ID = NEW.Order_id AND ds.Train_ID != NULL;
    -- -----------------------------------------------------------------------------------------------------

    UPDATE train
    SET Available_space = Available_space-capacity
    WHERE train.Train_ID = TrainID;
END$$
DELIMITER ;




DROP TRIGGER IF EXISTS reduce_stock_after_order;
DELIMITER $$
CREATE TRIGGER reduce_stock_after_order
	AFTER INSERT ON order_item
    FOR EACH ROW
BEGIN
	UPDATE product
    SET Stock_Quantity=Stock_Quantity-NEW.Quantity
    WHERE NEW.Product_ID = product.Product_ID;
END$$
DELIMITER ;




DROP TRIGGER IF EXISTS increase_stock_after_delete;
DELIMITER $$
CREATE TRIGGER increase_stock_after_delete
	AFTER DELETE ON order_item
    FOR EACH ROW
BEGIN
	UPDATE product
    SET Stock_Quantity=Stock_Quantity+OLD.Quantity
    WHERE OLD.Product_ID = product.Product_ID;
END$$
DELIMITER ;



DELIMITER $$
DROP TRIGGER IF EXISTS update_order_totals $$
CREATE TRIGGER update_order_totals
AFTER INSERT ON Order_item
FOR EACH ROW
BEGIN
    DECLARE total_capacity INT;
    DECLARE total_price DECIMAL(10, 2);

    -- Calculate the total capacity and total price for the corresponding order
    SELECT SUM(order_item_capacity), SUM(order_item_price)
    INTO total_capacity, total_price
    FROM Order_item
    WHERE Order_item.Order_ID = NEW.Order_ID;

    -- Update the Orders table with the new totals (without changing dates)
    UPDATE Orders
    SET Total_Capacity = total_capacity,
        Total_Price = total_price
    WHERE Order_ID = NEW.Order_ID;
END $$

DELIMITER ;


DELIMITER $$
DROP TRIGGER IF EXISTS update_order_totals_after_delete $$
CREATE TRIGGER update_order_totals_after_delete
AFTER DELETE ON Order_item
FOR EACH ROW
BEGIN
    DECLARE total_capacity INT;
    DECLARE total_price DECIMAL(10, 2);

    -- Recalculate the total capacity and total price after a row is deleted
    SELECT IFNULL(SUM(order_item_capacity), 0), IFNULL(SUM(order_item_price), 0)
    INTO total_capacity, total_price
    FROM Order_item
    WHERE Order_ID = OLD.Order_ID;

    -- Update the Orders table with the recalculated totals
    UPDATE Orders
    SET Total_Capacity = total_capacity,
        Total_Price = total_price
    WHERE Order_ID = OLD.Order_ID;
END $$

DELIMITER ;


DELIMITER $$
CREATE  TRIGGER calculate_order_item_totals
BEFORE INSERT ON order_item
FOR EACH ROW
BEGIN
    -- Declare variables to store product capacity and price
    DECLARE product_capacity INT;
    DECLARE product_price DECIMAL(10, 2);
    
    -- Retrieve the capacity and price from the product table
    SELECT capacity, price INTO product_capacity, product_price
    FROM product WHERE Product_ID = NEW.product_id;
    
    -- Set the calculated total capacity and price for the new order item
    SET NEW.order_item_capacity = NEW.quantity * product_capacity;
    SET NEW.order_item_price = NEW.quantity * product_price;
END$$

DELIMITER ;


-- SHOW TRIGGERS;