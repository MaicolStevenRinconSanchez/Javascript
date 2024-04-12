import * as cf from './funciones/corefile.js';
import * as r from './funciones/rutas.js';


cf.MY_DATABASE='data/campus.json'
let isEmpty = true

function verificarDato(valorDato, enunciadoDato, data) {
    isEmpty = true
    valorDato = ""

    while (isEmpty) {
        valorDato = prompt(`${enunciadoDato}`)
        if (valorDato !== "") {
            if (enunciadoDato === "Ingrese ID del Camper : ") {
                let dataId = data[valorDato] || -1
                if (typeof dataId === 'object') {
                    console.log(`El ID ya se encuentra registrado`)
                } else {
                    isEmpty = false
                }
            } else if (enunciadoDato === "Ingrese el id del trainer : ") {
                let dataId = data[valorDato] || -1
                if (typeof dataId !== 'object') {
                    console.log(`El entrenador no se encuentra registrado`)
                } else {
                    isEmpty = false
                }
            } else if (enunciadoDato === "Ingrese el id de la ruta : " || enunciadoDato === "Ingrese el id de la ruta asociada con el Trainer : ") {
                let dataId = data[valorDato] || -1
                if (typeof dataId !== 'object') {
                    console.log(`La ruta no se encuentra registrada`)
                } else {
                    isEmpty = false
                }
            } else if (enunciadoDato === "Ingrese el id del salón : ") {
                let dataId = data[valorDato] || -1
                if (typeof dataId !== 'object') {
                    console.log(`El salón no se encuentra registrado`)
                } else {
                    isEmpty = false
                }
            } else if (enunciadoDato === "Ingrese ID del Trainer : ") {
                let dataId = data[valorDato] || -1
                if (typeof dataId === 'object') {
                    console.log(`El ID ya se encuentra registrado`)
                } else {
                    isEmpty = false
                }
            } else {
                isEmpty = false
            }
        } else {
            console.log(`El dato no puede estar vacio`)
        }
    }

    return valorDato
}

function regCamper(campus) {
    let header = `
    *************************************
    *       REGISTRO DE CAMPERS         *
    *************************************
    `
    console.log(header)
    let data = campus.campus.campers
    let valor = ""

    console.log(``)
    console.log(`DATOS DEL CAMPER`)
    console.log(``)
    let id = verificarDato(valor, "Ingrese ID del Camper : ", data)
    let nombre = verificarDato(valor, "Ingrese nombre del Camper : ", data)
    let apellido = verificarDato(valor, "Ingrese apellidos del Camper : ", data)
    let direccion = verificarDato(valor, "Ingrese direccion del Camper : ", data)
    let nroTelCel = verificarDato(valor, "Ingrese teléfono celular del Camper : ", data)
    let nroTelFijo = verificarDato(valor, "Ingrese teléfono fijo del Camper : ", data)
    let ubicacionTelFijo = verificarDato(valor, "Ingrese si el teléfono pertenece a Casa o Trabajo : ", data)

    console.log(``)
    console.log(`DATOS DEL ACUDIENTE`)
    console.log(``)
    let idAcudiente = verificarDato(valor, "Ingrese ID del acudiente del Camper : ", data)
    let nroTelAcudiente = verificarDato(valor, "Ingrese número de teléfono del acudiente del Camper : ", data)
    let nombreAcudiente = verificarDato(valor, "Ingrese nombre del acudiente del Camper : ", data)
    let emailAcudiente = verificarDato(valor, "Ingrese email del acudiente del Camper : ", data)

    let camper = {
        "NroId" : id,
        "Nombre" : nombre,
        "Apellido" : apellido,
        "Direccion" : direccion,
        "Acudiente" : {},
        "Telecontacto" : {},
        "Estado" : "Inscrito",
    }

    let acudiente = {
        "id" : idAcudiente,
        "nrotel" : nroTelAcudiente,
        "nombre" : nombreAcudiente,
        "email" : emailAcudiente
    }

    let phoneCel = {
        "id" : String(Object.keys(camper.Telecontacto).length + 1),
        "nrotel" : nroTelCel,
        "ubicacion" : ""
    }

    let phoneFijo = {
        "id" : String(Object.keys(camper.Telecontacto).length + 1),
        "nrotel" : nroTelFijo,
        "ubicacion" : ubicacionTelFijo
    }

    camper.Acudiente[String(Object.keys(camper.Acudiente).length + 1).padStart(3, '0')] = acudiente
    camper.Telecontacto[String(Object.keys(camper.Telecontacto).length + 1).padStart(3, '0')] = phoneCel
    camper.Telecontacto[String(Object.keys(camper.Telecontacto).length + 1).padStart(3, '0')] = phoneFijo
    data[camper.NroId] = camper
    campus.campus.campers = data
    cf.UpdateFile(campus)
}

