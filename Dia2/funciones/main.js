
// Import any needed libraries
const os = require('os');
const m = require('./ui/menus');
const r = require('./funciones/rutas');
const c = require('./funciones/campers');
const p = require('./funciones/pruebas');
const s = require('./funciones/salones');
const e = require('./funciones/entrenadores');

const campus = {
    "campus": {
        "campers": {},
        "rutas": {},
        "pruebas": {},
        "salones": {},
        "entrenadores": {}
    }
};

if (true) {
    let isActiveApp = true;
    let opMainMenu = 0;
    const header = `
    *************************************
    *       REGISTRO DE PRUEBAS         *
    *************************************
    `;
    while (isActiveApp) {
        os.system("cls");
        m.mostrarMenu();
        try {
            opMainMenu = parseInt(prompt("Ingrese una opción : "));
            if (opMainMenu === 1) {
                os.system("cls");
                c.regCamper(campus);
            } else if (opMainMenu === 2) {
                os.system("cls");
                if (Object.keys(campus.campus.salones).length === 0 && Object.keys(campus.campus.rutas).length === 0) {
                    console.log("No se pueden registrar pruebas hasta que se registren salones y rutas");
                    os.system("pause");
                } else {
                    console.log(header);
                    let id = "";
                    while (id === "") {
                        id = prompt("Ingrese el id del Camper que desea registrar la prueba : ");
                    }
                    p.regPrueba(id, campus);
                }
            } else if (opMainMenu === 3) {
                os.system("cls");
                if (Object.keys(campus.campus.salones).length === 3) {
                    console.log("No es posible registrar más salones");
                } else {
                    s.regSalones(campus);
                }
            } else if (opMainMenu === 4) {
                os.system("cls");
                e.regEntrenadores(campus);
            } else if (opMainMenu === 5) {
                os.system("cls");
                if (Object.keys(campus.campus.entrenadores).length === 0) {
                    console.log("No se pueden registrar rutas hasta que se registre al menos un entrenador");
                } else {
                    r.crearRuta(campus);
                }
            } else if (opMainMenu === 6) {
                os.system("cls");
                c.matricularCamper(campus);
            } else if (opMainMenu === 7) {
                os.system("cls");
                m.mostrarMenuR();
            } else if (opMainMenu === 8) {
                console.log("GRACIAS POR USAR NUESTRO SERVICIO");
                isActiveApp = false;
            }
        } catch (error) {
            console.log("Tipo de dato incorrecto");
        }
        os.system("pause");
    }
}


