

let carrito = [];
let todasLasCamisas = [];




async function obtenerCamisas() {

    try {

        const respuesta =
        await fetch('http://localhost:3000/camisas');

        const camisas =
        await respuesta.json();

        todasLasCamisas = camisas;

        mostrarCamisas(camisas);

        actualizarTotalProductos();

    } catch (error) {

        console.error(error);

    }

}


// =========================================
// MOSTRAR PRODUCTOS
// =========================================

function mostrarCamisas(camisas) {

    const contenedor =
    document.getElementById('camisas-container');

    contenedor.innerHTML = '';

    camisas.forEach(camisa => {

        contenedor.innerHTML += `

        <div class="card">

            <div class="badge">
                Nuevo
            </div>

            <img src="${camisa.Imagen}" alt="${camisa.Equipo}">

            <div class="card-content">

                <h3>${camisa.Equipo}</h3>

                <div class="stars">
                    ★★★★★
                </div>

                <div class="price">
                    C$ ${camisa.Precio}
                </div>

                <p>
                    Stock: ${camisa.Stock}
                </p>

                <p>
                    Temporada: ${camisa.Temporada}
                </p>

                <p style="margin-bottom:15px;">
                    Talla: ${camisa.Talla}
                </p>

                <button onclick="agregarCarrito(${camisa.id})">
                    Agregar al carrito
                </button>

            </div>

        </div>

        `;

    });

}


// =========================================
// CARRITO
// =========================================

function agregarCarrito(id){

    carrito.push(id);

    document
    .getElementById('contador')
    .textContent =
    carrito.length;

    mostrarNotificacion(
        "Producto agregado al carrito"
    );

}


// =========================================
// NOTIFICACIÓN
// =========================================

function mostrarNotificacion(texto){

    const mensaje =
    document.createElement('div');

    mensaje.textContent = texto;

    mensaje.style.position = 'fixed';
    mensaje.style.top = '20px';
    mensaje.style.right = '20px';
    mensaje.style.padding = '15px 25px';
    mensaje.style.background = '#19e36a';
    mensaje.style.color = 'white';
    mensaje.style.borderRadius = '10px';
    mensaje.style.zIndex = '9999';

    document.body.appendChild(mensaje);

    setTimeout(() => {

        mensaje.remove();

    }, 2000);

}


// =========================================
// BUSCADOR
// =========================================

function buscarCamisas(){

    const texto =
    document
    .getElementById('busqueda')
    .value
    .toLowerCase();

    const filtradas =
    todasLasCamisas.filter(camisa =>

        camisa.Equipo
        .toLowerCase()
        .includes(texto)

    );

    mostrarCamisas(filtradas);

}


// =========================================
// FILTRO POR EQUIPO
// =========================================

function filtrarEquipo(){

    const equipo =
    document
    .getElementById('filtroEquipo')
    .value;

    if(equipo === ''){

        mostrarCamisas(
            todasLasCamisas
        );

        return;

    }

    const filtradas =
    todasLasCamisas.filter(camisa =>

        camisa.Equipo === equipo

    );

    mostrarCamisas(filtradas);

}


// =========================================
// CONTADOR DE PRODUCTOS
// =========================================

function actualizarTotalProductos(){

    const elemento =
    document.getElementById(
        'totalProductos'
    );

    if(elemento){

        elemento.textContent =
        `Productos disponibles: ${todasLasCamisas.length}`;

    }

}


// =========================================
// INICIAR APLICACIÓN
// =========================================

obtenerCamisas();

async function agregarCamisa(){

    const nuevaCamisa = {

        Equipo:
        document.getElementById('equipo').value,

        Talla:
        document.getElementById('talla').value,

        Temporada:
        document.getElementById('temporada').value,

        Precio:
        document.getElementById('precio').value,

        Stock:
        document.getElementById('stock').value,

        Imagen:
        document.getElementById('imagen').value

    };

    try{

        const respuesta =
        await fetch(
            'http://localhost:3000/camisas',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(
                    nuevaCamisa
                )
            }
        );

        const mensaje =
        await respuesta.text();

        alert(mensaje);

        obtenerCamisas();

    }catch(error){

        console.log(error);

    }

}