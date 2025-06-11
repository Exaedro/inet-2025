-- DUMMY DATA FOR inet DATABASE

-- USERS
INSERT INTO users (first_name, last_name, email, password)
VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '$2b$10$dummyhash1'),
('Ana', 'García', 'ana.garcia@example.com', '$2b$10$dummyhash2'),
('Carlos', 'López', 'carlos.lopez@example.com', '$2b$10$dummyhash3');

-- AIRLINES
INSERT INTO airlines (name) VALUES
('Aerolínea Uno'),
('Aerolínea Dos'),
('Aerolínea Tres');

-- CITIES
INSERT INTO cities (name, country) VALUES
('Buenos Aires', 'Argentina'),
('Santiago', 'Chile'),
('Lima', 'Perú');

-- AIRPORTS
INSERT INTO airports (name, code, city_id) VALUES
('Aeropuerto Ezeiza', 'EZE', 1),
('Aeropuerto Santiago', 'SCL', 2),
('Aeropuerto Lima', 'LIM', 3);

-- BRANDS
INSERT INTO brands (name) VALUES
('Toyota'),
('Ford'),
('Chevrolet');

-- CARS
INSERT INTO cars (brand_id, model, city_id, price_per_day, disponibility) VALUES
(1, 'Corolla', 1, 50.00, true),
(2, 'Fiesta', 2, 40.00, true),
(3, 'Onix', 3, 45.00, false);

-- HOTELS
INSERT INTO hotels (nombre, city_id, address, stars, price_per_night, available_rooms) VALUES
('Hotel Central', 1, 'Calle 123', 4, 120.00, 10),
('Hotel Andes', 2, 'Avenida 456', 3, 90.00, 5),
('Hotel Pacífico', 3, 'Boulevard 789', 5, 200.00, 2);

-- SERVICES
INSERT INTO services (name) VALUES
('WiFi'),
('Piscina'),
('Desayuno');

-- HOTEL_SERVICE (relaciona hoteles con servicios)
INSERT INTO hotel_service (hotel_id, service_id) VALUES
(1, 1), (1, 2), (2, 1), (3, 3);

-- FLIGHTS
INSERT INTO flights (origin_id, destiny_id, out_date, back_date, airline_id, price, duration, class, available_seats) VALUES
(1, 2, '2025-07-01', '2025-07-10', 1, 300.00, '03:00', 'Economy', 100),
(2, 3, '2025-07-05', '2025-07-15', 2, 250.00, '04:00', 'Business', 80),
(3, 1, '2025-07-08', '2025-07-18', 3, 400.00, '05:00', 'Economy', 60);

-- PACKAGES
INSERT INTO packages (name, description, city_destiny_id, total_price, includes_flight, includes_hotel, includes_car)
VALUES
('Paquete Andes', 'Vuelo y hotel en Santiago', 2, 800.00, true, true, false),
('Paquete Pacífico', 'Vuelo, hotel y auto en Lima', 3, 1200.00, true, true, true);

-- CART
INSERT INTO cart (user_id) VALUES
(1), (2);

-- CART_ITEMS
INSERT INTO cart_items (cart_id, type_item, item_id, amount) VALUES
(1, 'flight', 1, 2),
(1, 'hotel', 1, 1),
(2, 'package', 2, 1);

-- Listo para poblar la base de datos con datos de prueba.
-- Las contraseñas son hashes dummy, reemplaza por hashes reales si usas en producción.