function buscarCamper(idCamper, campus) {
    let data = campus.campus.campers[idCamper] || -1
    if (typeof data !== 'object') {
        console.log(`No se encontró un Camper con este código`)
        return {}
    } else {
        return data
    }
}

function matricularCamper(campus) {
    let header = `
    *************************************
    *       MATRÍCULA DE CAMPERS        *
    *************************************
    `
    console.log(header)
    let dataR = campus.campus.rutas
    let dataS = campus.campus.salones
    let id = ""

    while(id === "") {
        id = prompt(`Ingrese el id del Camper que desea matricular : `)
    }
    let camper = buscarCamper(id, campus)
    
    if (camper && camper.Estado === "Aprobado") {

        let valor = 0
        r.imprimirRutas(campus)
        let idRuta = verificarDato(valor, "Ingrese el id de la ruta : ", dataR)
        let idSalon = dataR[idRuta].IdSalon
        let idTrainer = dataR[idRuta].IdTrainer
        if (dataS[idSalon].capacidad === 33) {
            console.log(`No se pueden agregar más Campers a esta ruta`)
        } else {
            let fechaInicio = verificarDato(valor, "Ingrese la fecha de inicio : ", camper)
            let fechaFinal = verificarDato(valor, "Ingrese la fecha final : ", camper)
            camper.Estado = "Matriculado"
            camper.idRuta = idRuta
            camper.idSalon = idSalon
            camper.idTrainer = idTrainer
            camper.fechaInicio = fechaInicio
            camper.fechaFinal = fechaFinal
            dataS[idSalon].capacidad = dataS[idSalon].capacidad + 1
            cf.UpdateFile(campus)
            console.log(``)
            console.log(`MATRICULA EXITOSA`)
            console.log(``)
        }
    } else {
        console.log(`No se puede matricular`)
    }
}

function campersInscritos(campus) {
    let data = Object.keys(campus.campus.campers)
    if (data.length > 0) {
        console.log(``)
        console.log(`LISTADO DE CAMPERS INSCRITOS`)
        console.log(``)
        console.log("{:<15} {:<15} {:<20}".format("ID", "NOMBRE", "APELLIDO"))
        console.log(`------------------------------------------------------`)
        for (let i of data) {
            let dataC = campus.campus.campers[i] || -1
            if (dataC.Estado === "Inscrito") {
                console.log("{:<15} {:<15} {:<20}".format(dataC.NroId, dataC.Nombre, dataC.Apellido))
            }
        }
    } else {
        console.log(`No existen Campers con el estado inscrito`)
    }
}

function campersAprobados(campus) {
    let data = Object.keys(campus.campus.campers)
    if (data.length > 0) {
        console.log(``)
        console.log(`LISTADO DE CAMPERS APROBADOS`)
        console.log(``)
        console.log("{:<15} {:<15} {:<20}".format("ID", "NOMBRE", "APELLIDO"))
        console.log(`------------------------------------------------------`)
        for (let i of data) {
            let dataC = campus.campus.campers[i] || -1
            if (dataC.Estado === "Aprobado") {
                console.log("{:<15} {:<15} {:<20}".format(dataC.NroId, dataC.Nombre, dataC.Apellido))
            }
        }
    } else {
        console.log(`No existen Campers con el estado aprobado`)
    }
}

function campersBajoRendimiento(campus) {
    console.log(``)
    console.log(`LISTADO DE CAMPERS CON BAJO RENDIMIENTO`)
    console.log(``)
    console.log("{:<15} {:<15} {:<20}".format("ID", "NOMBRE", "APELLIDO"))
    console.log(`------------------------------------------------------`)
    let data = Object.keys(campus.campus.campers)
    for (let i of data) {
        let dataC = campus.campus.campers[i] || -1
        if (dataC.Estado === "En Riesgo") {
            console.log("{:<15} {:<15} {:<20}".format(dataC.NroId, dataC.Nombre, dataC.Apellido))
        }
    }
}

