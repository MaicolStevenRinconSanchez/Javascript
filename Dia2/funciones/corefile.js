
const fs = require('fs');

let MY_DATABASE = "";

function UpdateFile(...param) {
    fs.writeFileSync(MY_DATABASE, JSON.stringify(param[0], null, 4));
}

function AddData(...param) {
    let data_file = JSON.parse(fs.readFileSync(MY_DATABASE, 'utf8'));
    if (param.length > 1) {
        data_file[param[0]] = param[1];
    } else {
        data_file[param[0]] = {};
    }
    fs.writeFileSync(MY_DATABASE, JSON.stringify(data_file, null, 4));
}

function Eliminar(...param) {
    let data = [...param];
    delete data[1][data[0]];
    UpdateFile(data[1]);
}

function ReadFile() {
    return JSON.parse(fs.readFileSync(MY_DATABASE, 'utf8'));
}

function checkFile(...param) {
    let data = [...param];
    if (fs.existsSync(MY_DATABASE)) {
        if (param.length) {
            data[0] = { ...data[0], ...ReadFile() };
        }
    } else {
        if (param.length) {
            UpdateFile(data[0]);
        }
    }
}

