let productos = [];
let carrito = [];

///Descomentar para ejecutar esto una vez y que se cargue al localStorage los productos

productos.push(new producto(10, 'Remera Brooklyn', 1898, 'varon', 1));
productos.push(new producto(8, 'Buzo Litoral', 3393, 'unisex', 1));
productos.push(new producto(7, 'Campera Hoshi', 3098, 'unisex', 1));
productos.push(new producto(1, 'Set Isaura', 4290, 'nena', 1));
productos.push(new producto(5, 'Pantalon Hoshi', 4000, 'unisex', 1));
productos.push(new producto(11, 'Pantalon Oli', 4000, 'unisex', 1));
productos.push(new producto(6, 'body Foderato', 3500, 'varon', 1));
productos.push(new producto(3, 'body Zaira', 3500, 'nena', 1));
productos.push(new producto(2, 'Set Isi', 3226, 'unisex', 1));
productos.push(new producto(9, 'Remera Daysi', 1898, 'nena', 1));
productos.push(new producto(4, 'Set Smooth', 1898, 'unisex', 1));

productos = JSON.parse(localStorage.getItem('productos')) || [];


///obtengo los elementos necesarios del DOM
const selectProductos = document.querySelector('#productos');
const btnAgregar = document.querySelector('#agregar');


////traer los productos del localStorage
function traerItemsStorage() {
    productos = JSON.parse(localStorage.getItem('productos')) || [];
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
    const contadorCarrito = document.querySelector('#contador-carrito');

    bodyTabla.innerHTML = ''; // Limpiar contenido previo de la tabla

    let cantidadTotalCarrito = 0; // Inicializar la cantidad total del carrito
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
        columnaSubtotal.textContent = `$${subtotal.toFixed(2)}`;
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

        // Sumar a la cantidad total del carrito
        cantidadTotalCarrito += cantidad;
        // Sumar al total del carrito
        totalCarrito += subtotal;
    });

    // Actualiza el contador del carrito con la cantidad total
    contadorCarrito.textContent = cantidadTotalCarrito.toString();
    // Actualiza el campo "total" con el total de valores del carrito
    total.textContent = `$${totalCarrito.toFixed(2)}`;
}


  function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar el elemento del carrito
    localStorage.setItem('productos', JSON.stringify(productos)); // Actualizar el localStorage
    dibujarTabla(); // Volver a dibujar la tabla para reflejar los cambios
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
  const cards = [{
    id: 1,
    name: "Set Isaura",
    age: 2,
    img: "./assets/img/set-isaura.jpg"
  },
  {
      id: 2, 
      name: "Set Isi",
      age: 2,
      img: "./assets/img/set-smooth.jpg"
  },
  {
      id: 3, 
      name: "Zaira",
      age: 2,
      img: "./assets/img/body-federato-zaira.jpg"
  },
  {
      id: 4, 
      name: "Set Smooth",
      age: 2,
      img: "./assets/img/body-douglas.jpg"
  },
  {
    id: 5, 
    name: "Pantalon Oshi",
    age: 2,
    img: "./assets/img/pantalon-hoshi-multi.jpg"
  },
  {
    id: 6, 
    name: "body Foderato",
    age: 2,
    img: "./assets/img/body-federato-zaira.jpg"
  },
  {
    id: 7, 
    name: "Campera Oshi",
    age: 2,
    img: "./assets/img/campera-hoshi.jpg"
  },
  {
    id: 8, 
    name: "Buzo Litoral",
    age: 2,
    img: "./assets/img/buzo-litoral.jpg"
  },
  {
    id: 9, 
    name: "Remera daysi",
    age: 2,
    img: "./assets/img/remera-daysi.jpg"
  },
  {
    id: 10, 
    name: "Remera Broklyn",
    age: 2,
    img: "./assets/img/remera-brooklyn-daysi.jpg"
  },
  {
    id: 11, 
    name: "Pantalon Oli",
    age: 2,
    img: "./assets/img/pantalon-oli.jpg"
  }
  ];
  const cardContainer1 = document.getElementById("card-container-1");
  const cardContainer2 = document.getElementById("card-container-2");
  const cardContainer3 = document.getElementById("card-container-3");
  // Separa las tarjetas en tres segmentos
  const segment1Cards = cards.slice(0, 4); // Ejemplo: primeras 4 tarjetas
  const segment2Cards = cards.slice(4, 8); // Ejemplo: siguientes 4 tarjetas
  const segment3Cards = cards.slice(8);   // Ejemplo: las últimas 3 tarjetas

  // Agrega tarjetas al primer segmento
  segment1Cards.forEach((card) => {
      const cardElement = crearCardElement(card);
      cardContainer1.appendChild(cardElement);
  });

  // Agrega tarjetas al segundo segmento
  segment2Cards.forEach((card) => {
      const cardElement = crearCardElement(card);
      cardContainer2.appendChild(cardElement);
  });

  // Agrega tarjetas al tercer segmento
  segment3Cards.forEach((card) => {
      const cardElement = crearCardElement(card);
      cardContainer3.appendChild(cardElement);
  });
  const botonesAgregarAlCarrito = document.querySelectorAll(".btn.btn-outline-info");

botonesAgregarAlCarrito.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    const productId = parseInt(event.target.getAttribute("data-product-id"), 10);
    const producto = productos.find((p) => p.id === productId);

    if (producto) {
      const itemEnCarrito = carrito.find((item) => item.producto.id === productId);

      if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
      } else {
        const item = new Item(producto, 1);
        carrito.push(item);
      }

      // Guarda el carrito en el localStorage y actualiza la tabla
      localStorage.setItem('productos', JSON.stringify(productos));
      dibujarTabla();
    }
  });
});
});

function crearCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("col-lg-3", "col-md-6", "d-inline-block", "card");
  cardElement.innerHTML = `
      <div class="card">
          <img src="${card.img}" class="card-img-top" alt="${card.name}">
          <div class="card-body">
              <h5 class="card-title text-center">${card.name}</h5>
              <p class="card-text">Descripción de la tarjeta.</p>
              <button class="btn btn-outline-info" data-product-id="${card.id}">Agregar al carrito</button>
          </div>
      </div>
  `;
  return cardElement;
}
const btnConfirmar = document.getElementById('confirmar');
btnConfirmar.addEventListener('click', () => {
  Swal.fire({
    title: 'GRACIAS!',
    text: 'Tu compra fue realizada con exito.',
    imageUrl: './assets/img/logo.png',
    imageWidth: 400,
    imageHeight: 300,
    imageAlt: 'Custom image',
  });
});


























