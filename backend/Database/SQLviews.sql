CREATE OR REPLACE VIEW `sales_by_city` AS
SELECT 
	store.City,
--     Order_ID,
--     Customer_ID,
--     Ordered_Date,
    SUM(Total_Price)
FROM orders
JOIN store ON store.Store_ID = orders.Store_ID
JOIN truck_route ON truck_route.Route_ID = orders.Route_ID
GROUP BY store.City;




CREATE OR REPLACE VIEW `sales_by_route` AS
SELECT 
    truck_route.Route,
--     Order_ID,
--     Customer_ID,
--     Ordered_Date,
    SUM(Total_Price)
FROM orders
JOIN store ON store.Store_ID = orders.Store_ID
JOIN truck_route ON truck_route.Route_ID = orders.Route_ID
GROUP BY truck_route.Route;




CREATE OR REPLACE VIEW `product_orders` AS
SELECT
	product.Product_ID,
    product.Product_Name,
    SUM(Quantity) AS 'Total_sales'
FROM order_item
JOIN product ON product.Product_ID=order_item.Product_ID
GROUP BY Product_ID, Product_Name;




CREATE OR REPLACE VIEW `Driver_work_hours` AS
SELECT 
    WEEK(shipment_date) AS 'Week_number',
    Driver_id,
    SUM(ROUND(((TIME_TO_SEC(Vehicle_arrival_time)-TIME_TO_SEC(Vehicle_departure_time))/3600),1)) AS "Hours_worked"
FROM delivery_schedule
JOIN order_delivery ON delivery_schedule.Delivery_id = order_delivery.Delivery_ID
JOIN orders ON order_delivery.Order_ID = orders.Order_ID
GROUP BY WEEK(shipment_date), Driver_id;




CREATE OR REPLACE VIEW `Assistant_work_hours` AS
SELECT 
    WEEK(shipment_date) AS 'Week_number',
    Assistant_id,
    SUM(ROUND(((TIME_TO_SEC(Vehicle_arrival_time)-TIME_TO_SEC(Vehicle_departure_time))/3600),1)) AS "Hours_worked"
FROM delivery_schedule
JOIN order_delivery ON delivery_schedule.Delivery_id = order_delivery.Delivery_ID
JOIN orders ON order_delivery.Order_ID = orders.Order_ID
GROUP BY WEEK(shipment_date), Assistant_id;




CREATE OR REPLACE VIEW `Truck_hours` AS
SELECT 
    WEEK(shipment_date) AS 'Week_number',
    Truck_id,
    SUM(ROUND(((TIME_TO_SEC(Vehicle_arrival_time)-TIME_TO_SEC(Vehicle_departure_time))/3600),1)) AS "Hours_worked"
FROM delivery_schedule
JOIN order_delivery ON delivery_schedule.Delivery_id = order_delivery.Delivery_ID
JOIN orders ON order_delivery.Order_ID = orders.Order_ID
GROUP BY WEEK(shipment_date), Truck_id;



CREATE OR REPLACE VIEW `Delivery_times` AS
SELECT 
	od.Delivery_ID,
    SUM(Time_taken) AS 'hours'
FROM Order_delivery od
JOIN orders o ON o.Order_ID = od.Order_ID
JOIN truck_route tr ON o.Route_ID = tr.Route_ID
GROUP BY Delivery_ID;




    


