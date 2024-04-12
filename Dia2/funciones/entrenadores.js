
// Import any needed libraries
import * as c from './funciones/campers.js';
import * as cf from './funciones/corefile.js';

function regEntrenadores(campus) {
    const header = `
    *************************************
    *     REGISTRO DE ENTRENADORES      *
    *************************************
    `;
    console.log(header);
    const dataE = campus.campus.entrenadores;
    let valor = "";
    
    const id = c.verificarDato(valor, "Ingrese ID del Trainer : ", dataE);
    const nombre = c.verificarDato(valor, "Ingrese nombre del Trainer : ", dataE);
    const apellido = c.verificarDato(valor, "Ingrese apellidos del Trainer : ", dataE);
    const horario = c.verificarDato(valor, "Ingrese horario del Trainer (Dia o Tarde) : ", dataE);
    
    const entrenador = {
        "NroId" : id,
        "Nombre" : nombre,
        "Apellidos" : apellido,
        "Horario" : horario,
        "RutasAsignadas" : 0
    };

    dataE[entrenador["NroId"]] = entrenador;
    campus.campus.entrenadores = dataE;
    cf.UpdateFile(campus);
}

function entrenadoresCampus(campus) {
    console.log("");
    console.log("LISTADO DE ENTRENADORES");
    console.log("");
    console.log("{:<15} {:<15} {:<20}".format("ID", "NOMBRE", "APELLIDO"));
    console.log("------------------------------------------------------");
    const data = Object.keys(campus.campus.entrenadores);
    for (const i of data) {
        const dataE = campus.campus.entrenadores[i] || -1;
        console.log("{:<15} {:<15} {:<20}".format(dataE["NroId"], dataE["Nombre"], dataE["Apellidos"]));
    }
}

