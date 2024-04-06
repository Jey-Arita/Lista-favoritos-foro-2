const produtosFavorito = document.querySelector('.anexos')
const listaProductos = document.querySelector('.list-fav')

let articulos = [];
articulos = JSON.parse(localStorage.getItem('articulos')) || [];
cargarEventos();

function cargarEventos(){
    listaProductos.addEventListener('click', agregarFavorito);
    produtosFavorito.addEventListener('click', eliminarArticulo);
    favoritosHtml();
}

function agregarFavorito(e) {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        const productoSeleccionado = e.target.parentElement;
        leerDatosProducto(productoSeleccionado);
        
    }
}

function eliminarArticulo(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const filaArticulo = e.target.closest('TR');
        const nombreArticulo = filaArticulo.querySelector('.listado').textContent;
        articulos = articulos.filter(articulo => articulo !== nombreArticulo);
        localStorage.setItem('articulos', JSON.stringify(articulos));
        favoritosHtml();
    }
}
function leerDatosProducto(e){
    const nombre = e.querySelector('h1').textContent;
    articulos.push(nombre);
    localStorage.setItem('articulos', JSON.stringify(articulos));
    favoritosHtml();
}

function favoritosHtml() {
    limpiarHtml();
    articulos.forEach((nombre) => {
        const row = document.createElement('TR');
        row.innerHTML = `
        <td class="listado">${nombre}</td>
        <td><a href="#" class="borrar-curso"">X</a></td>
        `
        produtosFavorito.appendChild(row);
    });
}

function limpiarHtml() {
    while (produtosFavorito.firstChild) {
        produtosFavorito.removeChild(produtosFavorito.firstChild);
    }
}