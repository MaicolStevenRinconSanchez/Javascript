import * as mainModule from './funciones/main.js';

const fs = require('fs');
const mainModule = require('./main');
const routes = require('./funciones/rutas');
const campers = require('./funciones/campers');
const trainers = require('./funciones/entrenadores');

const menuPrincipal = ["Registrar Camper", "Registrar Prueba", "Registro Áreas de Entrenamiento", "Registro Entrenadores", "Creación Rutas de Entrenamiento", "Gestor de Matrículas", "Módulo de Reportes", "Salir"];
const menuReporte = ["Campers Inscritos", "Campers Aprobados", "Entrenadores de Campus", "Campers con bajo rendimiento", "Buscar Ruta de Entrenamiento", "Resumen de Módulos", "Volver"];

function mostrarMenuPrincipal() {
  campers.cf.checkFile(mainModule.campus);
  const header = `
*************************************
* SEGUIMIENTO ACADÉMICO CAMPUSLANDS *
*************************************
`;
  console.log(header);
  for (let i = 0; i < menuPrincipal.length; i++) {
    console.log(`${i+1} - ${menuPrincipal[i]}`);
  }
}

function mostrarMenuReporte() {
  const header = `
*************************************
*        MÓDULO DE REPORTES         *
*************************************
`;

  let isIncorrecto = true;
  let opMenu = 0;
  while (isIncorrecto) {
    console.clear();
    console.log(header);
    for (let i = 0; i < menuReporte.length; i++) {
      console.log(`${i+1} - ${menuReporte[i]}`);
    }
    try {
      opMenu = parseInt(input("Ingrese una opción : "));
    } catch (e) {
      console.log("Tipo de dato incorrecto");
    }
    if (opMenu === 1) {
      console.clear();
      campers.campersInscritos(mainModule.campus);
    } else if (opMenu === 2) {
      console.clear();
      campers.campersAprobados(mainModule.campus);
    } else if (opMenu === 3) {
      console.clear();
      trainers.entrenadoresCampus(mainModule.campus);
    } else if (opMenu === 4) {
      console.clear();
      campers.campersBajoRendimiento(mainModule.campus);
    } else if (opMenu === 5) {
      console.clear();
      const idRuta = routes.buscarRuta(mainModule.campus);
      routes.mostrarRuta(idRuta, mainModule.campus);
    } else if (opMenu === 6) {
      console.clear();
    } else if (opMenu === 7) {
      isIncorrecto = false;
    }
  }
}

