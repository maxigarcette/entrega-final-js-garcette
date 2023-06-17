let listaDePrestamos = [];
let numeroDePrestamo = 0;

class Prestamo {
    constructor (monto, cuotas, interes, totalConInteres, socio, numeroDePrestamo) {
        this.monto = monto;
        this.cuotas = cuotas;
        this.interes = interes;
        this.totalConInteres = totalConInteres;
        this.socio = socio;
        this.numeroDePrestamo = numeroDePrestamo;
    }
}

function esSocio(totalPrestamo, estadoSocio){
    if (estadoSocio == "Sí") {
        let descuentoSocio = totalPrestamo * 0.1;
        return descuentoSocio;
    }
    else if (estadoSocio == "No") {
        return 0;
    }

}

function calculoValorPrestamo (montoPrestamo, numeroDeCuotas) {
    montoPrestamo = parseFloat (montoPrestamo);
    let valorPrestamo = 0;
    if (numeroDeCuotas == 1 && montoPrestamo > 0) {
        valorPrestamo = montoPrestamo + (montoPrestamo *0.1);
        return valorPrestamo;
    }
    else if (numeroDeCuotas == 3 && montoPrestamo > 0) {
        valorPrestamo = montoPrestamo + (montoPrestamo *0.25);
        return valorPrestamo;
    }
    else if (numeroDeCuotas == 6 && montoPrestamo > 0) {
        valorPrestamo = montoPrestamo + (montoPrestamo *0.6);
        return valorPrestamo;
    }
    else if (numeroDeCuotas == 12 && montoPrestamo > 0) {
        valorPrestamo = montoPrestamo + (montoPrestamo *0.95);
        return valorPrestamo;
    }
    else if (numeroDeCuotas == 24 && montoPrestamo > 0) {
        valorPrestamo = montoPrestamo + (montoPrestamo *2);
        return valorPrestamo;
    }
}

function interes(numeroDeCuotas){
    if (numeroDeCuotas == 1) {
        return "10%";
    }
    else if (numeroDeCuotas == 3) {
        return "25%";
    }
    else if (numeroDeCuotas == 6) {
        return "60%";
    }
    else if (numeroDeCuotas == 12) {
        return "95%";
    }
    else if (numeroDeCuotas == 24) {
        return "200%";
    }
}

let btnSimular = document.getElementById("botonSimular");

btnSimular.addEventListener("click", crearPrestamo);

function crearPrestamo() {

    let monto = document.getElementById("montoDelPrestamo");
    let indiceCuotas = document.getElementById("cantidadDeCuotas");
    let estadoSocio = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    let cantidadDeCuotas = indiceCuotas.value;
    numeroDePrestamo++;

    if(cantidadDeCuotas == 1){
        cantidadDeCuotas = 1;
    }
    else if (cantidadDeCuotas == 2){
        cantidadDeCuotas = 3;
    }
    else if (cantidadDeCuotas == 3){
        cantidadDeCuotas = 6;
    }
    else if (cantidadDeCuotas == 4){
        cantidadDeCuotas = 12;
    }
    else if (cantidadDeCuotas == 5){
        cantidadDeCuotas = 24;
    }

    let totalAPagar = calculoValorPrestamo(monto.value , cantidadDeCuotas)
    let totalAPagarConDescuento = totalAPagar - esSocio(totalAPagar, estadoSocio);
    let intereses = interes(cantidadDeCuotas);


    document.getElementById("totalPedido").innerHTML = "El prestamo solicitado es de: $" + monto.value;
    document.getElementById("cuotasPedidas").innerHTML = "En " + cantidadDeCuotas + " cuotas";
    document.getElementById("interesCuotas").innerHTML = "Con un interés del: " + intereses;
    document.getElementById("numeroDePrestamoDiv").innerHTML = "Préstamo numero: " + numeroDePrestamo;

    if (estadoSocio == "No") {
        document.getElementById("totalAPagar").innerHTML = "Total del prestamo: $" + totalAPagar;
        document.getElementById("valorPorCuota").innerHTML = "Valor por cuota: $" + Math.ceil(totalAPagar/cantidadDeCuotas);
        listaDePrestamos.push(new Prestamo (monto.value, cantidadDeCuotas, intereses, totalAPagar, estadoSocio, numeroDePrestamo));
        localStorage.setItem("listaDePrestamos" , JSON.stringify(listaDePrestamos));
    } 
    else if(estadoSocio == "Sí"){
        document.getElementById("totalAPagar").innerHTML = "Total con descuento del 10% para socios: $" + totalAPagarConDescuento;
        document.getElementById("valorPorCuota").innerHTML = "Valor por cuota: $" + Math.ceil(totalAPagarConDescuento/cantidadDeCuotas);
        listaDePrestamos.push(new Prestamo (monto.value, cantidadDeCuotas, intereses, totalAPagarConDescuento, estadoSocio, numeroDePrestamo));
        localStorage.setItem("listaDePrestamos" , JSON.stringify(listaDePrestamos));
    }
}

