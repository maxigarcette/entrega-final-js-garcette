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
    getDatos() {
        console.log("<------------datos del prestamo------------>");
        console.log("El monto solicitado es de: ", this.monto);
        console.log("A pagar en: ", this.cuotas, " cuotas");
        console.log("Con un interes del: ", this.interes);
        console.log("El total a pagar es de: ", this.totalConInteres);
        console.log("Socio: ", this.socio);
        console.log("Numero de prestamo: ", this.numeroDePrestamo);
        console.log("");
     
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
        valorPrestamo = montoPrestamo + (montoPrestamo *2.5);
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
    } 
    else if(estadoSocio == "Sí"){
        document.getElementById("totalAPagar").innerHTML = "Total con descuento del 10% para socios: $" + totalAPagarConDescuento;
        document.getElementById("valorPorCuota").innerHTML = "Valor por cuota: $" + Math.ceil(totalAPagarConDescuento/cantidadDeCuotas);
        listaDePrestamos.push(new Prestamo (monto.value, cantidadDeCuotas, intereses, totalAPagarConDescuento, estadoSocio, numeroDePrestamo));
    }
}

/*montoPrestamo = prompt("Ingrese el monto para un nuevo prestamo, VER PRESTAMOS para ver las operaciones anteriores, o ingrese SALIR para finalizar");
if ( montoPrestamo == "VER PRESTAMOS"){
    for (let prestamo of listaDePrestamos){
        prestamo.getDatos();
    }
}
function busquedaDePrestamo (prestamo) {
    return prestamo.numeroDePrestamo == busquedaUsuario;
}
let busquedaUsuario = 0;
let resultadoBusqueda = 0;

let consultaBusqueda = prompt("Quiere buscar un prestamo en particular?")

if(consultaBusqueda == "SI") {
    busquedaUsuario = prompt("Ingrese el numero de prestamo que busca")
    resultadoBusqueda = listaDePrestamos.find (busquedaDePrestamo);
    if (resultadoBusqueda != undefined){
        console.log(resultadoBusqueda);
    }
    else {
        console.log("No se encontro el prestamo numero: ", busquedaUsuario);
    }
}
else if (consultaBusqueda == "NO") {
    console.log("Muchas gracias, vuelva prontos");
}*/