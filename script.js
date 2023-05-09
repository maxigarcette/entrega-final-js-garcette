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

console.log ("Bienvenidos al sistema de prestamos 9.12.18")

let montoPrestamo = prompt("Ingrese el monto del prestamo que desea");
let numeroDeCuotas = 0;

while (montoPrestamo != "SALIR"){

    
    numeroDeCuotas = prompt("Ingrese el numero de cuotas en las que desea abonar (1, 3, 6, o 12 cuotas)")
    let totalPrestamo = calculoValorPrestamo(montoPrestamo, numeroDeCuotas);
    let estadoSocio = prompt("Si usted esta subscripto al programa de descuentos ingrese SI, de lo contrario ingrese NO")
    let totalPrestamoConDescuento = totalPrestamo - esSocio(totalPrestamo, estadoSocio);
    let totalInteres = interes(numeroDeCuotas);

    console.log("Prestamo: ", montoPrestamo);
    console.log("Cuotas: ", numeroDeCuotas);
    console.log("Interes: ", totalInteres);

    if (estadoSocio == "NO") {
        console.log("Total del prestamo: ", totalPrestamo);
        console.log("Valor por cuota: ", totalPrestamo/numeroDeCuotas);
    } 
    else if(estadoSocio == "SI"){
        console.log("Total con descuento del 10% para socios: ",totalPrestamoConDescuento);
        console.log("Valor por cuota: ", totalPrestamoConDescuento/numeroDeCuotas);
    }
    
    montoPrestamo = prompt("Ingrese el monto para un nuevo prestamo o ingrese SALIR para finalizar");
}
    

