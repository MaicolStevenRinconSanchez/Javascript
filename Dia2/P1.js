let usuario = {
    nombre: "",
    email: "dfsdfdsfdsf",
    edad:"34" ,
    telefono:"i"    
}

document.getElementById("datos").innerHTML = usuario['telefono'];
usuario.telefono ="dsfsdfds"
document.getElementById("datos2").innerHTML = usuario.telefono;

console.log(usuario)

let texto = '{"empleado" : ['+
'{"nombre":"Marko roble","edad":"20",}'+
'{"nombre":Antonio '