DROP DATABASE IF EXISTS nexi_schema;
CREATE DATABASE nexi_schema;
USE nexi_schema;

-- ---------------------------------- --

CREATE TABLE Customer(
  Customer_ID INT AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  Username VARCHAR(50) UNIQUE NOT NULL,
  Password VARCHAR(100) NOT NULL,
  Email VARCHAR(50) UNIQUE NOT NULL,
  Phone_Number VARCHAR(12) NOT NULL,
  PRIMARY KEY (Customer_ID)
);

CREATE TABLE Product (
  Product_ID INT AUTO_INCREMENT,
  Product_Name VARCHAR(100) NOT NULL,
  Category VARCHAR(20) NOT NULL,
  Price DECIMAL(8,2) NOT NULL,
  Capacity INT NOT NULL,
  Stock_Quantity INT DEFAULT 1,
  Description VARCHAR(500),
  Image_Link VARCHAR(100),
  PRIMARY KEY (Product_ID)
);

CREATE TABLE Store (
  Store_ID TINYINT AUTO_INCREMENT,
  City VARCHAR(20),
  PRIMARY KEY (Store_ID)
);

CREATE TABLE Truck_Route (
  Route_ID INT AUTO_INCREMENT,
  Store_ID TINYINT NOT NULL,
  Route VARCHAR(100) NOT NULL,
  Time_Taken DECIMAL(3,1),
  PRIMARY KEY (Route_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Driver (
  Driver_ID TINYINT AUTO_INCREMENT,
  Store_ID TINYINT ,
  Work_Hours DECIMAL(4,1) DEFAULT 0,
  Availability ENUM('On_Trip','Rest','Not_Available'),
  PRIMARY KEY (Driver_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Driver_Assistant (
  Assistant_ID TINYINT AUTO_INCREMENT,
  Store_ID TINYINT NOT NULL,
  Work_Hours DECIMAL(4,1) DEFAULT 0,
  Availability ENUM('On_Trip','Rest','Not_Available'),
  PRIMARY KEY (Assistant_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Store_Manager (
  Manager_ID TINYINT AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  Username varchar(50) unique NOT NULL,
  Password VARCHAR(100) NOT NULL,
  Email VARCHAR(50) UNIQUE NOT NULL,
  Store_ID TINYINT NOT NULL,
  PRIMARY KEY (Manager_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Train (
  Train_ID TINYINT AUTO_INCREMENT,
  Train_Name VARCHAR(20) NOT NULL,
  Capacity INT NOT NULL,
  Available_space INT NOT NULL DEFAULT 0,
  PRIMARY KEY (Train_ID)
);

CREATE TABLE Train_Schedule (
  Trip_ID INT AUTO_INCREMENT,
  Day DATE,
  Start_Time TIME,
  Train_ID TINYINT NOT NULL,
  End_Station_ID INT NOT NULL,
  PRIMARY KEY (Trip_ID),
  FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID)
);

CREATE TABLE Truck (
  Truck_ID TINYINT AUTO_INCREMENT,
  Reg_Number VARCHAR(10) NOT NULL,
  Store_ID TINYINT NOT NULL,
  Used_Hours DECIMAL(4,1) DEFAULT 0,
  Availability BOOLEAN DEFAULT True,
  PRIMARY KEY (Truck_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Destination (
  Dest_id INT AUTO_INCREMENT,
  Trip_ID INT NOT NULL,
  Store_ID TINYINT NOT NULL,
  PRIMARY KEY (Dest_id),
  FOREIGN KEY (Trip_ID) REFERENCES Train_Schedule(Trip_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Orders (
  Order_ID INT AUTO_INCREMENT,
  Customer_ID INT NOT NULL,
  Store_ID TINYINT,
  Route_ID INT,
  Ordered_Date DATE,
  Expected_Date DATE,
  Total_Capacity INT DEFAULT 0,
  Total_Price DECIMAL(8,2) DEFAULT 0.00,
  Order_state ENUM('Pending', 'Paid', 'Completed') DEFAULT 'Pending',
  PRIMARY KEY (Order_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID),
  FOREIGN KEY (Route_ID) REFERENCES Truck_Route(Route_ID),
  FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID) ON DELETE CASCADE
);

CREATE TABLE Delivery_Schedule (
  Delivery_id INT AUTO_INCREMENT,
  Shipment_date DATE,
  Vehicle_departure_time TIME,
  Vehicle_arrival_time TIME,
  Delivery_status ENUM('Not_Yet', 'On_Train', 'In_Truck','Completed'),
  PRIMARY KEY (Delivery_id),
);

CREATE TABLE Order_Item (
  Set_id INT AUTO_INCREMENT,
  Product_ID INT NOT NULL,
  Order_ID INT NOT NULL,
  Quantity INT DEFAULT 1,
  Order_Item_Capacity INT DEFAULT 0,
  Order_item_Price DECIMAL(8,2) DEFAULT 0,
  PRIMARY KEY (Set_id),
  FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID),
  FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ORDER_DELIVERY (
	Order_Delivery_ID INT AUTO_INCREMENT,
	Delivery_ID INT NOT NULL,
    Order_ID INT NOT NULL,
    PRIMARY KEY (Order_Delivery_ID),
    FOREIGN KEY (Delivery_ID) REFERENCES Delivery_Schedule(Delivery_ID) ON DELETE CASCADE,
    FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID) ON DELETE CASCADE
);
    
CREATE TABLE Train_Delivery (
	ID INT AUTO_INCREMENT,
	Train_Del_ID INT,
	Train_ID TINYINT,
    PRIMARY KEY (ID),
	FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID),
	FOREIGN KEY (Train_Del_ID) REFERENCES Delivery_Schedule(Delivery_id)
);


CREATE TABLE Truck_Delivery (
	ID INT AUTO_INCREMENT,
	Truck_Del_ID INT,
	Truck_id TINYINT,
	Driver_id TINYINT,
	Assistant_id TINYINT,
    PRIMARY KEY (ID),
	FOREIGN KEY (Driver_id) REFERENCES Driver(Driver_ID),
	FOREIGN KEY (Truck_id) REFERENCES Truck(Truck_ID),
	FOREIGN KEY (Assistant_id) REFERENCES Driver_Assistant(Assistant_ID),
	FOREIGN KEY (Truck_Del_ID) REFERENCES Delivery_Schedule(Delivery_id)
);

-- ----------------- Dummy values --------------------------------- --

INSERT INTO Product (Product_Name, Category, Price, Capacity, Stock_Quantity, Description, Image_Link) VALUES
('iPhone 14', 'Apple', 240000, 28, 50, 'The iPhone 14 features Apple\'s powerful A15 Bionic chip, a stunning Super Retina XDR display, and an advanced dual-camera system. With improved battery life and 5G capability, it offers seamless performance for everyday tasks and photography enthusiasts.', '/assets/iphone-14.jpg'),
('iPhone 14 Pro', 'Apple', 300000, 56, 30, 'The iPhone 14 Pro comes equipped with a ProMotion display for smoother scrolling and a powerful triple-camera system. It also includes the A15 Bionic chip, ensuring ultra-fast performance, and offers ProRAW and ProRes video recording for professional-grade content creation.', '/assets/iphone-14-pro.jpg'),
('iPhone SE', 'Apple', 129000, 64, 75, 'The iPhone SE is a budget-friendly iPhone that packs the A13 Bionic chip into a compact frame. It features Touch ID for secure authentication, a 12MP camera, and the familiar design of older iPhones, making it perfect for users who prefer smaller devices.', '/assets/iphone-se.jpg'),
('iPhone 13', 'Apple', 210000, 28, 65, 'The iPhone 13 brings a powerful A15 chip, long battery life, and a dual-camera system with Night Mode. It\'s designed for performance and efficiency, offering exceptional video recording, photography, and day-to-day usage.', '/assets/iphone-13.jpeg'),
('iPhone 13 Pro', 'Apple', 270000, 56, 40, 'The iPhone 13 Pro features a ProMotion display for a smoother experience and an advanced triple-camera system that captures stunning photos and videos. It also offers improved battery life and the A15 Bionic chip for top-tier performance.', '/assets/iphone-13-pro.jpeg'),
('iPhone 12', 'Apple', 180000, 64, 80, 'The iPhone 12 delivers a powerful performance with the A14 chip and a dual-camera system for great photography. Its Ceramic Shield front cover provides extra durability, and it supports 5G for faster downloads and streaming.', '/assets/iphone-12.jpeg'),
('iPhone 12 Mini', 'Apple', 150000, 64, 70, 'The iPhone 12 Mini packs the same A14 chip as the iPhone 12 but in a more compact form factor. With its 5.4-inch OLED display and excellent camera, it\'s perfect for those who want a small phone without sacrificing performance.', '/assets/iphone-12-mini.jpg'),
('iPhone 11', 'Apple', 150000, 64, 90, 'The iPhone 11 offers a dual-camera system with Ultra Wide and Night Mode features. It comes with the A13 Bionic chip and a Liquid Retina display, providing a great balance of performance and affordability.', '/assets/iphone-11.jpeg'),
('Samsung Galaxy S23', 'Samsung', 240000, 28, 60, 'The Samsung Galaxy S23 is a flagship device featuring a dynamic AMOLED display, Snapdragon 8 Gen 2 processor, and a triple-camera system that captures stunning photos and videos. Its sleek design and powerful internals make it a top choice for Android users.', '/assets/galaxy-s23.jpeg'),
('Samsung Galaxy S23 Ultra', 'Samsung', 360000, 12, 35, 'The Samsung Galaxy S23 Ultra is the ultimate flagship with a 200MP camera, S Pen integration, and a massive 6.8-inch AMOLED display. It supports 8K video recording and offers cutting-edge performance for power users.', '/assets/galaxy-s23-ultra.jpg'),
('Samsung Galaxy Z Fold 5', 'Samsung', 540000, 56, 20, 'The Samsung Galaxy Z Fold 5 features a foldable 7.6-inch main screen for multitasking and immersive media experiences. With a Snapdragon 8 Gen 2 processor and a versatile triple-camera system, it\'s perfect for tech enthusiasts who value innovation.', '/assets/galaxy-z-fold-5.jpg'),
('Samsung Galaxy Z Flip 5', 'Samsung', 300000, 28, 40, 'The Galaxy Z Flip 5 is a compact foldable smartphone with a 6.7-inch AMOLED display and a 1.9-inch cover screen for quick notifications. Its compact design, powerful performance, and unique foldable form factor make it stand out.', '/assets/galaxy-z-flip-5.jpg'),
('Samsung Galaxy A54', 'Samsung', 105000, 28, 100, 'The Samsung Galaxy A54 is a mid-range smartphone that offers excellent value with a super AMOLED display, long-lasting battery, and solid camera performance. It\'s perfect for users looking for a reliable phone without breaking the bank.', '/assets/galaxy-a54.jpg'),
('Samsung Galaxy A73', 'Samsung', 150000, 28, 90, 'The Galaxy A73 combines a large screen, impressive battery life, and solid performance with a Snapdragon chipset. It offers a great balance between premium features and affordability, making it ideal for mid-range users.', '/assets/galaxy-a73.jpg'),
('Samsung Galaxy S22', 'Samsung', 210000, 28, 55, 'The Galaxy S22, Samsung\'s former flagship, boasts a 120Hz AMOLED display, Snapdragon 8 Gen 1 processor, and advanced camera system. It\'s designed for high performance and smooth visuals.', '/assets/galaxy-s22.jpg'),
('Samsung Galaxy Note 20', 'Samsung', 300000, 56, 40, 'The Samsung Galaxy Note 20 is a productivity powerhouse with S Pen functionality and a large 6.7-inch display. It offers seamless multitasking and excellent performance for users who need to get things done on the go.', '/assets/galaxy-note-20.jpg'),
('Samsung Galaxy S22 Ultra', 'Samsung', 330000, 12, 40, 'The Galaxy S22 Ultra is a photography-focused flagship with a 108MP camera, S Pen integration, and a stunning 6.8-inch display. It offers unparalleled performance and camera quality for enthusiasts.', '/assets/galaxy-s22-ultra.jpeg'),
('Samsung Galaxy Z Fold 4', 'Samsung', 510000, 12, 25, 'The Galaxy Z Fold 4 offers a foldable form factor with a large main screen for multitasking and immersive experiences. It combines high-end performance with innovative design, making it ideal for those who want cutting-edge technology.', '/assets/galaxy-z-fold-4.jpg'),
('Google Pixel 7', 'Google', 210000, 28, 70, 'The Google Pixel 7 features Google’s Tensor chip, offering AI-powered enhancements to camera performance and software. Its excellent camera quality, pure Android experience, and long-lasting battery make it a top choice for photography lovers.', '/assets/pixel-7.jpg'),
('Google Pixel 7 Pro', 'Google', 270000, 56, 50, 'The Google Pixel 7 Pro adds a 120Hz display and upgraded triple-camera system to deliver even better photo and video quality. It’s designed for users who want a seamless Android experience with powerful performance.', '/assets/pixel-7-pro.jpg'),
('Google Pixel 6a', 'Google', 135000, 28, 85, 'The Pixel 6a is an affordable phone that offers the same premium software experience as Google\'s higher-end models. Its long battery life and solid camera performance make it a great value for the price.', '/assets/pixel-6a.jpg'),
('Google Pixel 6', 'Google', 180000, 28, 60, 'The Pixel 6 brings Google\'s Tensor chip and advanced AI-powered camera features to users who want a premium experience without the high price tag. It’s known for excellent photo quality and smooth performance.', '/assets/pixel-6.jpg'),
('Google Pixel 6 Pro', 'Google', 270000, 56, 40, 'The Google Pixel 6 Pro features a triple-camera system with AI enhancements, offering top-notch photography capabilities. Its 120Hz display, Tensor chip, and 5G connectivity make it a powerful flagship option.', '/assets/pixel-6-pro.jpg'),
('Google Pixel 5', 'Google', 180000, 28, 45, 'The Google Pixel 5 is a slightly older but reliable model with excellent software optimization, great camera features, and 5G support. It remains a popular choice for those who prioritize camera quality and clean Android experience.', '/assets/pixel-5.jpg'),
('Google Pixel 4a', 'Google', 105000, 28, 70, 'The Google Pixel 4a is a compact, affordable phone that doesn’t skimp on performance or camera quality. It’s perfect for users who want Google\'s flagship camera and software at an entry-level price.', '/assets/pixel-4a.jpg'),
('Nokia G20', 'Nokia', 60000, 64, 80, 'The Nokia G20 is a budget-friendly smartphone featuring a 6.52-inch display, quad-camera setup, and a long-lasting 5050 mAh battery, making it ideal for daily use.', '/assets/nokia-g20.jpg'),
('Nokia X20', 'Nokia', 105000, 28, 60, 'The Nokia X20 offers a 6.67-inch display, 5G connectivity, and a versatile quad-camera system. It combines a sleek design with reliable performance for an enhanced user experience.', '/assets/nokia-x20.jpg'),
('Nokia 8.3 5G', 'Nokia', 210000, 28, 40, 'The Nokia 8.3 5G features a stunning 6.81-inch display, Snapdragon 765G processor, and a powerful quad-camera system, perfect for photography enthusiasts and gamers.', '/assets/nokia-8.3.jpg'),
('Nokia 5.4', 'Nokia', 75000, 28, 70, 'The Nokia 5.4 is designed for creatives with its 48MP quad-camera setup and 6.39-inch display. It offers good performance for multitasking and daily tasks.', '/assets/nokia-5.4.jpg'),
('Nokia C30', 'Nokia', 45000, 32, 100, 'The Nokia C30 is an entry-level smartphone with a 6.82-inch display and a dual-camera system. It offers solid performance and an impressive battery life for budget-conscious users.', '/assets/nokia-c30.jpg'),
('Nokia 3.4', 'Nokia', 60000, 64, 75, 'The Nokia 3.4 features a 6.39-inch HD+ display, Snapdragon 460 processor, and a triple-camera system. It combines style and functionality for everyday users.', '/assets/nokia-3.4.jpg'),
('Nokia 1.4', 'Nokia', 36000, 32, 90, 'The Nokia 1.4 is a budget smartphone with a 6.52-inch display and dual-camera system. It offers reliable performance for users looking for an affordable device.', '/assets/nokia-1.4.jpg'),
('Redmi Note 11', 'Redmi', 60000, 64, 75, 'The Redmi Note 11 features a 6.43-inch AMOLED display, Snapdragon 680 processor, and a 50MP quad-camera system, providing great performance and camera quality for its price.', '/assets/redmi-note-11.jpg'),
('Redmi Note 11 Pro', 'Redmi', 90000, 28, 60, 'The Redmi Note 11 Pro offers a 6.67-inch display, MediaTek Helio G96 processor, and a 108MP camera. It combines performance and aesthetics for an excellent user experience.', '/assets/redmi-note-11-pro.jpg'),
('Redmi Note 10', 'Redmi', 60000, 64, 80, 'The Redmi Note 10 comes with a 6.43-inch Super AMOLED display and a versatile quad-camera system, delivering great multimedia performance and battery life.', '/assets/redmi-note-10.jpg'),
('Redmi 10', 'Redmi', 45000, 64, 90, 'The Redmi 10 is an affordable smartphone featuring a 6.5-inch display and a dual-camera system. It offers solid performance and is ideal for everyday tasks.', '/assets/redmi-10.jpg'),
('Redmi Note 10 Pro', 'Redmi', 105000, 28, 50, 'The Redmi Note 10 Pro features a 6.67-inch AMOLED display, Snapdragon 732G processor, and a stunning 108MP camera, making it a powerful device for photography enthusiasts.', '/assets/redmi-note-10-pro.jpg'),
('Redmi 9', 'Redmi', 39000, 32, 100, 'The Redmi 9 features a 6.53-inch display and dual-camera system, providing excellent value for a budget smartphone with good performance and battery life.', '/assets/redmi-9.jpg'),
('Redmi K40', 'Redmi', 120000, 56, 30, 'The Redmi K40 features a 6.67-inch AMOLED display, Snapdragon 870 processor, and a triple-camera system, offering flagship performance at a competitive price.', '/assets/redmi-k40.jpg');


INSERT INTO Customer(Name, Username, Password, Email, Phone_Number) VALUES
('Vihanga Muthumala', 'vihanga', '$2b$10$P9D/m0lHf7hVb4CgRuXHl.yLxzqQy1siHMDNrR0ku5BEO7EcedTO.', 'vihangamuthu@gmail.com', '0775567984'),
('Sahan  Perera', 'Sahan1234', '$2b$10$MWshePCXvp7A5fvuZBbXKubBd8zY9u9f.OZk5.wx77eeM/Vdax0eG', 'sahan@gmail.com', '0775567982');


INSERT INTO Store (City) VALUES
('Colombo'),
('Negombo'),
('Galle'),
('Matara'),
('Jaffna'),
('Trinco'),
('Kandy');


INSERT INTO Truck_Route(Store_ID,Route,Time_Taken) VALUES 
(1,'Colombo-Awissawella-Eheliyagoda',2),
(1,'Colombo-Dehiwala-Panadura',1),
(1,'Colombo-Kadawatha-Gampaha',2),
(1, 'Colombo-Ratnapura-Balangoda', 3),
(1, 'Colombo-Kalutara-Beruwala', 2),
(2, 'Negombo-Kurunegala-Maho', 4),
(2, 'Negombo-Wennappuwa-Chilaw', 2),
(2, 'Negombo-Puttalam-Anuradhapura', 5),
(3, 'Galle-Hikkaduwa-Ambalangoda', 1),
(3, 'Galle-Elpitiya-Ahangama', 2),
(3, 'Galle-Karapitiya-Habaraduwa', 1),
(4, 'Matara-Dikwella-Tangalle', 2),
(4, 'Matara-Weligama-Kamburugamuwa', 1),
(4, 'Matara-Akuressa-Morawaka', 2),
(5, 'Jaffna-Kodikamam-Kilinochchi', 3),
(5, 'Jaffna-Point Pedro-KKS', 1),
(5, 'Jaffna-Mullaitivu-Paranthan', 4),
(6, 'Trinco-Kinniya-Muttur', 1),
(6, 'Trinco-Kantale-Habarana', 3),
(6, 'Trinco-Batticaloa-Kalkudah', 4),
(7, 'Kandy-Peradeniya-Gampola', 1.5),
(7, 'Kandy-Pilimathalawa-Kegalle', 2),
(7, 'Kandy-Digana-Mahiyanganaya', 3),
(7, 'Kandy-Matale-Dambulla', 2.5);

INSERT INTO Driver (Store_ID, Work_Hours, Availability) VALUES
(1, 0.0, 'On_Trip'),
(1, 0.0, 'Rest'),
(1, 0.0, 'Rest'),
(1, 0.0, 'Rest'),
(1, 0.0, 'Rest'),

(2, 0.0, 'Rest'),
(2, 0.0, 'Rest'),
(2, 0.0, 'Rest'),
(2, 0.0, 'Rest'),
(2, 0.0, 'Not_Available'),

(3, 0.0, 'Rest'),
(3, 0.0, 'Rest'),
(3, 0.0, 'Not_Available'),
(3, 0.0, 'Rest'),
(3, 0.0, 'Rest'),

(4, 0.0, 'Rest'),
(4, 0.0, 'On_Trip'),
(4, 0.0, 'Rest'),
(4, 0.0, 'Rest'),
(4, 0.0, 'Rest'),

(5, 0.0, 'Rest'),
(5, 0.0, 'On_Trip'),
(5, 0.0, 'Rest'),
(5, 0.0, 'Rest'),
(5, 0.0, 'Rest'),

(6, 0.0, 'Rest'),
(6, 0.0, 'On_Trip'),
(6, 0.0, 'Rest'),
(6, 0.0, 'Rest'),
(6, 0.0, 'Rest'),

(7, 0.0, 'Rest'),
(7, 0.0, 'On_Trip'),
(7, 0.0, 'Rest'),
(7, 0.0, 'Not_Available'),
(7, 0.0, 'Rest');

INSERT INTO Driver_Assistant (Name, Username, Password, Store_ID, Work_Hours, Availability) VALUES
(1, 0.0, 'On_Trip'),
(1, 0.0, 'Rest'),
(1, 0.0, 'Rest'),
(1, 0.0, 'Rest'),
(1, 0.0, 'Rest'),

(2, 0.0, 'Rest'),
(2, 0.0, 'Rest'),
(2, 0.0, 'Rest'),
(2, 0.0, 'Rest'),
(2, 0.0, 'Not_Available'),

(3, 0.0, 'Rest'),
(3, 0.0, 'Rest'),
(3, 0.0, 'Not_Available'),
(3, 0.0, 'Rest'),
(3, 0.0, 'Rest'),

(4, 0.0, 'Rest'),
(4, 0.0, 'On_Trip'),
(4, 0.0, 'Rest'),
(4, 0.0, 'Rest'),
(4, 0.0, 'Rest'),

(5, 0.0, 'Rest'),
(5, 0.0, 'On_Trip'),
(5, 0.0, 'Rest'),
(5, 0.0, 'Rest'),
(5, 0.0, 'Rest'),

(6, 0.0, 'Rest'),
(6, 0.0, 'On_Trip'),
(6, 0.0, 'Rest'),
(6, 0.0, 'Rest'),
(6, 0.0, 'Rest'),

(7, 0.0, 'Rest'),
(7, 0.0, 'On_Trip'),
(7, 0.0, 'Rest'),
(7, 0.0, 'Not_Available'),
(7, 0.0, 'Rest');


INSERT INTO Truck (Reg_number, Store_ID, Used_Hours, Availability) VALUES 
('001', 1, 0.0, TRUE),
('002', 1, 0.0, TRUE),
('003', 1, 0.0, FALSE),
('004', 2, 0.0, TRUE),
('005', 2, 0.0, TRUE),
('006', 2, 0.0, TRUE),
('007', 3, 0.0, FALSE),
('008', 3, 0.0, TRUE),
('009', 3, 0.0, TRUE),
('010', 4, 0.0, FALSE),
('011', 4, 0.0, TRUE),
('012', 4, 0.0, TRUE),
('013', 5, 0.0, TRUE),
('014', 5, 0.0, FALSE),
('015', 5, 0.0, TRUE),
('016', 6, 0.0, TRUE),
('017', 6, 0.0, TRUE),
('018', 6, 0.0, TRUE),
('019', 7, 0.0, FALSE),
('020', 7, 0.0, TRUE),
('021', 7, 0.0, TRUE);


INSERT INTO store_manager (Name, Email, Password, Store_ID) VALUES 
("Kasun Gayantha", "kasun342@gmail.com", "Gaya%&82", 1),
('Nuwan Perera', 'nuwanp@gmail.com', 'Nuwa@#56', 2),
('Saman Wijesinghe', 'samanw123@gmail.com', 'Sama$#45', 3),
('Thilini Senarath', 'thilini.s@gmail.com', 'Thil*67!x', 4),
('Amila Bandara', 'amila.ban@hotmail.com', 'Ami!d567', 5),
('Dilanka Gunasekara', 'dilanka.gun@yahoo.com', 'Dila%88#$', 6),
('Hiruna Gimhana', 'gimhana23@gmail.com', 'Gimm#254', 7);


INSERT INTO Train (Train_Name, Capacity, Available_space) VALUES
('Podi Menike', 500, 500),
('Udarata Menike', 450, 450),
('Night Mail', 600, 600),
('Express A', 400, 400),
('Express B', 400, 400),
('Intercity Express', 550, 550),
('Uthaya Devi (ICE)', 500, 500),
('Yal Devi (ICE)', 500, 500);



INSERT INTO Train_Schedule (Day, Start_Time, Train_ID, End_Station_ID) VALUES
('2024-10-02', '05:55:00', 1, 1),
('2024-10-02', '16:00:00', 1, 1),
('2024-10-02', '09:45:00', 2, 3),
('2024-10-02', '15:40:00', 2, 3),
('2024-10-02', '20:00:00', 3, 5),
('2024-10-02', '05:15:00', 3, 5),
('2024-10-02', '10:35:00', 4, 4),
('2024-10-02', '18:55:00', 4, 4),
('2024-10-02', '12:40:00', 5, 2),
('2024-10-02', '19:42:00', 5, 2),
('2024-10-02', '07:00:00', 6, 6),
('2024-10-02', '14:30:00', 6, 6),
('2024-10-02', '16:20:00', 7, 1),
('2024-10-02', '23:50:00', 7, 1),
('2024-10-02', '18:00:00', 8, 5),
('2024-10-02', '02:30:00', 8, 5);



INSERT INTO Destination (Trip_ID, Store_ID) VALUES
(1, 2),
(1, 1),
(2, 3),
(2, 5),
(2, 4),
(3, 6),
(3, 7),
(3, 1),
(4, 5),
(4, 4),
(5, 2),
(5, 6),
(6, 1),
(6, 7),
(7, 1),
(7, 2),
(8, 5),
(8, 6),
(9, 4),
(9, 3),
(10, 2),
(10, 1),
(11, 5),
(11, 6);
