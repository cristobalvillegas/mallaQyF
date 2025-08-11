
let ramo_pasado = document.createElement("class");
ramo_pasado.className = "ramo-pasado";

let ramos = document.querySelectorAll("button");
function Guardar_datos(){
    estado = [];
    for (i = 0; i < ramos.length; i++){
        estado.push(ramos[i].className);
    }
    window.localStorage.setItem("ramos",JSON.stringify(estado));
    window.localStorage.setItem("requisitos-bloqueados",JSON.stringify(lista_requisitos));
    window.localStorage.setItem("requisitos-desbloqueados",JSON.stringify(lista_requisitos_desbloqueados));
}
function Cargar_Datos(){
    datos = JSON.parse(localStorage.getItem("ramos"));
    requisitos = JSON.parse(localStorage.getItem("requisitos-bloqueados"));
    requisitos_desbloqueados = JSON.parse(localStorage.getItem("requisitos-desbloqueados"));
    if (requisitos) {
        lista_requisitos = requisitos;
    }
    if (requisitos_desbloqueados) {
        lista_requisitos_desbloqueados = requisitos_desbloqueados;
    }
    if (datos) {
        console.log(ramos);
        console.log(datos);
        for (i = 0; i < ramos.length; i++){
            console.log(ramos[i]);
            ramos[i].className = datos[i];
        }
    }
}

let ramos_no_pasados = document.getElementsByClassName("ramo");
let ramos_bloqueados = document.getElementsByClassName("ramo-bloqueado");
let ramos_pasados = document.getElementsByClassName("ramo-pasado");

lista_requisitos = [
    ["Química General I","Química General II"],
    ["Química General II","Química Orgánica"],
    ["Química General II","Bioquímica"],
    ["Química Orgánica","Química Analítica"],
    ["Bioquímica","Fisicoquímica"],
    ["Matemáticas","Cálculo"],
    ["Matemáticas","Física"],
    ["Física","Fisicoquímica"],
    ["Biología Celular","Biología Molecular"],
    ["Biología Molecular","Bioquímica"],
    ["Bioquímica","Fisicoquímica"],
    ["Biología Molecular","Microbiología e Inmunología"],
    ["Biología Molecular","Bioética"],
    ["Microbiología e Inmunología","Fisiología"],
    ["Bioética","Bioestadística"],
    ["Fisiología","Fisiopatología"],
    ["Fisiología","Salud Pública y Epidemiología"],
    ["Comunicación Oral / Escrita","Lectura Crítica / Pensamiento Crítico"],
    ["Química y Farmacia: Rol del Profesional","Trabajo en Equipos Interdisciplinarios de Salud"],
    ["Trabajo en Equipos Interdisciplinarios de Salud","Farmacología General"],
    ["Trabajo en Equipos Interdisciplinarios de Salud","Química Farmacéutica I"],
    ["Química Analítica","Química Farmacéutica I"],
    ["Fisicoquímica","Farmacología General"],
    ["Bioestadística","Inteligencia y Gestion de Datos"],
    ["Salud Pública y Epidemiología","Economía de la Salud"],
    ["Inteligencia y Gestion de Datos","Economía de la Salud"],
    ["Inteligencia y Gestion de Datos","Innovación y Tecnología Farmacéutica"],
    ["Fundamentos de la Investigación","Metodología de la Investigación"],
    ["Química Farmacéutica I","Química Farmacéutica II"],
    ["Farmacología General","Botánica y Farmacognosia"],
    ["Metodología de la Investigación","Diseños de Proyectos de Investigación"],
    ["Química Farmacéutica II","Farmacología Clínica I"],
    ["Farmacología General","Farmacología Clínica I"],
    ["Economía de la Salud","Emprendimiento y Gestión de Farmacias Comunitarias"],
    ["Economía de la Salud","Legislación Farmacéutica"],
    ["Electivo I","Electivo II"],
    ["Botánica y Farmacognosia","Toxicología"],
    ["Botánica y Farmacognosia","Tecnología Farmacéutica y Cosmética"],
    ["Química Farmacéutica II","Tecnología Farmacéutica y Cosmética"],
    ["Farmacología Clínica I","Farmacología Clínica II"],
    ["Legislación Farmacéutica","Control de Calidad"],
    ["Toxicología","Farmacogenómica"],
    ["Tecnología Farmacéutica y Cosmética","Taller de Simulación Centrada en el Paciente"],
    ["Bioestadística","Fundamentos de la Investigación"],
    ["Diseños de Proyectos de Investigación","Ejecución Proyecto de Investigación"],
    ["Emprendimiento y Gestión de Farmacias Comunitarias","Farmacia Clínica y Atención Farmacéutica"],
    ["Emprendimiento y Gestión de Farmacias Comunitarias","Marketing Farmacéutico y Comunicación Estratégica"]
];
let lista_requisitos_desbloqueados = [];
Cargar_Datos();
for (i = 0; i < ramos.length;i++){
    if (ramos[i].className == "ramo") {
        ramos[i].addEventListener("click",Desbloquea_ramo);
    }
    if (ramos[i].className == "ramo-pasado") {
        ramos[i].addEventListener("click",Bloquear_ramo);
    }
}
function Desbloquea_ramo(e){
    let ramo = e.target;
    ramo.className = "ramo-pasado";
    ramo.removeEventListener("click",Desbloquea_ramo);
    ramo.addEventListener("click",Bloquear_ramo);
    for (let i = 0; i < lista_requisitos.length; i++) {
        let contador = 0;
        if (ramo.innerHTML == lista_requisitos[i][0]) {
            ramo_desbloqueado = lista_requisitos[i][1];
            lista_requisitos_desbloqueados.push(lista_requisitos[i]);
            lista_requisitos.splice(i,1);
            i = i - 1;
            for (x = 0; x < lista_requisitos.length; x++) { 
                if (ramo_desbloqueado == lista_requisitos[x][1]){
                    contador = contador + 1;
                }
            }
            if (contador == 0){
                for (n = 0; n < ramos_bloqueados.length; n++) {
                    if (ramo_desbloqueado == ramos_bloqueados[n].innerHTML) {
                        ramos_bloqueados[n].addEventListener("click",Desbloquea_ramo);
                        ramos_bloqueados[n].className = "ramo";
                    }
                }
            }
        }
    }
    Guardar_datos();
    ramos_no_pasados = document.getElementsByClassName("ramo");
    ramos_bloqueados = document.getElementsByClassName("ramo-bloqueado");
    ramos_pasados = document.getElementsByClassName("ramo-pasado");
}
function Bloquear_ramo(e) {
    ramo = e.target;
    ramo.className = "ramo";
    ramo.addEventListener("click",Desbloquea_ramo);
    ramo.removeEventListener("click",Bloquear_ramo);
    for (let i = 0; i < lista_requisitos_desbloqueados.length; i++){
        let contador = 0;
        let ramo_a_bloquear = lista_requisitos_desbloqueados[i][1];
        if (ramo.innerHTML == lista_requisitos_desbloqueados[i][0]) {
            for (n = 0; n < ramos_pasados.length; n++){
                if (ramo_a_bloquear == ramos_pasados[n].innerHTML){
                    Bloquea_ramo(ramos_pasados[n]);
                }
            }
            for (let x = 0; x < lista_requisitos.length; x++){
                if (ramo_a_bloquear == lista_requisitos[x][1]){
                    contador++;
                }
            }
            lista_requisitos.push(lista_requisitos_desbloqueados[i]);
            lista_requisitos_desbloqueados.splice(i,1);
            i = i - 1;
            if (contador == 0){
                for (let x = 0; x < ramos_no_pasados.length; x++){
                    if (ramo_a_bloquear == ramos_no_pasados[x].innerHTML){
                        ramos_no_pasados[x].removeEventListener("click",Desbloquea_ramo);
                        ramos_no_pasados[x].className = "ramo-bloqueado";
                    }
                }
            }
        }
    }
    Guardar_datos();
    ramos_no_pasados = document.getElementsByClassName("ramo");
    ramos_bloqueados = document.getElementsByClassName("ramo-bloqueado");
    ramos_pasados = document.getElementsByClassName("ramo-pasado");
}

