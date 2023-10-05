let productos = [];
let carrito = [];

///Descomentar para ejecutar esto una vez y que se cargue al localStorage los productos

productos.push(new producto('Remera Brooklyn',1898,'varon',2))
productos.push(new producto('Buzo Litoral', 3393, 'unisex',1))
productos.push(new producto('Campera Hoshi', 3098, 'unisex',2))
productos.push(new producto('Set Isaura', 4290, 'nena',2))
productos.push(new producto('Pantalon Hoshi', 2243, 'unisex',2))
productos.push(new producto('body Foderato', 1954, 'varon',2))
productos.push(new producto('body Zaira', 2128, 'nena',2))
productos.push(new producto('Set smooth', 3226,'unisex',2)) 
productos.push(new producto('Remera Daysi', 1898,'nena',2)) 

localStorage.setItem('productos', JSON.stringify(productos));


///obtengo los elementos necesarios del DOM
const selectProductos = document.querySelector('#productos');
const btnAgregar = document.querySelector('#agregar');


////traer los productos del localStorage
function traerItemsStorage() {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
    //carrito = JSON.parse(localStorage.getItem('productos')) || [];

}


function popularDropdown() {
    productos.forEach(({nombre,precio,tipo}, index) => { 
        ////aca voy a dibujar las opciones dentro del body del select
        const option = document.createElement('option');
        option.textContent = `${nombre} - $${precio}`;
        option.value = index; ///con esto nos guiamos para saber que objeto del array SELECCIONA
        selectProductos.appendChild(option);
    });
}

///DOMContentLoaded es un evento que se triggerea (dispara) cuando se carga el documento completamente
document.addEventListener('DOMContentLoaded', () => {
    traerItemsStorage();
    popularDropdown();
    dibujarTabla();
});
formularioAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const productoSeleccionadoIndex = +selectProductos.value;
  
    if (isNaN(productoSeleccionadoIndex) || productoSeleccionadoIndex < 0 || productoSeleccionadoIndex >= productos.length) {
      alert('Usted primero debe seleccionar un producto válido');
      return;
    }
  
    const productoSeleccionado = productos[productoSeleccionadoIndex];
  
    // Buscar si el producto ya está en el carrito
    const itemEnCarrito = carrito.find((item) => item.productoIndex === productoSeleccionadoIndex);
  
    if (itemEnCarrito) {
      itemEnCarrito.cantidad++; // Incrementar la cantidad del producto existente en el carrito
    } else {
      const item = new Item(productoSeleccionado, 1);
      item.productoIndex = productoSeleccionadoIndex; // Agregar el índice al item
      carrito.push(item);
    }
  
    localStorage.setItem('productos', JSON.stringify(productos));
    dibujarTabla();
  });

  function dibujarTabla() {
    const bodyTabla = document.getElementById('items');
    const total = document.querySelector('#total');
    bodyTabla.innerHTML = ''; // Limpiar contenido previo de la tabla
  
    let totalCarrito = 0; // Inicializar el total del carrito
  
    carrito.forEach((item, index) => {
      const { producto: { nombre, precio }, cantidad } = item;
  
      // Crear una fila para el elemento del carrito
      const fila = document.createElement('tr');
      fila.className = 'text-white';
  
      // Columna para el nombre
      const columnaNombre = document.createElement('td');
      columnaNombre.textContent = nombre || '';
      fila.appendChild(columnaNombre);
  
      // Columna para el precio unitario
      const columnaPrecio = document.createElement('td');
      columnaPrecio.textContent = `$${precio || ''}`;
      fila.appendChild(columnaPrecio);
  
      // Columna para la cantidad
      const columnaCantidad = document.createElement('td');
      columnaCantidad.textContent = cantidad || '';
      fila.appendChild(columnaCantidad);
  
      // Columna para el subtotal
      const columnaSubtotal = document.createElement('td');
      const subtotal = cantidad * precio || 0;
      columnaSubtotal.textContent = subtotal;
      fila.appendChild(columnaSubtotal);
  
      // Columna con el botón de eliminar
      const columnaEliminar = document.createElement('td');
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'X';
      botonEliminar.className = 'btn btn-secondary btn-sm';
  
      // Agregar un evento de clic al botón para eliminar el elemento
      botonEliminar.addEventListener('click', () => {
        eliminarDelCarrito(index);
      });
  
      columnaEliminar.appendChild(botonEliminar);
      fila.appendChild(columnaEliminar);
  
      bodyTabla.appendChild(fila);
  
      // Sumar al total del carrito
      totalCarrito += subtotal;
    });
    total.textContent = totalCarrito;
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1); // Eliminar el elemento del carrito
        localStorage.setItem('productos', JSON.stringify(productos)); // Actualizar el localStorage
        dibujarTabla(); // Volver a dibujar la tabla para reflejar los cambios
      }
    
    // Establecer el nuevo contenido de tabla en lugar de reemplazarlo
    bodyTabla.innerHTML = tablaHTML;
  
    // Calcular el total
    total.textContent = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  // Agregar un evento de clic al botón "Vaciar"
const btnVaciar = document.querySelector('#vaciar');
btnVaciar.addEventListener('click', () => {
  // Vaciar el carrito (eliminar todos los elementos)
  carrito = [];
  // Actualizar la tabla
  dibujarTabla();
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = [
        {
          id: 1,
          name: "Set Isaura",
          age: 2,
          img: "./assets/img/set-isaura.jpg"
        },
        {
            id: 2, 
            name: "Set Smooth",
            age: 2,
            img: "./assets/img/set-smooth.jpg"
        },
        {
            id: 3, 
            name: "Set Smooth",
            age: 2,
            img: "./assets/img/body-federato-zaira.jpg"
        },
        {
            id: 4, 
            name: "Set Smooth",
            age: 2,
            img: "./assets/img/body-douglas.jpg"
        }
        
    ];

    const cardContainer = document.getElementById("card-container");

    // Agrega tarjetas dinámicamente
    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("col-lg-3", "col-md-6", "d-inline-block",); 
        cardElement.innerHTML = `
            <div class="card">
                <img src="${card.img}" class="card-img-top" alt="${card.name}">
                <div class="card-body">
                    <h5 class="card-title text-center">${card.name}</h5>
                    <p class="card-text">Descripción de la tarjeta.</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    });
});

























