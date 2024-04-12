
import * as s from './funciones/salones.js';
import * as p from './funciones/pruebas.js';
import * as c from './funciones/campers.js';
import * as cf from './funciones/corefile.js';

const listaModulos = ["Fundamentos de programacion", "Programacion Web", "Programacion Formal", "Bases de Datos", "Backend"];

function crearRuta(campus) {
    const header = `
    *************************************
    *        CREACIÓN DE RUTAS          *
    *************************************
    `;
    console.log(header);
    let isIncomplete = true;
    const dataR = campus.campus.rutas;
    const dataE = campus.campus.entrenadores;
    let nombre = "";
    let valor = 0;

    while (nombre === "") {
        nombre = prompt(`Ingrese el nombre de la ruta : `);
    }
    const idSalon = s.buscarSalon(campus);
    if (idSalon !== "") {
        const idTrainer = c.verificarDato(valor, "Ingrese el id del trainer : ", dataE);
        if (dataE[idTrainer]["RutasAsignadas"] < 2) {
            const ruta = {
                "NroId": String(Object.keys(campus.campus.rutas).length + 1),
                "Nombre": nombre,
                "modulos": {},
                "IdSalon": idSalon,
                "IdTrainer": idTrainer
            };
            for (let i = 0; i < listaModulos.length; i++) {
                const item = listaModulos[i];
                const modulo = {
                    "Id": String(i + 1),
                    "Nombre": item,
                    "Temas": []
                };
                console.log("");
                console.log(`Módulo ${item.toUpperCase()}`);
                console.log("");
                valor = 0;
                let rta = 2;
                let j = 1;
                while (j <= rta) {
                    const tema = prompt(`Ingrese el nombre del tema correspondiente al módulo : `);
                    if (tema !== "") {
                        modulo["Temas"].push(tema);
                        j++;
                    } else {
                        console.log(`El tema no puede estar vacio`);
                    }
                }
                ruta["modulos"][modulo["Id"]] = modulo;
            }
            dataR[ruta["NroId"]] = ruta;
            dataE[idTrainer]["RutasAsignadas"] = dataE[idTrainer]["RutasAsignadas"] + 1;
            campus.campus.rutas = dataR;
            campus.campus.entrenadores = dataE;
            cf.UpdateFile(campus);
        } else {
            console.log(`No se le pueden asignar más rutas a este Trainer`);
        }
    } else {
        console.log(`No se puede crear una ruta sin un salón`);
    }
}

function buscarRuta(campus) {
    let idRuta = "";
    while (idRuta === "") {
        idRuta = prompt(`Ingrese el id de la ruta : `);
    }
    const data = campus.campus.rutas[idRuta] || -1;
    if (typeof data === 'object') {
        return idRuta;
    } else {
        console.log(`No existe una ruta con este código`);
        return "";
    }
}

function mostrarRuta(idRuta, campus) {
    console.log("");
    console.log("RUTA");
    console.log("");
    const dataR = campus.campus.rutas[idRuta] || -1;
    const dataC = Object.keys(campus.campus.campers);
    const dataE = campus.campus.entrenadores[dataR["IdTrainer"]] || -1;
    console.log("\tCAMPERS");
    console.log("{:<15} {:<15} {:<20}".format("ID", "NOMBRE", "APELLIDO"));
    for (const i of dataC) {
        const data = campus.campus.campers[i] || -1;
        if (("idRuta" in data) && data["idRuta"] === idRuta) {
            console.log("{:<15} {:<15} {:<20}".format(data["NroId"], data["Nombre"], data["Apellido"]));
        }
    }
    console.log("");
    console.log("\tENTRENADOR");
    console.log("{:<15} {:<15} {:<20}".format("ID", "NOMBRE", "APELLIDO"));
    console.log("{:<15} {:<15} {:<20}".format(dataE["NroId"], dataE["Nombre"], dataE["Apellidos"]));
}

function imprimirRutas(campus) {
    const dataR = Object.keys(campus.campus.rutas);
    console.log("");
    console.log("{:<15} {:<15}".format("ID", "NOMBRE RUTA"));
    console.log("");
    for (const i of dataR) {
        const data = campus.campus.rutas[i] || -1;
        console.log("{:<15} {:<15}".format(data["NroId"], data["Nombre"]));
    }
}

