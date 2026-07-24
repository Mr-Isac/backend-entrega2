# Backend Entrega Final - Ecommerce

## Descripción

Proyecto backend desarrollado como entrega final del curso de Backend.

La aplicación consiste en una API de ecommerce que permite gestionar productos y carritos utilizando **MongoDB Atlas como sistema de persistencia principal**.

Durante esta entrega se realizó la migración de persistencia desde archivos JSON hacia MongoDB utilizando Mongoose.

Se implementaron funcionalidades para:

- Gestión de productos.
- Gestión de carritos.
- Persistencia en MongoDB.
- Paginación de productos.
- Filtros mediante query params.
- Ordenamiento por precio.
- Referencias entre documentos utilizando ObjectId.
- Consulta de productos dentro de carritos mediante `populate()`.
- Vistas utilizando Express Handlebars.
- Actualización de productos en tiempo real mediante Socket.io.

Repositorio del proyecto:

https://github.com/Mr-Isac/backend-entregaFinal

---

# Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Mongoose Paginate V2
- Express Handlebars
- Socket.io
- Dotenv

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Mr-Isac/backend-entregaFinal.git
```

Ingresar a la carpeta del proyecto:

```bash
cd backend-entregaFinal
```

Instalar dependencias:

```bash
npm install
```

---

# Configuración de Base de Datos

El proyecto utiliza MongoDB Atlas como sistema de persistencia.

La conexión se realiza mediante variables de entorno utilizando un archivo `.env`.

El proyecto incluye el archivo `.env` con la configuración necesaria para conectarse a la base de datos utilizada durante el desarrollo y pruebas.

Variables utilizadas:

```env
PORT=8080

MONGO_URI=URI_DE_MONGODB_ATLAS
```

No es necesario instalar MongoDB localmente ni crear una base de datos manualmente.

Al ejecutar el proyecto, MongoDB gestionará automáticamente las colecciones necesarias:

- products
- carts

---

# Ejecución del proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

El servidor estará disponible en:

```
http://localhost:8080
```

---

# Importante sobre las vistas

La ruta raíz:

```
GET /
```

no corresponde al listado de productos, por lo que al acceder directamente a:

```
http://localhost:8080/
```

puede no visualizarse contenido.

Para acceder al listado de productos se debe ingresar a:

```
http://localhost:8080/products
```

o mediante la ruta:

```
GET /products
```

Esta es la vista principal de productos de la aplicación.

---

# Persistencia con MongoDB

La aplicación utiliza MongoDB Atlas mediante Mongoose.

## Modelo Product

Representa los productos disponibles en la tienda.

Campos principales:

- title
- description
- code
- price
- status
- stock
- category
- thumbnails

---

## Modelo Cart

Representa los carritos de compra.

Cada carrito almacena referencias hacia productos mediante ObjectId.

Ejemplo:

```json
{
  "products": [
    {
      "product": "id_producto",
      "quantity": 2
    }
  ]
}
```

Para obtener la información completa de cada producto asociado se utiliza:

```javascript
populate();
```

Esto permite guardar únicamente el identificador del producto y obtener todos sus datos al consultar el carrito.

---

# Endpoints de Productos

## Obtener productos

```
GET /api/products
```

Permite recibir parámetros mediante query params.

---

## Limit

Permite limitar la cantidad de productos obtenidos.

Ejemplo:

```
GET /api/products?limit=5
```

---

## Page

Permite seleccionar una página específica.

Ejemplo:

```
GET /api/products?page=2
```

---

## Sort

Permite ordenar productos por precio.

Orden ascendente:

```
GET /api/products?sort=asc
```

Orden descendente:

```
GET /api/products?sort=desc
```

---

## Query

Permite filtrar productos.

Filtro por categoría:

```
GET /api/products?query=remeras
```

Filtro por disponibilidad:

```
GET /api/products?query=true
```

---

La respuesta del endpoint incluye:

- status
- payload
- totalPages
- prevPage
- nextPage
- page
- hasPrevPage
- hasNextPage
- prevLink
- nextLink

---

## Obtener producto por ID

```
GET /api/products/:pid
```

---

## Crear producto

```
POST /api/products
```

---

## Actualizar producto

```
PUT /api/products/:pid
```

---

## Eliminar producto

```
DELETE /api/products/:pid
```

---

# Endpoints de Carritos

## Crear carrito

```
POST /api/carts
```

---

## Obtener carrito específico

```
GET /api/carts/:cid
```

Obtiene los productos pertenecientes al carrito solicitado.

Los productos son obtenidos mediante `populate()`.

---

## Agregar producto al carrito

```
POST /api/carts/:cid/product/:pid
```

Permite agregar productos existentes dentro de un carrito.

Si el producto ya existe dentro del carrito, aumenta su cantidad.

---

## Actualizar todos los productos del carrito

```
PUT /api/carts/:cid
```

Ejemplo:

```json
{
  "products": [
    {
      "product": "id_producto",
      "quantity": 3
    }
  ]
}
```

---

## Actualizar cantidad de un producto

```
PUT /api/carts/:cid/products/:pid
```

---

## Eliminar producto específico del carrito

```
DELETE /api/carts/:cid/products/:pid
```

---

## Vaciar carrito

```
DELETE /api/carts/:cid
```

---

# Vistas con Handlebars

La aplicación utiliza Express Handlebars para renderizar vistas.

## Productos

Ruta:

```
GET /products
```

Vista disponible en:

```
http://localhost:8080/products
```

Permite visualizar:

- listado de productos.
- información del producto.
- paginación.
- botón para agregar productos al carrito.

---

## Carrito

Ruta:

```
GET /carts/:cid
```

Permite visualizar los productos pertenecientes a un carrito específico.

El identificador del carrito corresponde al creado mediante:

```
POST /api/carts
```

---

# WebSockets

Se utiliza Socket.io para actualización de productos en tiempo real.

Funcionalidades:

- Crear productos.
- Eliminar productos.
- Actualizar automáticamente el listado.

---

# Estructura del proyecto

```
backend-entregaFinal/

├── config/
│   └── db.js
│
├── models/
│   ├── Product.js
│   └── Cart.js
│
├── routes/
│   ├── products.router.js
│   ├── carts.router.js
│   └── views.router.js
│
├── views/
│   ├── layouts/
│   ├── products.handlebars
│   ├── cart.handlebars
│   └── realTimeProducts.handlebars
│
├── public/
│   └── js/
│
├── app.js
├── package.json
├── .env
└── README.md
```

---

# Autor

Isaac Mendoza
