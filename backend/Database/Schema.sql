drop database if exists nexi_schema;
create database nexi_schema;
use nexi_schema;


-- -----------------------------------

CREATE TABLE Customer(
  Customer_ID INT AUTO_INCREMENT,
  Name VARCHAR(50),
  Password VARCHAR(100),
  Email VARCHAR(50),
  Address VARCHAR(100),
  Phone_Number VARCHAR(12),
  PRIMARY KEY (Customer_ID)
);

CREATE TABLE Product (
  Product_ID INT AUTO_INCREMENT,
  Product_Name VARCHAR(100),
  Price DECIMAL(8,2),
  Capacity INT,
  Stock_Quantity INT,
  Description VARCHAR(500),
  Image_Link VARCHAR(50),
  PRIMARY KEY (Product_ID)
);

CREATE TABLE Store (
  Store_ID INT AUTO_INCREMENT,
  City VARCHAR(20),
  PRIMARY KEY (Store_ID)
);

CREATE TABLE Truck_Route (
  Route_ID INT AUTO_INCREMENT,
  Store_ID INT,
  Route VARCHAR(100),
  Time_Taken DECIMAL(10,0),
  PRIMARY KEY (Route_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Driver (
  Driver_ID INT AUTO_INCREMENT,
  Store_ID INT,
  Work_Hours DECIMAL(4,2) CHECK (Work_Hours < 40.00),
  Availability ENUM('On_Trip','Rest','Not_Available'),
  PRIMARY KEY (Driver_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Driver_Assistant (
  Assistant_ID INT AUTO_INCREMENT,
  Store_ID INT,
  Work_Hours DECIMAL(4,2) CHECK (Work_Hours < 60.00),
  Availability ENUM('On_Trip','Rest','Not_Available'),
  PRIMARY KEY (Assistant_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Store_Manager (
  Manager_ID INT AUTO_INCREMENT,
  Name VARCHAR(50),
  Email VARCHAR(50),
  Password VARCHAR(100),
  Store_ID INT,
  PRIMARY KEY (Manager_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);

CREATE TABLE Train (
  Train_ID INT AUTO_INCREMENT,
  Train_Name VARCHAR(20),
  Capacity INT,
  PRIMARY KEY (Train_ID)
);

CREATE TABLE Train_Schedule (
  Trip_ID INT AUTO_INCREMENT,
  Day DATE,
  Start_Time TIME,
  Train_ID INT,
  End_Station_ID INT,
  PRIMARY KEY (Trip_ID),
  FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID)
);

CREATE TABLE Truck (
  Truck_ID INT AUTO_INCREMENT,
  Reg_Number VARCHAR(10),
  Store_ID INT,
  Used_Hours FLOAT(6),
  Availability BOOLEAN,
  PRIMARY KEY (Truck_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);


CREATE TABLE Destination (
  Dest_id INT AUTO_INCREMENT,
  Trip_ID INT,
  Store_ID INT,
  PRIMARY KEY (Dest_id),
  FOREIGN KEY (Trip_ID) REFERENCES Train_Schedule(Trip_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID)
);


CREATE TABLE Orders (
  Order_ID INT AUTO_INCREMENT,
  Customer_ID INT,
  Store_ID INT,
  Route_ID INT,
  Ordered_Date DATE,
  Expected_Date DATE,
  Total_Capacity INT,
  Total_Price DECIMAL(8,2),
  PRIMARY KEY (Order_ID),
  FOREIGN KEY (Store_ID) REFERENCES Store(Store_ID),
  FOREIGN KEY (Route_ID) REFERENCES Truck_Route(Route_ID),
  FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID)
);

CREATE TABLE Delivery_Schedule (
  Delivery_id INT AUTO_INCREMENT,
  Train_id INT,
  Truck_id INT,
  Driver_id INT,
  Assistant_id INT,
  Order_id INT,
  Vehicle_arrival_time TIME,
  Vehicle_departure_time TIME,
  Delivery_status ENUM('On_Train', 'In_Truck'),
  PRIMARY KEY (Delivery_id),
  FOREIGN KEY (Driver_id) REFERENCES Driver(Driver_ID),
  FOREIGN KEY (Assistant_id) REFERENCES Driver_Assistant(Assistant_ID),
  FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID),
  FOREIGN KEY (Truck_ID) REFERENCES Truck(Truck_ID),
  FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID)
);



CREATE TABLE Order_Item (
  Set_id INT AUTO_INCREMENT,
  Product_ID INT,
  Order_ID INT DEFAULT NULL,
  Quantity INT,
  Order_Item_Capacity INT,
  Order_item_Price DECIMAL(8,2),
  PRIMARY KEY (Set_id),
  FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID),
  FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID)
);



-- -----------------------------------------------------------------
INSERT INTO Product (Product_Name, Price, Capacity, Stock_Quantity, Description, Image_Link)
VALUES
('iPhone 14', 799.99, 128, 50, 'Latest iPhone model with A15 Bionic chip and advanced camera features.', '../../assets/iphone-14.jpg'),
('iPhone 14 Pro', 999.99, 256, 30, 'iPhone 14 Pro with ProMotion display and triple-camera system.', '../../assets/iphone-14-pro.jpg'),
('iPhone SE', 429.99, 64, 75, 'Affordable iPhone with A13 Bionic chip and Touch ID.', '../../assets/iphone-se.jpg'),
('iPhone 13', 699.99, 128, 65, 'iPhone 13 with A15 chip and dual-camera system.', '../../assets/iphone-13.jpeg'),
('iPhone 13 Pro', 899.99, 256, 40, 'iPhone 13 Pro with ProMotion display and improved battery life.', '../../assets/iphone-13-pro.jpeg'),
('iPhone 12', 599.99, 64, 80, 'Previous generation iPhone with A14 chip and great camera.', '../../assets/iphone-12.jpeg'),
('iPhone 12 Mini', 499.99, 64, 70, 'Compact version of iPhone 12 with the same performance.', '../../assets/iphone-12-mini.jpg'),
('iPhone 11', 499.99, 64, 90, 'iPhone 11 with dual-camera system and Liquid Retina display.', '../../assets/iphone-11.jpeg'),
('Samsung Galaxy S23', 799.99, 128, 60, 'Flagship Galaxy S23 with dynamic AMOLED display and Snapdragon 8 Gen 2.', '../../assets/galaxy-s23.jpeg'),
('Samsung Galaxy S23 Ultra', 1199.99, 512, 35, 'Galaxy S23 Ultra with 200MP camera and S Pen integration.', '../../assets/galaxy-s23-ultra.jpg'),
('Samsung Galaxy Z Fold 5', 1799.99, 256, 20, 'Foldable Samsung phone with a 7.6-inch main screen and multitasking capabilities.', '../../assets/galaxy-z-fold-5.jpg'),
('Samsung Galaxy Z Flip 5', 999.99, 128, 40, 'Compact foldable Samsung phone with a 6.7-inch AMOLED display.', '../../assets/galaxy-z-flip-5.jpg'),
('Samsung Galaxy A54', 349.99, 128, 100, 'Mid-range Galaxy A54 with a super AMOLED display and long-lasting battery.', '../../assets/galaxy-a54.jpg'),
('Samsung Galaxy A73', 499.99, 128, 90, 'Samsung mid-range phone with large screen and good battery life.', '../../assets/galaxy-a73.jpg'),
('Samsung Galaxy S22', 699.99, 128, 55, 'Previous flagship Samsung phone with 120Hz AMOLED display.', '../../assets/galaxy-s22.jpg'),
('Samsung Galaxy Note 20', 999.99, 256, 40, 'Galaxy Note 20 with S Pen and large screen for productivity.', '../../assets/galaxy-note-20jpg'),
('Samsung Galaxy S22 Ultra', 1099.99, 512, 40, 'Samsung flagship with 108MP camera and S Pen.', '../../assets/galaxy-S22 ultra.jpeg'),
('Samsung Galaxy Z Fold 4', 1699.99, 512, 25, 'Foldable phone with high performance and enhanced multitasking features.', '../../assets/galaxy-z-fold-4.jpg'),
('Google Pixel 7', 699.99, 128, 70, 'Google Pixel with Tensor chip and incredible camera software.', '../../assets/pixel-7.jpg'),
('Google Pixel 7 Pro', 899.99, 256, 50, 'Google Pixel 7 Pro with upgraded camera system and 120Hz display.', '../../assets/pixel-7.jpg'),
('Google Pixel 6a', 449.99, 128, 85, 'Affordable Google phone with premium software experience.', '../../assets/pixel-6a.jpg'),
('Google Pixel 6', 599.99, 128, 60, 'Google Pixel with Google’s Tensor chip and AI-powered features.', '../../assets/pixel-6.jpg'),
('Google Pixel 6 Pro', 899.99, 256, 40, 'Flagship Pixel with a triple-camera system and smooth 120Hz display.', '../../assets/pixel-6-pro.jpg'),
('Google Pixel 5', 599.99, 128, 45, 'Older generation Google Pixel with clean software and great camera.', '../../assets/pixel-5.jpg'),
('Google Pixel 4a', 349.99, 128, 70, 'Compact and affordable Google Pixel with excellent software.', '../../assets/pixel-4a.jpg');





INSERT INTO Store (City) VALUES
('Colombo'),
('Negombo'),
('Galle'),
('Matara'),
('Jaffna'),
('Trinco');


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
(6, 'Trinco-Batticaloa-Kalkudah', 4);

INSERT INTO Driver (Store_ID, Work_Hours, Availability) VALUES
(1, 35.50, 'On_Trip'),
(2, 28.75, 'Rest'),
(1, 39.00, 'Not_Available'),
(3, 24.25, 'Rest'),
(2, 30.50, 'Rest'),
(1, 15.00, 'On_Trip'),
(3, 38.75, 'Not_Available'),
(2, 22.50, 'On_Trip'),
(3, 19.00, 'Rest'),
(1, 33.25, 'Not_Available');

INSERT INTO Driver_Assistant (Store_ID, Work_Hours, Availability) VALUES
(1, 55.25, 'On_Trip'),
(2, 45.50, 'Rest'),
(1, 59.00, 'Not_Available'),
(3, 40.75, 'On_Trip'),
(2, 35.00, 'Rest'),
(1, 50.50, 'Not_Available'),
(3, 30.00, 'On_Trip'),
(2, 22.50, 'On_Trip'),
(3, 15.25, 'Rest'),
(1, 33.75, 'Not_Available');


INSERT INTO Truck (Reg_number, Store_ID, Used_Hours, Availability) VALUES 
('001', 1, 00.0, TRUE),
('002', 1, 50.0, TRUE),
('003', 1, 200.0, FALSE),
('004', 2, 150.0, TRUE),
('005', 3, 70.0, TRUE),
('006', 4, 300.0, FALSE),
('007', 5, 120.0, TRUE),
('008', 6, 250.0, FALSE);


INSERT INTO store_manager (Name, Email, Password, Store_ID) VALUES 
("Kasun Gayantha", "kasun342@gmail.com", "Gaya%&82", 1),
('Nuwan Perera', 'nuwanp@gmail.com', 'Nuwa@#56', 2),
('Saman Wijesinghe', 'samanw123@gmail.com', 'Sama$#45', 3),
('Thilini Senarath', 'thilini.s@gmail.com', 'Thil*67!x', 4),
('Amila Bandara', 'amila.ban@hotmail.com', 'Ami!d567', 5),
('Dilanka Gunasekara', 'dilanka.gun@yahoo.com', 'Dila%88#$', 6);


INSERT INTO Train (Train_Name, Capacity) VALUES
('Podi Menike', 500),
('Udarata Menike', 450),
('Night Mail', 600),
('Express A', 400),
('Express B', 400),
('Intercity Express', 550),
('Uthaya Devi (ICE)', 500),
('Yal Devi (ICE)', 500);



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
(2, 2),
(3, 4),
(4, 4),
(5, 1),
(6, 1),
(7, 3),
(8, 3),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 2),
(14, 2),
(15, 1),
(16, 1);