function Bloquea_ramo(ramo) {
    ramo.className = "ramo-bloqueado";
    ramo.removeEventListener("click",Bloquear_ramo);
    for (let i = 0; i < lista_requisitos_desbloqueados.length; i++){
        let contador = 0;
        let ramo_a_bloquear = lista_requisitos_desbloqueados[i][1];
        if (ramo.innerHTML == lista_requisitos_desbloqueados[i][0]) {
            for (n = 0; n < ramos_pasados.length; n++){
                if (ramo_a_bloquear == ramos_pasados[n].innerHTML){
                    Bloquea_ramo(ramos_pasados[n]);
                }
            }
            for (let x = 0; x < lista_requisitos.length; x++){
                if (ramo_a_bloquear == lista_requisitos[x][1]){
                    contador++;
                }
            }
            lista_requisitos.push(lista_requisitos_desbloqueados[i]);
            lista_requisitos_desbloqueados.splice(i,1);
            i = i - 1;
            if (contador == 0){
                for (let x = 0; x < ramos_no_pasados.length; x++){
                    if (ramo_a_bloquear == ramos_no_pasados[x].innerHTML){
                        ramos_no_pasados[x].removeEventListener("click",Desbloquea_ramo);
                        ramos_no_pasados[x].className = "ramo-bloqueado";
                    }
                }
            }
        }
    }
    Guardar_datos();
    ramos_no_pasados = document.getElementsByClassName("ramo");
    ramos_bloqueados = document.getElementsByClassName("ramo-bloqueado");
    ramos_pasados = document.getElementsByClassName("ramo-pasado");
}





