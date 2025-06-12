# INET 2025 - Carrito de compras

# Referencia de la API

## Índice

- [Aerolíneas](#aerolíneas)
  - [Obtener todas las aerolíneas](#obtener-todas-las-aerolíneas)
  - [Obtener una aerolínea por ID](#obtener-una-aerolínea-por-id)
  - [Crear una nueva aerolínea](#crear-una-nueva-aerolínea)
  - [Actualizar una aerolínea](#actualizar-una-aerolínea)
  - [Eliminar una aerolínea](#eliminar-una-aerolínea)
- [Aeropuertos](#aeropuertos)
  - [Obtener todos los aeropuertos](#obtener-todos-los-aeropuertos)
  - [Obtener aeropuertos por ID de ciudad](#obtener-aeropuertos-por-id-de-ciudad)
  - [Obtener un aeropuerto por ID](#obtener-un-aeropuerto-por-id)
  - [Crear un nuevo aeropuerto](#crear-un-nuevo-aeropuerto)
  - [Actualizar un aeropuerto](#actualizar-un-aeropuerto)
  - [Eliminar un aeropuerto](#eliminar-un-aeropuerto)
- [Marcas](#marcas)
  - [Obtener todas las marcas](#obtener-todas-las-marcas)
  - [Obtener una marca por ID](#obtener-una-marca-por-id)
  - [Crear una nueva marca](#crear-una-nueva-marca)
  - [Actualizar una marca](#actualizar-una-marca)
  - [Eliminar una marca](#eliminar-una-marca)
- [Autos](#autos)
  - [Obtener todos los autos](#obtener-todos-los-autos)
  - [Obtener autos disponibles](#obtener-autos-disponibles)
  - [Obtener autos por ciudad](#obtener-autos-por-ciudad)
  - [Obtener un auto por ID](#obtener-un-auto-por-id)
  - [Crear un nuevo auto](#crear-un-nuevo-auto)
  - [Actualizar un auto](#actualizar-un-auto)
  - [Eliminar un auto](#eliminar-un-auto)
- [Ciudades](#ciudades)
  - [Obtener todas las ciudades](#obtener-todas-las-ciudades)
  - [Buscar ciudades por nombre](#buscar-ciudades-por-nombre)
  - [Obtener una ciudad por ID](#obtener-una-ciudad-por-id)
  - [Crear una nueva ciudad](#crear-una-nueva-ciudad)
  - [Actualizar una ciudad](#actualizar-una-ciudad)
  - [Eliminar una ciudad](#eliminar-una-ciudad)
- [Carrito de compras](#carrito-de-compras)
  - [Obtener el carrito de un usuario](#obtener-el-carrito-de-un-usuario)
  - [Añadir ítem al carrito](#añadir-ítem-al-carrito)
  - [Actualizar cantidad de un ítem](#actualizar-cantidad-de-un-ítem)
  - [Eliminar un ítem del carrito](#eliminar-un-ítem-del-carrito)
  - [Vaciar el carrito de un usuario](#vaciar-el-carrito-de-un-usuario)
- [Ítems del carrito](#ítems-del-carrito)
  - [Obtener ítem del carrito por ID](#obtener-ítem-del-carrito-por-id)
  - [Obtener todos los ítems de un carrito](#obtener-todos-los-ítems-de-un-carrito)
  - [Añadir ítem al carrito](#añadir-ítem-al-carrito-1)
  - [Actualizar cantidad de un ítem](#actualizar-cantidad-de-un-ítem-1)
  - [Eliminar un ítem del carrito](#eliminar-un-ítem-del-carrito-1)
  - [Vaciar todos los ítems de un carrito](#vaciar-todos-los-ítems-de-un-carrito)
- [Vuelos](#vuelos)
  - [Obtener todos los vuelos](#obtener-todos-los-vuelos)
  - [Buscar vuelos](#buscar-vuelos)
  - [Obtener vuelo por ID](#obtener-vuelo-por-id)
  - [Crear vuelo](#crear-vuelo)
  - [Actualizar vuelo](#actualizar-vuelo)
  - [Eliminar vuelo](#eliminar-vuelo)
- [Hoteles](#hoteles)
  - [Obtener todos los hoteles](#obtener-todos-los-hoteles)
  - [Buscar hoteles](#buscar-hoteles)
  - [Obtener hotel por ID](#obtener-hotel-por-id)
  - [Crear un nuevo hotel](#crear-un-nuevo-hotel)
  - [Actualizar un hotel](#actualizar-un-hotel)
  - [Eliminar un hotel](#eliminar-un-hotel)
- [Paquetes](#paquetes)
  - [Obtener todos los paquetes](#obtener-todos-los-paquetes)
  - [Buscar paquetes](#buscar-paquetes)
  - [Obtener paquete por ID](#obtener-paquete-por-id)
  - [Crear un nuevo paquete](#crear-un-nuevo-paquete)
  - [Actualizar un paquete](#actualizar-un-paquete)
  - [Eliminar un paquete](#eliminar-un-paquete)
- [Servicios](#servicios)
  - [Obtener todos los servicios](#obtener-todos-los-servicios)
  - [Buscar servicios por nombre](#buscar-servicios-por-nombre)
  - [Obtener servicio por ID](#obtener-servicio-por-id)
  - [Crear un nuevo servicio](#crear-un-nuevo-servicio)
  - [Actualizar un servicio](#actualizar-un-servicio)
  - [Eliminar un servicio](#eliminar-un-servicio)
  - [Obtener hoteles que ofrecen un servicio](#obtener-hoteles-que-ofrecen-un-servicio)
- [Usuarios](#usuarios)
  - [Obtener todos los usuarios](#obtener-todos-los-usuarios)
  - [Obtener un usuario por ID](#obtener-un-usuario-por-id)
  - [Crear un nuevo usuario](#crear-un-nuevo-usuario)
  - [Actualizar un usuario](#actualizar-un-usuario)
  - [Eliminar un usuario](#eliminar-un-usuario)

### Aerolíneas

#### Obtener todas las aerolíneas
```http
GET /api/airlines
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Aerolíneas Argentinas"
  },
  {
    "id": 2,
    "name": "LATAM"
  }
]
```

#### Obtener una aerolínea por ID
```http
GET /api/airlines/:id
```
| Parámetro | Tipo   | Ubicación | Descripción        |
|-----------|--------|-----------|--------------------|
| id        | integer | param     | ID de la aerolínea |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "name": "Aerolíneas Argentinas"
}
```

#### Crear una nueva aerolínea
```http
POST /api/airlines
```
| Parámetro | Tipo   | Ubicación | Descripción          |
|-----------|--------|-----------|----------------------|
| name      | string | body      | Nombre de la aerolínea |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Sky Airline"
}
```

#### Actualizar una aerolínea
```http
PUT /api/airlines/:id
```
| Parámetro | Tipo   | Ubicación | Descripción             |
|-----------|--------|-----------|-------------------------|
| id        | integer | param     | ID de la aerolínea      |
| name      | string | body      | Nuevo nombre (opcional) |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Sky Airline Actualizado"
}
```

#### Eliminar una aerolínea
```http
DELETE /api/airlines/:id
```
| Parámetro | Tipo   | Ubicación | Descripción        |
|-----------|--------|-----------|--------------------|
| id        | integer | param     | ID de la aerolínea |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Aerolínea eliminada correctamente"
}
```


---

### Aeropuertos

#### Obtener todos los aeropuertos
```http
GET /api/airports
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Aeropuerto Internacional Ezeiza",
    "code": "EZE",
    "city_id": 1
  },
  {
    "id": 2,
    "name": "Aeropuerto Jorge Newbery",
    "code": "AEP",
    "city_id": 1
  }
]
```


#### Obtener aeropuertos por ID de ciudad
```http
GET /api/airports/city/:cityId
```
| Parámetro | Tipo   | Ubicación | Descripción           |
|-----------|--------|-----------|-----------------------|
| cityId    | integer | param     | ID de la ciudad       |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Aeropuerto Internacional Ezeiza",
    "code": "EZE",
    "city_id": 1
  }
]
```

#### Obtener un aeropuerto por ID
```http
GET /api/airports/:id
```
| Parámetro | Tipo   | Ubicación | Descripción           |
|-----------|--------|-----------|-----------------------|
| id        | integer | param     | ID del aeropuerto     |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "name": "Aeropuerto Internacional Ezeiza",
  "code": "EZE",
  "city_id": 1
}
```

#### Crear un nuevo aeropuerto
```http
POST /api/airports
```
| Parámetro | Tipo   | Ubicación | Descripción                |
|-----------|--------|-----------|----------------------------|
| name      | string | body      | Nombre del aeropuerto      |
| code      | string | body      | Código del aeropuerto      |
| city_id   | integer | body      | ID de la ciudad            |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Aeropuerto El Palomar",
  "code": "EPA",
  "city_id": 2
}
```

#### Actualizar un aeropuerto
```http
PUT /api/airports/:id
```
| Parámetro | Tipo   | Ubicación | Descripción                 |
|-----------|--------|-----------|-----------------------------|
| id        | integer | param     | ID del aeropuerto           |
| name      | string | body      | Nuevo nombre (opcional)     |
| code      | string | body      | Nuevo código (opcional)     |
| city_id   | integer | body      | Nueva ciudad (opcional)     |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Aeropuerto El Palomar Actualizado",
  "code": "EPA",
  "city_id": 2
}
```


#### Eliminar un aeropuerto
```http
DELETE /api/airports/:id
```
| Parámetro | Tipo   | Ubicación | Descripción           |
|-----------|--------|-----------|-----------------------|
| id        | integer | param     | ID del aeropuerto     |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Aeropuerto eliminado correctamente"
}
```


---

### Marcas

#### Obtener todas las marcas
```http
GET /api/brands
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Toyota"
  },
  {
    "id": 2,
    "name": "Ford"
  }
]
```


#### Obtener una marca por ID
```http
GET /api/brands/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID de la marca   |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "name": "Toyota"
}
```


#### Crear una nueva marca
```http
POST /api/brands
```
| Parámetro | Tipo   | Ubicación | Descripción        |
|-----------|--------|-----------|--------------------|
| name      | string | body      | Nombre de la marca |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Chevrolet"
}
```


#### Actualizar una marca
```http
PUT /api/brands/:id
```
| Parámetro | Tipo   | Ubicación | Descripción             |
|-----------|--------|-----------|-------------------------|
| id        | integer | param     | ID de la marca          |
| name      | string | body      | Nuevo nombre (opcional) |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Chevrolet Actualizado"
}
```


#### Eliminar una marca
```http
DELETE /api/brands/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID de la marca   |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Marca eliminada correctamente"
}
```


---

### Autos

#### Obtener todos los autos
```http
GET /api/cars
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "brand_id": 1,
    "model": "Corolla",
    "city_id": 1,
    "price_per_day": 15000.00,
    "disponibility": true
  },
  {
    "id": 2,
    "brand_id": 2,
    "model": "Focus",
    "city_id": 2,
    "price_per_day": 12000.00,
    "disponibility": false
  }
]
```


#### Obtener autos disponibles
```http
GET /api/cars/available
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "brand_id": 1,
    "model": "Corolla",
    "city_id": 1,
    "price_per_day": 15000.00,
    "disponibility": true
  }
]
```


#### Obtener autos por ciudad
```http
GET /api/cars/city/:cityId
```
| Parámetro | Tipo   | Ubicación | Descripción           |
|-----------|--------|-----------|-----------------------|
| cityId    | integer | param     | ID de la ciudad       |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "brand_id": 1,
    "model": "Corolla",
    "city_id": 1,
    "price_per_day": 15000.00,
    "disponibility": true
  }
]
```


#### Obtener un auto por ID
```http
GET /api/cars/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID del auto      |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "brand_id": 1,
  "model": "Corolla",
  "city_id": 1,
  "price_per_day": 15000.00,
  "disponibility": true
}
```


#### Crear un nuevo auto
```http
POST /api/cars
```
| Parámetro        | Tipo    | Ubicación | Descripción                      |
|------------------|---------|-----------|----------------------------------|
| brand_id         | integer | body      | ID de la marca                   |
| model            | string  | body      | Modelo del auto                  |
| city_id          | integer | body      | ID de la ciudad                  |
| price_per_day    | decimal | body      | Precio por día                   |
| disponibility    | boolean | body      | Disponibilidad (opcional, por defecto true) |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "brand_id": 1,
  "model": "Etios",
  "city_id": 1,
  "price_per_day": 13000.00,
  "disponibility": true
}
```


#### Actualizar un auto
```http
PUT /api/cars/:id
```
| Parámetro        | Tipo    | Ubicación | Descripción                      |
|------------------|---------|-----------|----------------------------------|
| id               | integer | param     | ID del auto                      |
| brand_id         | integer | body      | ID de la marca (opcional)        |
| model            | string  | body      | Modelo del auto (opcional)       |
| city_id          | integer | body      | ID de la ciudad (opcional)       |
| price_per_day    | decimal | body      | Precio por día (opcional)        |
| disponibility    | boolean | body      | Disponibilidad (opcional)        |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "brand_id": 1,
  "model": "Etios Actualizado",
  "city_id": 1,
  "price_per_day": 13500.00,
  "disponibility": false
}
```


#### Eliminar un auto
```http
DELETE /api/cars/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID del auto      |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Auto eliminado correctamente"
}
```


---

### Ciudades

#### Obtener todas las ciudades
```http
GET /api/cities
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Buenos Aires",
    "country": "Argentina"
  },
  {
    "id": 2,
    "name": "San Carlos de Bariloche",
    "country": "Argentina"
  }
]
```

#### Buscar ciudades por nombre
```http
GET /api/cities/search?name=nombre
```
| Parámetro | Tipo   | Ubicación | Descripción                      |
|-----------|--------|-----------|----------------------------------|
| name      | string | query     | Nombre o parte del nombre        |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Buenos Aires",
    "country": "Argentina"
  },
  {
    "id": 2,
    "name": "San Carlos de Bariloche",
    "country": "Argentina"
  }
]
```


#### Obtener una ciudad por ID
```http
GET /api/cities/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID de la ciudad  |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "name": "Buenos Aires",
  "country": "Argentina"
}
```

#### Crear una nueva ciudad
```http
POST /api/cities
```
| Parámetro | Tipo   | Ubicación | Descripción         |
|-----------|--------|-----------|---------------------|
| name      | string | body      | Nombre de la ciudad |
| country   | string | body      | País                |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Mendoza",
  "country": "Argentina"
}
```

#### Actualizar una ciudad
```http
PUT /api/cities/:id
```
| Parámetro | Tipo   | Ubicación | Descripción                  |
|-----------|--------|-----------|------------------------------|
| id        | string | param     | ID de la ciudad              |
| name      | string | body      | Nuevo nombre (opcional)      |
| country   | string | body      | Nuevo país (opcional)        |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Mendoza Actualizado",
  "country": "Argentina"
}
```

#### Eliminar una ciudad
```http
DELETE /api/cities/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID de la ciudad  |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Ciudad eliminada correctamente"
}
```

---

### Carrito de compras

#### Obtener el carrito de un usuario
```http
GET /api/cart/:userId
```
| Parámetro | Tipo   | Ubicación | Descripción         |
|-----------|--------|-----------|---------------------|
| userId    | string | param     | ID del usuario      |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "user_id": 1,
  "created_at": "2025-06-12T10:00:00Z"
}
```

#### Añadir ítem al carrito
```http
POST /api/cart/:userId/items
```
| Parámetro   | Tipo    | Ubicación | Descripción                            |
|-------------|---------|-----------|----------------------------------------|
| userId      | string  | param     | ID del usuario                         |
| itemType    | string  | body      | Tipo de ítem (flight, hotel, package)  |
| itemId      | string  | body      | ID del ítem a añadir                   |
| quantity    | number  | body      | Cantidad (opcional, por defecto 1)     |
| options     | object  | body      | Opciones adicionales (opcional)        |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "user_id": 1,
  "item_type": "flight",
  "item_id": 1,
  "quantity": 2,
  "options": {
    "class": "Económica"
  }
}
```

#### Actualizar cantidad de un ítem
```http
PATCH /api/cart/:userId/items/:itemId
```
| Parámetro | Tipo   | Ubicación | Descripción         |
|-----------|--------|-----------|---------------------|
| userId    | string | param     | ID del usuario      |
| itemId    | string | param     | ID del ítem         |
| quantity  | number | body      | Nueva cantidad      |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "user_id": 1,
  "item_type": "flight",
  "item_id": 1,
  "quantity": 3
}
```

#### Eliminar un ítem del carrito
```http
DELETE /api/cart/:userId/items/:itemId
```
| Parámetro | Tipo   | Ubicación | Descripción         |
|-----------|--------|-----------|---------------------|
| userId    | string | param     | ID del usuario      |
| itemId    | string | param     | ID del ítem         |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Ítem eliminado correctamente"
}
```

#### Vaciar el carrito de un usuario
```http
DELETE /api/cart/:userId
```
| Parámetro | Tipo   | Ubicación | Descripción         |
|-----------|--------|-----------|---------------------|
| userId    | string | param     | ID del usuario      |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Carrito vaciado correctamente"
}
```


---

### Ítems del carrito

#### Obtener ítem del carrito por ID
```http
GET /api/cart-items/:id
```
| Parámetro | Tipo   | Ubicación | Descripción              |
|-----------|--------|-----------|--------------------------|
| id        | string | param     | ID del ítem del carrito  |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "cart_id": 1,
  "item_type": "flight",
  "item_id": 1,
  "quantity": 2,
  "options": {
    "class": "Económica"
  }
}
```

#### Obtener todos los ítems de un carrito
```http
GET /api/cart-items/cart/:cartId
```
| Parámetro | Tipo   | Ubicación | Descripción          |
|-----------|--------|-----------|----------------------|
| cartId    | string | param     | ID del carrito       |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "cart_id": 1,
    "item_type": "flight",
    "item_id": 1,
    "quantity": 2,
    "options": {
      "class": "Económica"
    }
  }
]
```

#### Añadir ítem al carrito
```http
POST /api/cart-items
```
| Parámetro  | Tipo    | Ubicación | Descripción                            |
|------------|---------|-----------|----------------------------------------|
| cart_id    | string  | body      | ID del carrito                         |
| type_item  | string  | body      | Tipo de ítem (flight, hotel, package)  |
| item_id    | string  | body      | ID del ítem                            |
| amount     | number  | body      | Cantidad (opcional, por defecto 1)     |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "cart_id": 1,
  "type_item": "flight",
  "item_id": 1,
  "amount": 2
}
```

#### Actualizar cantidad de un ítem
```http
PUT /api/cart-items/:id
```
| Parámetro | Tipo   | Ubicación | Descripción              |
|-----------|--------|-----------|--------------------------|
| id        | string | param     | ID del ítem del carrito  |
| amount    | number | body      | Nueva cantidad           |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "cart_id": 1,
  "type_item": "flight",
  "item_id": 1,
  "amount": 3
}
```

#### Eliminar un ítem del carrito
```http
DELETE /api/cart-items/:id
```
| Parámetro | Tipo   | Ubicación | Descripción              |
|-----------|--------|-----------|--------------------------|
| id        | string | param     | ID del ítem del carrito  |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Ítem eliminado correctamente"
}
```

#### Vaciar todos los ítems de un carrito
```http
DELETE /api/cart-items/cart/:cartId/clear
```
| Parámetro | Tipo   | Ubicación | Descripción          |
|-----------|--------|-----------|----------------------|
| cartId    | string | param     | ID del carrito       |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Carrito vaciado correctamente"
}
```


---

### Vuelos

#### Obtener todos los vuelos
```http
GET /api/flights
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "origin_id": 1,
    "destiny_id": 2,
    "out_date": "2025-07-01",
    "back_date": "2025-07-10",
    "airline_id": 1,
    "price": 75000.00,
    "duration": "02:30:00",
    "class": "Económica",
    "available_seats": 50
  }
]
```

#### Buscar vuelos
```http
GET /api/flights/search?origin_city_id=...&destination_city_id=...&departure_date=...&airline_id=...&passengers=...
```
| Parámetro           | Tipo   | Ubicación | Descripción                                 |
|---------------------|--------|-----------|---------------------------------------------|
| origin_city_id      | integer | query     | ID de la ciudad de origen (opcional)        |
| destination_city_id | integer | query     | ID de la ciudad de destino (opcional)       |
| departure_date      | string  | query     | Fecha de salida (YYYY-MM-DD, opcional)      |
| airline_id          | integer | query     | ID de la aerolínea (opcional)               |
| passengers          | integer | query     | Número de pasajeros (opcional)              |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "origin_id": 1,
    "destiny_id": 2,
    "out_date": "2025-07-01",
    "back_date": "2025-07-10",
    "airline_id": 1,
    "price": 75000.00,
    "duration": "02:30:00",
    "class": "Económica",
    "available_seats": 50
  }
]
```


#### Obtener vuelo por ID
```http
GET /api/flights/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | string | param     | ID del vuelo     |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "origin_id": 1,
  "destiny_id": 2,
  "out_date": "2025-07-01",
  "back_date": "2025-07-10",
  "airline_id": 1,
  "price": 75000.00,
  "duration": "02:30:00",
  "class": "Económica",
  "available_seats": 50
}
```

#### Crear vuelo
```http
POST /api/flights
```
| Parámetro              | Tipo    | Ubicación | Descripción                  |
|------------------------|---------|-----------|------------------------------|
| airline_id             | string  | body      | ID de la aerolínea           |
| origin_airport_id      | string  | body      | ID del aeropuerto de origen  |
| destination_airport_id | string  | body      | ID del aeropuerto de destino |
| departure_time         | string  | body      | Hora de salida (ISO 8601)    |
| arrival_time           | string  | body      | Hora de llegada (ISO 8601)   |
| available_seats        | number  | body      | Asientos disponibles         |
| price                  | number  | body      | Precio del vuelo             |

**Ejemplo de respuesta:**
```json
{
  "id": 2,
  "airline_id": 1,
  "origin_airport_id": 1,
  "destination_airport_id": 2,
  "departure_time": "2025-07-01T10:00:00Z",
  "arrival_time": "2025-07-01T12:30:00Z",
  "available_seats": 50,
  "price": 75000.00
}
```

#### Actualizar vuelo
```http
PUT /api/flights/:id
```
| Parámetro | Tipo   | Ubicación | Descripción                  |
|-----------|--------|-----------|------------------------------|
| id        | string | param     | ID del vuelo                 |
| ...       | ...    | body      | Campos a actualizar          |

**Ejemplo de respuesta:**
```json
{
  "id": 2,
  "airline_id": 1,
  "origin_airport_id": 1,
  "destination_airport_id": 2,
  "departure_time": "2025-07-01T10:00:00Z",
  "arrival_time": "2025-07-01T12:30:00Z",
  "available_seats": 40,
  "price": 80000.00
}
```

#### Eliminar vuelo
```http
DELETE /api/flights/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | string | param     | ID del vuelo     |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Vuelo eliminado correctamente"
}
```


---

### Hoteles

#### Obtener todos los hoteles
```http
GET /api/hotels
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Hotel Plaza",
    "city_id": 1,
    "address": "Av. Corrientes 1234",
    "stars": 5,
    "price_per_night": 30000.00,
    "available_rooms": 10
  }
]
```

#### Buscar hoteles
```http
GET /api/hotels/search?city_id=...&min_stars=...&max_price=...&check_in=...&check_out=...
```
| Parámetro   | Tipo   | Ubicación | Descripción                                |
|-------------|--------|-----------|--------------------------------------------|
| city_id     | integer | query     | ID de la ciudad (opcional)                 |
| min_stars   | integer | query     | Estrellas mínimas (opcional)               |
| max_price   | decimal | query     | Precio máximo por noche (opcional)         |
| check_in    | string  | query     | Fecha de entrada (YYYY-MM-DD, opcional)    |
| check_out   | string  | query     | Fecha de salida (YYYY-MM-DD, opcional)     |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Hotel Plaza",
    "city_id": 1,
    "address": "Av. Corrientes 1234",
    "stars": 5,
    "price_per_night": 30000.00,
    "available_rooms": 10
  }
]
```


#### Obtener hotel por ID
```http
GET /api/hotels/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID del hotel     |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "nombre": "Hotel Plaza",
  "city_id": 1,
  "address": "Av. Corrientes 1234",
  "stars": 5,
  "price_per_night": 30000.00,
  "available_rooms": 10
}
```

#### Crear hotel
```http
POST /api/hotels
```
| Parámetro         | Tipo    | Ubicación | Descripción                        |
|-------------------|---------|-----------|------------------------------------|
| nombre            | string  | body      | Nombre del hotel                   |
| city_id           | string  | body      | ID de la ciudad                    |
| address           | string  | body      | Dirección del hotel                |
| stars             | number  | body      | Número de estrellas (1-5)          |
| price_per_night   | number  | body      | Precio por noche                   |
| available_rooms   | number  | body      | Habitaciones disponibles           |

**Ejemplo de respuesta:**
```json
{
  "id": 2,
  "nombre": "Hotel Iguazú",
  "city_id": 3,
  "address": "Ruta Nacional 12 km 5",
  "stars": 4,
  "price_per_night": 20000.00,
  "available_rooms": 8
}
```

#### Actualizar hotel
```http
PUT /api/hotels/:id
```
| Parámetro | Tipo   | Ubicación | Descripción                  |
|-----------|--------|-----------|------------------------------|
| id        | string | param     | ID del hotel                 |
| ...       | ...    | body      | Campos a actualizar          |

**Ejemplo de respuesta:**
```json
{
  "id": 2,
  "nombre": "Hotel Iguazú Actualizado",
  "city_id": 3,
  "address": "Ruta Nacional 12 km 5",
  "stars": 4,
  "price_per_night": 22000.00,
  "available_rooms": 7
}
```

#### Eliminar hotel
```http
DELETE /api/hotels/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID del hotel     |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Hotel eliminado correctamente"
}
```


---

### Paquetes

#### Obtener todos los paquetes
```http
GET /api/packages
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Paquete Bariloche Invierno",
    "description": "Vuelo + hotel 7 noches en Bariloche",
    "city_destiny_id": 2,
    "total_price": 250000.00,
    "includes_flight": true,
    "includes_hotel": true,
    "includes_car": false
  }
]
```

#### Buscar paquetes
```http
GET /api/packages/search?destination=...&check_in=...&check_out=...&guests=...&min_price=...&max_price=...
```
| Parámetro     | Tipo   | Ubicación | Descripción                                  |
|---------------|--------|-----------|----------------------------------------------|
| destination   | string  | query     | Ciudad/aeropuerto destino (opcional)         |
| check_in      | string  | query     | Fecha de entrada (YYYY-MM-DD, opcional)      |
| check_out     | string  | query     | Fecha de salida (YYYY-MM-DD, opcional)       |
| guests        | integer | query     | Número de huéspedes (opcional)               |
| min_price     | decimal | query     | Precio mínimo (opcional)                     |
| max_price     | decimal | query     | Precio máximo (opcional)                     |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "Paquete Bariloche Invierno",
    "description": "Vuelo + hotel 7 noches en Bariloche",
    "city_destiny_id": 2,
    "total_price": 250000.00,
    "includes_flight": true,
    "includes_hotel": true,
    "includes_car": false
  }
]
```


#### Obtener paquete por ID
```http
GET /api/packages/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID del paquete   |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "name": "Paquete Bariloche Invierno",
  "description": "Vuelo + hotel 7 noches en Bariloche",
  "city_destiny_id": 2,
  "total_price": 250000.00,
  "includes_flight": true,
  "includes_hotel": true,
  "includes_car": false
}
```

#### Crear paquete
```http
POST /api/packages
```
| Parámetro         | Tipo    | Ubicación | Descripción                       |
|-------------------|---------|-----------|-----------------------------------|
| name              | string  | body      | Nombre del paquete                |
| description       | string  | body      | Descripción                       |
| city_destiny_id   | integer | body      | ID de la ciudad destino           |
| total_price       | decimal | body      | Precio total                      |
| includes_flight   | boolean | body      | Incluye vuelo                     |
| includes_hotel    | boolean | body      | Incluye hotel                     |
| includes_car      | boolean | body      | Incluye auto (opcional)           |

**Ejemplo de respuesta:**
```json
{
  "id": 2,
  "name": "Paquete Iguazú Aventura",
  "description": "Vuelo + hotel 5 noches en Iguazú",
  "city_destiny_id": 3,
  "total_price": 180000.00,
  "includes_flight": true,
  "includes_hotel": true,
  "includes_car": true
}
```

#### Actualizar paquete
```http
PUT /api/packages/:id
```
| Parámetro | Tipo   | Ubicación | Descripción                  |
|-----------|--------|-----------|------------------------------|
| id        | string | param     | ID del paquete               |
| ...       | ...    | body      | Campos a actualizar          |

**Ejemplo de respuesta:**
```json
{
  "id": 2,
  "name": "Paquete Iguazú Aventura Actualizado",
  "description": "Vuelo + hotel 5 noches en Iguazú",
  "city_destiny_id": 3,
  "total_price": 200000.00,
  "includes_flight": true,
  "includes_hotel": true,
  "includes_car": true
}
```

#### Eliminar paquete
```http
DELETE /api/packages/:id
```
| Parámetro | Tipo   | Ubicación | Descripción      |
|-----------|--------|-----------|------------------|
| id        | integer | param     | ID del paquete   |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Paquete eliminado correctamente"
}
```


---

### Servicios

#### Obtener todos los servicios
```http
GET /api/services
```

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "WiFi"
  },
  {
    "id": 2,
    "name": "Desayuno incluido"
  }
]
```

#### Buscar servicios por nombre
```http
GET /api/services/search?name=...
```
| Parámetro | Tipo   | Ubicación | Descripción                      |
|-----------|--------|-----------|----------------------------------|
| name      | string | query     | Nombre o parte del nombre        |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "name": "WiFi"
  },
  {
    "id": 2,
    "name": "Desayuno incluido"
  }
]
```


#### Obtener servicio por ID
```http
GET /api/services/:id
```
| Parámetro | Tipo   | Ubicación | Descripción          |
|-----------|--------|-----------|----------------------|
| id        | string | param     | ID del servicio      |

**Ejemplo de respuesta:**
```json
{
  "id": 1,
  "name": "WiFi"
}
```

#### Crear servicio
```http
POST /api/services
```
| Parámetro    | Tipo   | Ubicación | Descripción                        |
|--------------|--------|-----------|------------------------------------|
| name         | string | body      | Nombre del servicio                |
| description  | string | body      | Descripción detallada (opcional)   |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Piscina"
}
```

#### Actualizar servicio
```http
PUT /api/services/:id
```
| Parámetro   | Tipo   | Ubicación | Descripción                  |
|-------------|--------|-----------|------------------------------|
| id          | string | param     | ID del servicio              |
| name        | string | body      | Nuevo nombre (opcional)      |
| description | string | body      | Nueva descripción (opcional) |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Piscina Climatizada"
}
```

#### Eliminar servicio
```http
DELETE /api/services/:id
```
| Parámetro | Tipo   | Ubicación | Descripción          |
|-----------|--------|-----------|----------------------|
| id        | string | param     | ID del servicio      |

**Ejemplo de respuesta:**
```json
{
  "mensaje": "Servicio eliminado correctamente"
}
```

#### Obtener hoteles que ofrecen un servicio
```http
GET /api/services/:serviceId/hotels
```
| Parámetro  | Tipo   | Ubicación | Descripción          |
|------------|--------|-----------|----------------------|
| serviceId  | string | param     | ID del servicio      |

**Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Hotel Plaza",
    "city_id": 1,
    "address": "Av. Corrientes 1234",
    "stars": 5,
    "price_per_night": 30000.00,
    "available_rooms": 10
  }
]
```


---

### Usuarios

#### Registrar usuario
```http
POST /api/users/register
```
| Parámetro   | Tipo   | Ubicación | Descripción                |
|-------------|--------|-----------|----------------------------|
| first_name  | string | body      | Nombre del usuario         |
| last_name   | string | body      | Apellido del usuario       |
| email       | string | body      | Correo electrónico         |
| password    | string | body      | Contraseña                 |

**Ejemplo de respuesta:**
```json
{
  "id": 3,
  "name": "Carlos López",
  "email": "carlos.lopez@email.com",
  "is_admin": false
}
```

#### Iniciar sesión
```http
POST /api/users/login
```
| Parámetro | Tipo   | Ubicación | Descripción                |
|-----------|--------|-----------|----------------------------|
| email     | string | body      | Correo electrónico         |
| password  | string | body      | Contraseña                 |

---

