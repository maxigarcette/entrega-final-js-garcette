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

function calculoValorPrestamo (montoPrestamo, numeroDeCuotas) {
    montoPrestamo = parseFloat (montoPrestamo);
    numeroDeCuotas = parseInt (numeroDeCuotas);
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
}

function esSocio(totalPrestamo, estadoSocio){
    if (estadoSocio == "SI") {
        let descuentoSocio = totalPrestamo * 0.1;
        return descuentoSocio;
    }
    else if (estadoSocio == "NO") {
        return 0;
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
}

console.log ("Bienvenidos al sistema de prestamos 9.12.18");
console.log("");
console.log("<------------------------------------------->");
console.log("");

let montoPrestamo = prompt("Ingrese el monto del prestamo que desea");
let numeroDeCuotas = 0;
let listaDePrestamos = [];
let numeroDePrestamo = 0;

if(montoPrestamo == "SALIR"){
    console.log("Muchas gracias, vuelva prontos");
}

while (montoPrestamo != "SALIR" && montoPrestamo != "VER PRESTAMOS" && montoPrestamo) {

    
    numeroDeCuotas = prompt("Ingrese el numero de cuotas en las que desea abonar (1, 3, 6, o 12 cuotas)")
    let totalPrestamo = calculoValorPrestamo(montoPrestamo, numeroDeCuotas);
    let estadoSocio = prompt("Si usted esta subscripto al programa de descuentos ingrese SI, de lo contrario ingrese NO")
    let totalPrestamoConDescuento = totalPrestamo - esSocio(totalPrestamo, estadoSocio);
    let totalInteres = interes(numeroDeCuotas);
    numeroDePrestamo = numeroDePrestamo + 1;

    console.log("Prestamo: ", montoPrestamo);
    console.log("Cuotas: ", numeroDeCuotas);
    console.log("Interes: ", totalInteres);

    if (estadoSocio == "NO") {
        console.log("Total del prestamo: ", totalPrestamo);
        console.log("Valor por cuota: ", Math.ceil(totalPrestamo/numeroDeCuotas));
        console.log("");
        listaDePrestamos.push(new Prestamo (montoPrestamo, numeroDeCuotas, totalInteres, totalPrestamo, estadoSocio, numeroDePrestamo));
    } 
    else if(estadoSocio == "SI"){
        console.log("Total con descuento del 10% para socios: ",totalPrestamoConDescuento);
        console.log("Valor por cuota: ", Math.ceil(totalPrestamoConDescuento/numeroDeCuotas));
        console.log("");
        listaDePrestamos.push(new Prestamo (montoPrestamo, numeroDeCuotas, totalInteres, totalPrestamoConDescuento, estadoSocio, numeroDePrestamo));
    }

    montoPrestamo = prompt("Ingrese el monto para un nuevo prestamo, VER PRESTAMOS para ver las operaciones anteriores, o ingrese SALIR para finalizar");
    if ( montoPrestamo == "VER PRESTAMOS"){
        for (let prestamo of listaDePrestamos){
            prestamo.getDatos();
        }
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
}