function busquedaDePrestamo (prestamo) {
    return prestamo.numeroDePrestamo == busquedaUsuario;
}

let busquedaUsuario = 0;
let resultadoBusqueda = 0;
let btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", buscarPrestamo);

function buscarPrestamo(){

    busquedaUsuario = document.getElementById("inputBuscarPrestamo").value;
    resultadoBusqueda = listaDePrestamos.find (busquedaDePrestamo);
    if (resultadoBusqueda != undefined){
        document.getElementById("totalPedidoBusqueda").innerHTML = "El prestamo solicitado es de: $" + resultadoBusqueda.monto;
        document.getElementById("cuotasPedidasBusqueda").innerHTML = "En " + resultadoBusqueda.cuotas + " cuotas";
        document.getElementById("interesCuotasBusqueda").innerHTML = "Con un interés del: " + resultadoBusqueda.interes;
        document.getElementById("esSocioBusqueda").innerHTML = "Es socio?: " + resultadoBusqueda.socio;
        document.getElementById("numeroDePrestamoDivBusqueda").innerHTML = "Préstamo numero: " + resultadoBusqueda.numeroDePrestamo;
        document.getElementById("totalAPagarBusqueda").innerHTML = "Total del prestamo: $" + resultadoBusqueda.totalConInteres;
        document.getElementById("valorPorCuotaBusqueda").innerHTML = "Valor por cuota: $" + Math.ceil(resultadoBusqueda.totalConInteres/resultadoBusqueda.cuotas);
    }
    else {
        document.getElementById("totalPedidoBusqueda").innerHTML = "No se encontro el prestamo numero: " + busquedaUsuario;
        document.getElementById("cuotasPedidasBusqueda").innerHTML = "";
        document.getElementById("interesCuotasBusqueda").innerHTML = "";
        document.getElementById("numeroDePrestamoDivBusqueda").innerHTML = "";
        document.getElementById("totalAPagarBusqueda").innerHTML = "";
        document.getElementById("valorPorCuotaBusqueda").innerHTML = "";
        document.getElementById("esSocioBusqueda").innerHTML = "";
    }
}

let btnBuscarTodo = document.getElementById("btnBuscarTodo");
btnBuscarTodo.addEventListener("click", imprimirPrestamos);

function imprimirPrestamos(){

    let cardsCointainer = document.getElementById("cardsBody");
    let buscarTodosContainer = document.getElementById("buscarTodos");

    let busquedaTitulo = document.createElement("h2");
    busquedaTitulo.innerText = "Su búsqueda";
    buscarTodosContainer.append(busquedaTitulo);

    let listaDePrestamosStorage = JSON.parse(localStorage.getItem("listaDePrestamos"));

    for (let prestamo of listaDePrestamosStorage){
        let div = document.createElement("div");
        div.innerHTML = `<h4>Préstamo número: ${prestamo.numeroDePrestamo}</h4>
                        <p>El prestamo solicitado es de: <br> $ ${prestamo.monto}</p>
                        <p>En ${prestamo.cuotas} cuotas</p>
                        <p>Con un interés del ${prestamo.interes}</p>
                        <p>Es socio? ${prestamo.socio}</p>
                        <p>Total del préstamo: $ ${prestamo.totalConInteres}</p>
                        <p>Valor por cuota: $ ${Math.ceil(prestamo.totalConInteres/prestamo.cuotas)}</p>`;
        cardsCointainer.append(div);    
    }   
}

let btnCerrar = document.getElementById("btnCerrar");
btnCerrar.addEventListener("click", cerrarVentana);

function cerrarVentana() {
    let ventana = document.getElementById("datosBusqueda");
    let ventanaDos = document.getElementById("buscarTodos");

    ventana.remove();
    ventanaDos.remove();
}