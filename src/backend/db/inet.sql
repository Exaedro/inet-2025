-- PostgreSQL database dump
-- Converted from MySQL to PostgreSQL
-- Generated on: 2025-06-11 18:37:14-03:00

-- Drop existing tables if they exist (commented out for safety)
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS packages CASCADE;
-- DROP TABLE IF EXISTS hotel_service CASCADE;
-- DROP TABLE IF EXISTS hotels CASCADE;
-- DROP TABLE IF EXISTS flights CASCADE;
-- DROP TABLE IF EXISTS cities CASCADE;
-- DROP TABLE IF EXISTS cart_items CASCADE;
-- DROP TABLE IF EXISTS cart CASCADE;
-- DROP TABLE IF EXISTS cars CASCADE;
-- DROP TABLE IF EXISTS brands CASCADE;
-- DROP TABLE IF EXISTS airports CASCADE;
-- DROP TABLE IF EXISTS airlines CASCADE;

-- --------------------------------------------------------

--
-- Table structure for table `airlines`
--

CREATE TABLE airlines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

CREATE TABLE airports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  code VARCHAR(10),
  city_id INTEGER
);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  brand_id INTEGER,
  model VARCHAR(50),
  city_id INTEGER,
  price_per_day DECIMAL(10,2),
  disponibility BOOLEAN
);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER,
  type_item VARCHAR(20),
  item_id INTEGER,
  amount INTEGER DEFAULT 1
);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  country VARCHAR(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  origin_id INTEGER,
  destiny_id INTEGER,
  out_date DATE,
  back_date DATE,
  airline_id INTEGER,
  price DECIMAL(10,2),
  duration TIME,
  class VARCHAR(50),
  available_seats INTEGER
);

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE hotels (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  city_id INTEGER,
  address TEXT,
  stars INTEGER,
  price_per_night DECIMAL(10,2),
  available_rooms INTEGER
);

-- --------------------------------------------------------

--
-- Table structure for table `hotel_service`
--

CREATE TABLE hotel_service (
  hotel_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  PRIMARY KEY (hotel_id, service_id)
);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  city_destiny_id INTEGER,
  total_price DECIMAL(10,2),
  includes_flight BOOLEAN,
  includes_hotel BOOLEAN,
  includes_car BOOLEAN
);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT NOT NULL,
  email VARCHAR(100),
  password TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Indexes for dumped tables
--

-- Add foreign key constraints
ALTER TABLE airports
  ADD CONSTRAINT fk_airports_city FOREIGN KEY (city_id) REFERENCES cities(id);

-- Fix flight constraints to reference airports table instead of cities
ALTER TABLE flights
  DROP CONSTRAINT IF EXISTS fk_flights_origin,
  DROP CONSTRAINT IF EXISTS fk_flights_destiny,
  DROP CONSTRAINT IF EXISTS fk_flights_airline;

-- Add foreign key constraints
ALTER TABLE cars
  ADD CONSTRAINT fk_cars_brand FOREIGN KEY (brand_id) REFERENCES brands(id),
  ADD CONSTRAINT fk_cars_city FOREIGN KEY (city_id) REFERENCES cities(id);

ALTER TABLE cart
  ADD CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE cart_items
  ADD CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES cart(id);

ALTER TABLE flights
  ADD CONSTRAINT fk_flights_origin FOREIGN KEY (origin_id) REFERENCES airports(id),
  ADD CONSTRAINT fk_flights_destiny FOREIGN KEY (destiny_id) REFERENCES airports(id),
  ADD CONSTRAINT fk_flights_airline FOREIGN KEY (airline_id) REFERENCES airlines(id);

ALTER TABLE hotels
  ADD CONSTRAINT fk_hotels_city FOREIGN KEY (city_id) REFERENCES cities(id);

ALTER TABLE hotel_service
  ADD CONSTRAINT fk_hotel_service_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_hotel_service_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE;

ALTER TABLE packages
  ADD CONSTRAINT fk_packages_city FOREIGN KEY (city_destiny_id) REFERENCES cities(id);

-- Create indexes for better performance
CREATE INDEX idx_airports_city ON airports(city_id);
CREATE INDEX idx_cars_brand ON cars(brand_id);
CREATE INDEX idx_cars_city ON cars(city_id);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX idx_flights_origin ON flights(origin_id);
CREATE INDEX idx_flights_destiny ON flights(destiny_id);
CREATE INDEX idx_flights_airline ON flights(airline_id);
CREATE INDEX idx_hotels_city ON hotels(city_id);
CREATE INDEX idx_hotel_service_service ON hotel_service(service_id);
CREATE INDEX idx_packages_city ON packages(city_destiny_id);

-- Add comments to tables and columns if needed
COMMENT ON TABLE airlines IS 'Airlines information';
COMMENT ON TABLE airports IS 'Airports information with city reference';
COMMENT ON TABLE brands IS 'Car brands';
COMMENT ON TABLE cars IS 'Available cars for rent';
COMMENT ON TABLE cart IS 'Shopping cart information';
COMMENT ON TABLE cart_items IS 'Items in the shopping cart';
COMMENT ON TABLE cities IS 'Cities information';
COMMENT ON TABLE flights IS 'Flight information';
COMMENT ON TABLE hotels IS 'Hotels information';
COMMENT ON TABLE hotel_service IS 'Many-to-many relationship between hotels and services';
COMMENT ON TABLE packages IS 'Travel packages';
COMMENT ON TABLE services IS 'Hotel services';
COMMENT ON TABLE users IS 'User accounts';

-- End of PostgreSQL schema
