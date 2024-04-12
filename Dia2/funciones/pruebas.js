function verificarNota(valorDato, enunciadoDato, tipoDato) {
    let isIncorrect = true;
    valorDato = 0;
    while (isIncorrect) {
        try {
            valorDato = tipoDato(prompt(`${enunciadoDato}`));
            if (parseInt(valorDato) >= 0 && parseInt(valorDato) <= 100) {
                isIncorrect = false;
            } else if (tipoDato === String && valorDato === "") {
                console.log("El dato no debe estar vacio");
            } else {
                console.log("Ingrese un valor entre 0 y 100");
            }
        } catch (error) {
            console.log("Tipo de dato incorrecto");
        }
    }
    return valorDato;
}
function regPrueba(id, campus) {
    const data = campus.campus.campers[id] || -1;

    if (typeof data === 'object') {
        let valor = 0;
        if (data.Estado === "Inscrito") {
            const notaT = verificarNota(valor, "Ingrese el valor de la nota téorica (0 a 100) : ", parseInt);
            const notaP = verificarNota(valor, "Ingrese el valor de la nota práctica (0 a 100) : ", parseInt);
            const notaTotal = (notaT + notaP) / 2;
            let estado = notaTotal >= 60 ? "Aprobado" : "Desaprobado";
            const prueba = {
                idCamper: id,
                nota: notaTotal,
                estado: estado
            };
            const dataP = campus.campus.pruebas;
            dataP[`${String(Object.keys(dataP).length + 1).padStart(3, '0')}`] = prueba;
            campus.campus.pruebas = dataP;
            data.Estado = estado;
            cf.UpdateFile(campus);
        } else if (data.Estado === "Matriculado") {
            let idModulo = "";
            while (!["1", "2", "3", "4", "5"].includes(idModulo)) {
                idModulo = verificarNota(valor, "Ingrese el id del módulo cuyas pruebas quiere registrar : ", String);
            }
            const notaT = verificarNota(valor, "Ingrese el valor de la nota téorica (0 a 100) : ", parseInt);
            const notaP = verificarNota(valor, "Ingrese el valor de la nota práctica (0 a 100) : ", parseInt);
            const notaQT = verificarNota(valor, "Ingrese el valor de la nota de quices y trabajos (0 a 100) : ", parseInt);
            const notaTotal = (notaT * 0.3) + (notaP * 0.6) + (notaQT * 0.1);
            let estado = notaTotal >= 60 ? "Matriculado" : "En Riesgo";
            const prueba = {
                idCamper: id,
                idModulo: idModulo,
                nota: notaTotal,
                estado: estado
            };
            const dataP = campus.campus.pruebas;
            dataP[`${String(Object.keys(dataP).length + 1).padStart(3, '0')}`] = prueba;
            campus.campus.pruebas = dataP;
            data.Estado = estado;
            cf.UpdateFile(campus);
        } else {
            console.log("El estado del Camper no es Matriculado");
        }
    } else {
        console.log("No se encontró el id");
    }
}

