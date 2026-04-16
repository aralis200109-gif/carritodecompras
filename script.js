// 1. Array de productos
const productos = [
    { id: 1, nombre: "Mouse Pro", precio: 50000 },
    { id: 2, nombre: "Teclado Mecánico", precio: 85000 },
    { id: 3, nombre: "Monitor 24' IPS", precio: 250000 },
    { id: 4, nombre: "Auriculares Gamer", precio: 45000 },
    { id: 5, nombre: "Webcam Full HD", precio: 60000 }
];

// Inicialización del carrito desde LocalStorage o vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Renderizado inicial
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(productos);
    actualizarInterfazCarrito();

    // Vinculación de eventos para una Boutique funcional
    document.getElementById("btn-comprobante").addEventListener("click", generarComprobante);
    document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
    document.getElementById("filtroNombre").addEventListener("input", filtrarProductos);
});

// Mostrar productos en el DOM
function renderizarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";
    
    lista.forEach(prod => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio.toLocaleString()}</p>
            <button class="btn-agregar">Agregar al Carrito</button>
        `;
        
        // Usar addEventListener en lugar de onclick para mayor limpieza y seguridad
        card.querySelector(".btn-agregar").addEventListener("click", () => {
            agregarCarrito(prod.id);
        });

        contenedor.appendChild(card);
    });
}

// 2. Funcionalidad para agregar al carrito
function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        // 3. Guardar en localStorage
        guardarLocalStorage();
        actualizarInterfazCarrito();
    }
}

function guardarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 4. Mostrar carrito dinámicamente y filtrar
function actualizarInterfazCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total-precio");
    const btnPdf = document.getElementById("btn-comprobante");
    
    listaCarrito.innerHTML = "";

    carrito.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.nombre}</span> <span>$${item.precio.toLocaleString()}</span>`;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalSpan.innerText = `$${total.toLocaleString()}`;
    btnPdf.disabled = carrito.length === 0;
}

function filtrarProductos() {
    const busqueda = document.getElementById("filtroNombre").value.toLowerCase();
    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(busqueda)
    );
    renderizarProductos(productosFiltrados);
}

function vaciarCarrito() {
    carrito = [];
    guardarLocalStorage();
    actualizarInterfazCarrito();
}

// 5. Generar un documento PDF (Comprobante)
function generarComprobante() {
    if (carrito.length === 0) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pinkTheme = [255, 192, 203]; // Rosa Coquette
    const textColor = [90, 74, 77];    // Gris cálido
    
       
    // Encabezado Premium
    doc.setFillColor(...pinkTheme);
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(22);
    doc.text("Boutique Coquette", 105, 22, { align: "center" });
    
    doc.setTextColor(...textColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Fecha de compra: ${new Date().toLocaleDateString()}`, 105, 45, { align: "center" });
    doc.line(50, 48, 160, 48);

    // Listado de Tesoros
    let y = 60;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Producto", 50, y);
    doc.text("Precio", 160, y, { align: "right" });
    
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    carrito.forEach(item => {
        doc.text(`🌸 ${item.nombre}`, 50, y);
        doc.text(`$${item.precio.toLocaleString()}`, 160, y, { align: "right" });
        y += 8;
    });

    // Total destacado
    const totalFinal = carrito.reduce((acc, item) => acc + item.precio, 0);
    y += 5;
    doc.setDrawColor(...pinkTheme);
    doc.line(50, y, 160, y);
    y += 10;
    doc.setFont("times", "bolditalic");
    doc.setFontSize(14);
    doc.text(`Total: $${totalFinal.toLocaleString()} ✨`, 160, y, { align: "right" });

    doc.setFontSize(8);
    doc.text("¡Gracias por elegir nuestra Boutique! Te ves radiante. 🎀", 105, 280, { align: "center" });

    doc.save("comprobante_boutique_coquette.pdf");
}