# DOCUMENTACIÓN BREVE

# TEMA 4. Carrito de Compras Profesional

## 1. Descripción General

El proyecto consiste en desarrollar un sistema web de carrito de compras que simule el funcionamiento básico de una tienda online, permitiendo agregar productos, almacenar información localmente y generar comprobantes de compra listos para impresión.

---

# 2. Objetivo General

Desarrollar un carrito de compras funcional utilizando HTML, CSS y JavaScript, implementando persistencia de datos mediante LocalStorage y generación de comprobantes en PDF.

---

# 3. Gestión de Productos

El sistema trabaja con un arreglo de objetos que almacena los productos disponibles en la tienda.

### Ejemplo:

```javascript id="q7m4xs"
const productos = [
  { id: 1, nombre: "Mouse", precio: 50000 }
];
```

Cada producto contiene:

* ID
* Nombre
* Precio

---

# 4. Agregar Productos al Carrito

El sistema permite agregar productos dinámicamente al carrito de compras.

### Función utilizada:

```javascript id="n6r2jp"
function agregarCarrito(producto) {
  carrito.push(producto);
}
```

Cada vez que se agrega un producto:

* El carrito se actualiza
* Se recalcula el total
* Se guarda la información automáticamente

---

# 5. Persistencia de Datos con LocalStorage

El sistema almacena los productos del carrito en el navegador para mantener la información incluso al recargar la página.

### Ejemplo:

```javascript id="w8t5fa"
localStorage.setItem("carrito", JSON.stringify(carrito));
```

También se utiliza:

* `JSON.stringify()`
* `JSON.parse()`
* `localStorage.getItem()`

---

# 6. Visualización del Carrito

El sistema muestra:

* Lista dinámica de productos agregados
* Cantidad de productos
* Precio individual
* Total acumulado de compra

Además, incorpora:

* Filtro de productos por nombre
* Actualización automática del DOM

---

# 7. Diseño Visual

El diseño del carrito incluye:

* Tarjetas de productos
* Botones interactivos
* Tabla organizada del carrito
* Diseño moderno y responsive
* Interfaz amigable para el usuario

---

# 8. Generación de Comprobante PDF

El sistema permite imprimir el comprobante de compra utilizando:

```javascript id="c4u8lb"
window.print();
```

Se implementa una vista limpia de impresión mostrando únicamente el resumen de compra.

---

# 9. Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript Vanilla
* LocalStorage API

---

# 10. Conclusión

El carrito de compras profesional permite simular el funcionamiento básico de una tienda online, aplicando almacenamiento local, manipulación dinámica del DOM y generación de comprobantes de compra de manera eficiente y profesional.
