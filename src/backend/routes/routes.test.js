import express from 'express';
import UserModel from '../models/user.model.js';
import AirlineModel from '../models/airline.model.js';
import AirportModel from '../models/airport.model.js';
import BrandModel from '../models/brand.model.js';
import CarModel from '../models/car.model.js';
import CartModel from '../models/cart.model.js';
import CartItemModel from '../models/cart-item.model.js';
import CityModel from '../models/city.model.js';
import FlightModel from '../models/flight.model.js';
import HotelModel from '../models/hotel.model.js';
import PackageModel from '../models/package.model.js';
import ServiceModel from '../models/service.model.js';

const router = express.Router();

// USERS
router.post('/users/register', async (req, res) => {
  try {
    const user = await UserModel.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.getProfile(Number(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// AIRLINES
router.post('/airlines', async (req, res) => {
  try {
    const airline = await AirlineModel.create(req.body);
    res.status(201).json(airline);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/airlines', async (req, res) => {
  try {
    const airlines = await AirlineModel.getAll();
    res.json(airlines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AIRPORTS
router.post('/airports', async (req, res) => {
  try {
    const airport = await AirportModel.create(req.body);
    res.status(201).json(airport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/airports', async (req, res) => {
  try {
    const airports = await AirportModel.getAll();
    res.json(airports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BRANDS
router.post('/brands', async (req, res) => {
  try {
    const brand = await BrandModel.create(req.body);
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/brands', async (req, res) => {
  try {
    const brands = await BrandModel.getAll();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CARS
router.post('/cars', async (req, res) => {
  try {
    const car = await CarModel.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/cars', async (req, res) => {
  try {
    const cars = await CarModel.getAll();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CART
router.post('/cart', async (req, res) => {
  try {
    const cart = await CartModel.create(req.body.user_id);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/cart/:user_id', async (req, res) => {
  try {
    const cart = await CartModel.getCartWithItems(Number(req.params.user_id));
    res.json(cart);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// CART ITEMS
router.post('/cart-items', async (req, res) => {
  try {
    const item = await CartItemModel.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/cart-items/:cart_id', async (req, res) => {
  try {
    const items = await CartItemModel.getByCartId(Number(req.params.cart_id));
    res.json(items);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// CITIES
router.post('/cities', async (req, res) => {
  try {
    const city = await CityModel.create(req.body);
    res.status(201).json(city);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/cities', async (req, res) => {
  try {
    const cities = await CityModel.getAll();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FLIGHTS
router.post('/flights', async (req, res) => {
  try {
    const flight = await FlightModel.create(req.body);
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/flights', async (req, res) => {
  try {
    const flights = await FlightModel.getAll();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// HOTELS
router.post('/hotels', async (req, res) => {
  try {
    const hotel = await HotelModel.create(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/hotels', async (req, res) => {
  try {
    const hotels = await HotelModel.getAll();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PACKAGES
router.post('/packages', async (req, res) => {
  try {
    const pkg = await PackageModel.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/packages', async (req, res) => {
  try {
    const pkgs = await PackageModel.getAll();
    res.json(pkgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SERVICES
router.post('/services', async (req, res) => {
  try {
    const service = await ServiceModel.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/services', async (req, res) => {
  try {
    const services = await ServiceModel.getAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
