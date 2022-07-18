//---------------------------------------------LISTA DE PRODUCTOS----------------------------------------------

class Producto {
    constructor(id, nombre, codigo, tipo, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.tipo = tipo;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const listaProductos = [];

let prod1 = new Producto(1, "Zapatilla Nike", "MD500", "calzado", 25000.00, "nikeportada2.png")
let prod2 = new Producto(2, "Remera Manga Larga", "RM5400", "remera", 3000.00, "remera-blanca-hombre-ml.jpg")
let prod3 = new Producto(3, "Buzo Negro Capucha", "BC300", "buzo", 5000.00, "buzo-negro-capucha.webp")
let prod4 = new Producto(4, "Pantalon Cuadrille", "PC6000", "pantalon", 3000.00, "pantalon rojo.webp")
let prod5 = new Producto(5, "Zapatilla Adidas MD", "AMD60", "calzado", 21000.00, "adidas md.png")
let prod6 = new Producto(6, "Remera blanca imagen", "RBI300", "remera", 2500.00, "remera blanca img.png")
let prod7 = new Producto(7, "Zapatilla Nike Air", "NA400", "calzado", 23000.00, "nike air.png")
let prod8 = new Producto(8, "Remera Manga Corta", "RMC570", "remera", 2000.00, "remera-negra-hombre.webp")
let prod9 = new Producto(9, "Buzo Negro", "B300", "buzo", 4500.00, "buzo-negro-hombre.webp")
let prod10 = new Producto(10, "Pantalon Pampero", "PP600", "pantalon", 5000.00, "pantalon pampero.webp")
let prod11 = new Producto(11, "Buzo Blanco Capucha", "BCB500", "buzo", 5200.00, "buzo-blanco-capucha.jpg")
let prod12 = new Producto(12, "Chomba Hombre", "CH500", "remera", 4900.00, "chomba-blanca-hombre.jpg")

listaProductos.push(prod1);
listaProductos.push(prod2);
listaProductos.push(prod3);
listaProductos.push(prod4);
listaProductos.push(prod5);
listaProductos.push(prod6);
listaProductos.push(prod7);
listaProductos.push(prod8);
listaProductos.push(prod9);
listaProductos.push(prod10);
listaProductos.push(prod11);
listaProductos.push(prod12);

//-----------------------------------------------------MAIN---------------------------------------------------

function crearCardsMain(productos) {
    let cardsBloque = document.querySelector("#Productos-main");

    cardsBloque.innerHTML = ""

    productos.forEach(producto => {
        cardsBloque.innerHTML += crearCard(producto);
    })
}

function crearCard(producto) {

    let iconFav = includesFav(favoritos, producto) ? "fav black.svg" : "fav.svg";

    let cardCreada = `
        <div class="Productos-main-Card">
            <div class="Productos-main-agregar-fav">
                <img src="./img/icon/${iconFav}" alt="" id="${producto.id}" onclick="manejarFavs(${producto.id})">
            </div>
            <div class="Productos-main-Img"><img src="./img/prod/${producto.imagen}" alt=""></div>
            <div class="Productos-main-Cuerpo">
                <div class="Productos-main-Desc">
                    <h2>${producto.nombre}</h2>
                    <h3>${producto.codigo}</h3>
                    <p>$ ${producto.precio}</p>
                </div>
                <div class="Productos-main-Agregar">
                    <img src="./img/icon/cart plus.svg" alt="" id="${producto.id}" onclick="manejarCarrito(${producto.id})">
                </div>
            </div>
        </div>
        `;
    return cardCreada
}

//----------------------------------------------------CARRITO--------------------------------------------------

let carrito = []

function manejarCarrito(id) {
    estaEnCarrito(id) ? eliminarCarrito(id) : agregarCarrito(id)
}

function estaEnCarrito(id) {
    for (let prod of carrito) {
        if (prod.id == id) {
            return true
        }
    }
    return false
}

function agregarCarrito(id) {
    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    carrito.push(productoSelecFav)

    let cardCar = document.querySelector("#carrito");
    cardCar.innerHTML += crearCardCarrito(productoSelecFav);

    almacenarProductosLocalStorage("localCarrito", carrito)

    contadorCarrito()

}

function eliminarCarrito(id) {
    let index = carrito.findIndex(prodCarrito => prodCarrito.id === id);
    carrito.splice(index, 1)

    let card = document.querySelector(`#car-${id}`)
    card.parentNode.removeChild(card)

    removerProductoLocalStorage("localCarrito")

    almacenarProductosLocalStorage("localCarrito", carrito)

    contadorCarrito()
}

function crearCardCarrito(producto) {
    let cardCreada = `
    <div class="modal-card" id="car-${producto.id}">
        <div class="modal-img">
            <img src="./img/prod/${producto.imagen}" alt="">
        </div>
        <div class="desc-producto">
            <div class="modal-card-desc">
                <h2>${producto.nombre} </h2>
                <h4>${producto.codigo}</h4>
                <h3>$ ${producto.precio}</h3>
            </div>
            <div class="modal-card-accion">
                <img src="./img/icon/trash.svg" alt="" id="${producto.id}" class="trash"
            onclick="eliminarCarrito(${producto.id})">
                <h2>Comprar</h2>
            </div>
        </div>
    </div>
    `;
    return cardCreada
}

function contadorCarrito() {
    let contadorCar = document.getElementById("contador-Cart")
    contadorCar.innerHTML = `${carrito.length}`
}

//---------------------------------------------------FAVORITOS-------------------------------------------------

let favoritos = []

function includesFav(lista, producto) {
    for (const fav of lista) {
        if (fav.id == producto.id) {
            return true
        }
    }
    return false
}

function manejarFavs(id) {
    estaEnFav(id) ? eliminarFavorito(id) : agregarFavorito(id)
}

function estaEnFav(id) {
    for (let prod of favoritos) {
        if (prod.id == id) {
            return true
        }
    }
    return false
}

function agregarFavorito(id) {

    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    favoritos.push(productoSelecFav)

    document.getElementById(productoSelecFav.id).src = "./img/icon/fav black.svg";
    let cardFav = document.querySelector("#modal-contenedor");
    cardFav.innerHTML += crearCardFav(productoSelecFav);

    almacenarProductosLocalStorage("localFavoritos", favoritos)
    contadorFavoritos()
}

function eliminarFavorito(id) {
    let index = favoritos.findIndex(producto => producto.id === id);
    favoritos.splice(index, 1)

    let productoSelecFav = listaProductos.find(producto => producto.id == id)
    document.getElementById(productoSelecFav.id).src = "./img/icon/fav.svg";

    let card = document.querySelector(`#fav-${id}`)
    card.parentNode.removeChild(card)

    removerProductoLocalStorage("localFavoritos")
    almacenarProductosLocalStorage("localFavoritos", favoritos)
    contadorFavoritos()
}

function crearCardFav(producto) {
    let cardCreada = `
    <div class="modal-card" id="fav-${producto.id}">
            <div class="modal-img">
                <img src="./img/prod/${producto.imagen}" alt="">
            </div>
            <div class="desc-producto">
                <div class="modal-card-desc">
                <h2>${producto.nombre} </h2>
                <h4>${producto.codigo}</h4>
                <h3>$ ${producto.precio}</h3>
            </div>
                <div class="modal-card-accion">
                <img src="./img/icon/trash.svg" alt="" id="${producto.id}" class="trash"
                    onclick="eliminarFavorito(${producto.id})">
                    <h2>Comprar</h2>
                </div>
            </div>
        </div>
                `;
    return cardCreada
}

function contadorFavoritos() {
    let contadorFav = document.getElementById("contador-Fav")
    contadorFav.innerHTML = `${favoritos.length}`
}

//-----------------------------------------------------MODAL---------------------------------------------------

// modal fav

var modalFavorito = document.getElementById("modalFav");
var btnModalFavorito = document.getElementById("btn-modal-fav");
var btnCloseModalFavorito = document.getElementsByClassName("modal-cerrar")[0];

btnModalFavorito.onclick = function () {
    modalFavorito.style.display = "flex";
}

btnCloseModalFavorito.onclick = function () {
    modalFavorito.style.display = "none";
}

// modal carrito

var modalCarrito = document.getElementById("modalCarrito");
var btnModalCarrito = document.getElementById("btn-modal-cart");
var btnCloseModalCarrito = document.getElementsByClassName("modal-cerrar2")[0];

btnModalCarrito.onclick = function () {
    modalCarrito.style.display = "flex";
}

btnCloseModalCarrito.onclick = function () {
    modalCarrito.style.display = "none";
}

// -------------------------------------------------FILTROS-------------------------------------------------------

let filtrados = listaProductos

// filtro por tipo

function filtroPorTipo(element, tipo) {
    colorBtnFiltro(element)
    filtrados = listaProductos.filter(producto => producto.tipo == tipo)
    crearCardsMain(filtrados)
}

function filtroPorColor(element, color) {
    colorBtnFiltro(element)
    filtrados = listaProductos.filter(producto => producto.color == color)
    crearCardsMain(filtrados)
}

function filtroTodos(element) {
    filtrados = listaProductos
    colorBtnFiltro(element)
    crearCardsMain(listaProductos)
}

function colorBtnFiltro(element) {
    let botones = document.getElementsByClassName("filtro")

    for (let element of botones) {
        element.style.color = "black"
    }
    element.style.color = "red"
}

// Filtros por costo

function filtroCostoMayor(element) {
    colorBtnFiltro(element)
    let filtradosCosto = filtrados.sort((a, b) => {
        return b.precio - a.precio;
    });
    crearCardsMain(filtradosCosto)
}

function filtroCostoMenor(element) {
    colorBtnFiltro(element)
    let filtradosCosto = filtrados.sort((a, b) => {
        return a.precio - b.precio;
    });
    crearCardsMain(filtradosCosto)
}

//STORAGE

function almacenarProductosLocalStorage(arrayStorage, array) {
    localStorage.setItem(arrayStorage, JSON.stringify(array));
}

function removerProductoLocalStorage(arrayStorage) {
    localStorage.removeItem(arrayStorage)
}

//Favaritos

function traerProductosLocalStorage() {
    let storeList = localStorage.getItem("localFavoritos")
    storeList == null ? localFavoritos = [] : favoritos = JSON.parse(storeList)
}

function pintarFavoritos() {
    let cardFav = document.querySelector("#modal-contenedor");
    favoritos.forEach((productos) => cardFav.innerHTML += crearCardFav(productos))

}

//Carrito

function traerProductosLocalStorageCarrito() {
    let storeListcarrito = localStorage.getItem("localCarrito")
    storeListcarrito == null ? localCarrito = [] : carrito = JSON.parse(storeListcarrito)
}

function pintarCarrito() {
    let cardCar = document.querySelector("#carrito");
    carrito.forEach((productos) => cardCar.innerHTML += crearCardCarrito(productos))

}

function inciarLocalStorage() {
    traerProductosLocalStorage()
    contadorFavoritos()
    pintarFavoritos()

    traerProductosLocalStorageCarrito()
    contadorCarrito()
    pintarCarrito()
}

//----------------------------- MAIN-Inicializar-------------------------------

function main() {
    inciarLocalStorage()
    crearCardsMain(filtrados)
}

main()