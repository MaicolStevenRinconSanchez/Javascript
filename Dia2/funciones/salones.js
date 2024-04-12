
// Import any needed libraries
import * as cf from 'funciones/corefile';

let isEmpty = true;

function verificarDato(valorDato, enunciadoDato, data) {
    isEmpty = true;
    valorDato = "";
    while (isEmpty) {
        valorDato = prompt(`${enunciadoDato}`);
        if (valorDato !== "") {
            if (enunciadoDato === "Ingrese el ID del salón : ") {
                const dataId = data.get(valorDato) || -1;
                if (typeof dataId === 'object') {
                    console.log("El ID ya se encuentra registrado");
                } else {
                    isEmpty = false;
                }
            } else {
                isEmpty = false;
            }
        } else {
            console.log("El dato no puede estar vacio");
        }
    }
    return valorDato;
}

function regSalones(campus) {
    const header = `
    *************************************
    *       REGISTRO DE SALONES         *
    *************************************
    `;
    console.log(header);
    const data = campus.campus.salones;
    let valor = 0;

    const id = verificarDato(valor, "Ingrese el ID del salón : ", data);
    const nombre = verificarDato(valor, "Ingrese el nombre del salón : ", data);

    const salon = {
        id: id,
        nombre: nombre,
        capacidad: 0
    };

    data[salon.id] = salon;
    campus.campus.salones = data;
    cf.UpdateFile(campus);
}

function buscarSalon(campus) {
    const idSalon = prompt("Ingrese el id del salón asignado : ");
    const data = campus.campus.salones[idSalon] || -1;
    if (typeof data === 'object') {
        return idSalon;
    } else {
        console.log("No existe un salón con este código");
        return "";
    }
}

