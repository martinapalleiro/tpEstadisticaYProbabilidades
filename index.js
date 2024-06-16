let alumnos=[]
let cantAlumnosPrimaria=0,cantSecu=0, cantIni=0, total=0
let frecuenciaAcumulada=0
let fRelativaIni=0,fRelativaPrim=0, fRelativaSecu=0,fRelativaTotal=0
let cant1A=0,cant1B=0,cant2B=0, totalCursos=0
let frecuenciaAcumuladaCursos=0
let  fRelativa1a=0,  fRelativa1b=0,  fRelativa2b=0,  fRelativaTotalCursos=0
let media, totalRespuestas
let max, min
function mostrarBloque(idBloque, idEnlace) {
    var bloques = document.querySelectorAll('.conteiner > div');
    bloques.forEach(function(bloque) {
        bloque.style.display = 'none';
    });

    // Muestra el bloque correspondiente al id pasado como parámetro
    var bloqueAMostrar = document.getElementById(idBloque);
    if (bloqueAMostrar) {
        bloqueAMostrar.style.display = 'block';
        
    }
    var enlaces = document.querySelectorAll('.nav-link');
    enlaces.forEach(function(enlace) {
        enlace.classList.remove('active');
    });
    // Agrega la clase 'active' al enlace seleccionado
    var enlaceActivo = document.getElementById(idEnlace);
    if (enlaceActivo) {
        enlaceActivo.classList.add('active');
    }
}

function buscarAlumnoApi(){
    return new Promise((resolver, rechazar)=> {
        fetch('https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1')
        .then(response=>{
            if(!response.ok){
                throw new Error('Hubo un error de red')
            }
            return response.json();
            
        })
        .then(datos => {
            resolver(datos)
        })
        .catch(error => {
            rechazar(error)
        })
    })
    
}

function pedirBuscarAlumno(){
    buscarAlumnoApi()
    .then((response) => {
        alumnos=response.data
        mostrarAlumno()
    })
    .catch((error)=>{
    })
}
function armarTabla(){
    buscarAlumnoApi()
    .then((response)=>{
        alumnos=response.data
        contarAlumnosPrimaria()
        contarSecundaria()
        contarInicial()
        calcularTotal()
        calcularFAcumulada()
        calcularFRelativa()
        contar1a()
        contar1b()
        contar2b()
        calcularTotalCursos()
        calcularFAcumuladaCursos()
        calcularFRelativaCursos()
    }).catch ((error)=>{

    })
}
function cargarEstadisticos(){
    buscarAlumnoApi()
    .then((response) => {
        alumnos=response.data
        calcularMedia()
        valorMaxYMin()
        calcularMediana()
        calcularPrimerCuartil()
        calcularSegundoCuartil()
        calcularDesvioEstandar()
    })
    .catch((error)=>{

    })

}

function mostrarAlumno(){
    if(alumnos.length>0){
        let table=document.getElementById('alumnos').getElementsByTagName('tbody')[0]

        alumnos.forEach((alumno)=> {
            let nuevaFila= table.insertRow()
            let celda0= nuevaFila.insertCell(0)
            let celda1= nuevaFila.insertCell(1)
            let celda2= nuevaFila.insertCell(2)
            let celda3= nuevaFila.insertCell(3)
            let celda4= nuevaFila.insertCell(4)

            celda0.innerHTML =alumno.nombre
            celda1.innerHTML =alumno.apellido
            celda2.innerHTML=alumno.Edad
            celda3.innerHTML =alumno.curso
            celda4.innerHTML =alumno.nivel

        })
    }
}
function contarAlumnosPrimaria(){
    cantAlumnosPrimaria=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.id_nivel==1)
            cantAlumnosPrimaria++
        })
    }
    const alumnosDiv=document.getElementById('cantidadAlumnos')
    alumnosDiv.innerHTML=cantAlumnosPrimaria
}
function contarSecundaria(){
    cantSecu=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.id_nivel==2)
                cantSecu++
        })
    }
    const alumnosDiv=document.getElementById('cantSecu')
    alumnosDiv.innerHTML=cantSecu
}
function contarInicial(){
    cantIni=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.id_nivel==3)
                cantIni++
        })
    }
    const alumnosDiv=document.getElementById('cantIni')
    alumnosDiv.innerHTML=cantIni
}

function calcularTotal(){
    total=0
    total=cantIni+cantSecu+cantAlumnosPrimaria
    const alumnosDiv=document.getElementById('total')
    alumnosDiv.innerHTML=total
}
function calcularFAcumulada(){
frecuenciaAcumulada=0
frecuenciaAcumulada=cantIni
document.getElementById('fAcumInicial').textContent= frecuenciaAcumulada
frecuenciaAcumulada=frecuenciaAcumulada+cantAlumnosPrimaria
document.getElementById('fAcumPri').textContent=frecuenciaAcumulada
frecuenciaAcumulada=frecuenciaAcumulada+cantSecu
document.getElementById('fAcumSecu').textContent=frecuenciaAcumulada
}
function calcularFRelativa(){
    fRelativaIni=cantIni/total
    fRelativaPrim=cantAlumnosPrimaria/total
    fRelativaSecu=cantSecu/total
    fRelativaTotal=fRelativaIni+fRelativaPrim+fRelativaSecu
    document.getElementById('fRelaInicial').textContent= fRelativaIni.toFixed(2)
    document.getElementById('fRelaPrim').textContent= fRelativaPrim.toFixed(2)
    document.getElementById('fRelaSecu').textContent= fRelativaSecu.toFixed(2)
    document.getElementById('fRelaTotal').textContent= fRelativaTotal.toFixed(2)
}
function contar1a(){
    cant1A=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.id_curso==1)
                cant1A++
        })
    }
    const alumnosDiv=document.getElementById('cant1a')
    alumnosDiv.innerHTML=cant1A
}
function contar1b(){
    cant1B=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.id_curso==5)
                cant1B++
        })
    }
    const alumnosDiv=document.getElementById('cant1b')
    alumnosDiv.innerHTML=cant1B
}
function contar2b(){
    cant2B=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.id_curso==2)
                cant2B++
        })
    }
    const alumnosDiv=document.getElementById('cant2b')
    alumnosDiv.innerHTML=cant2B
}
function calcularTotalCursos(){
    totalCursos=0
    totalCursos=cant1A+cant1B+cant2B
    const alumnosDiv=document.getElementById('totalCursos')
    alumnosDiv.innerHTML=totalCursos
}
function calcularFAcumuladaCursos(){
    frecuenciaAcumuladaCursos=0
    frecuenciaAcumuladaCursos=cant1A
    document.getElementById('fAcum1A').textContent= frecuenciaAcumuladaCursos
    frecuenciaAcumuladaCursos=frecuenciaAcumuladaCursos+cant1B
    document.getElementById('fAcum1B').textContent=frecuenciaAcumuladaCursos
    frecuenciaAcumuladaCursos=frecuenciaAcumuladaCursos+cant2B
    document.getElementById('fAcum2B').textContent=frecuenciaAcumuladaCursos
    }
function calcularFRelativaCursos(){
    fRelativa1a=cant1A/totalCursos
    fRelativa1b=cant1B/totalCursos
    fRelativa2b=cant2B/totalCursos
    fRelativaTotalCursos=fRelativa1a+fRelativa1b+fRelativa2b
    document.getElementById('fRela1a').textContent= fRelativa1a.toFixed(2)
    document.getElementById('fRela1b').textContent= fRelativa1b.toFixed(2)
    document.getElementById('fRela2b').textContent= fRelativa2b.toFixed(2)
    document.getElementById('fRelaTotalCurso').textContent= fRelativaTotalCursos.toFixed(2)
}
function calcularMedia(){
    media=0, totalRespuestas=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            media=media+alumno.Edad
            totalRespuestas++
        })
    }
    media=media/totalRespuestas
    document.getElementById('edadMedia').textContent=media.toFixed(0)
}
function calcularMediana() {
    let mediana, n;
    let edades = alumnos.map(alumno => alumno.Edad);

    if (edades.length > 0) {
        edades.sort((a, b) => a - b);
        n = edades.length;
        
        if (n % 2 === 0) {
            mediana = (edades[n / 2 - 1] + edades[n / 2]) / 2;
        } else {
            mediana = edades[Math.floor(n / 2)];
        }
    } 

    const alumnosDiv = document.getElementById('mediana');
    alumnosDiv.textContent = mediana;
}

function valorMaxYMin(){
    max=0, min=100
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            if(alumno.Edad>max)
                max=alumno.Edad
            if(alumno.Edad<min)
                min=alumno.Edad
        })
    }
    document.getElementById('minimo').textContent=min
    document.getElementById('maximo').textContent=max
}
function calcularPrimerCuartil() {
    let primerCuartil = 0;
    
    // Ejemplo: suponiendo que 'alumnos' es un arreglo de objetos con una propiedad 'Edad'
    let edades = alumnos.map(alumno => alumno.Edad);
    edades.sort((a, b) => a - b);
    let n = edades.length;
    if (n > 0) {
        let posicionQ1 = (1 / 4) * (n + 1);
        let posicionEntera = Math.floor(posicionQ1);
        let fraccion = posicionQ1 - posicionEntera;

        if (posicionEntera > 0) {
            primerCuartil = edades[posicionEntera - 1] + fraccion * (edades[posicionEntera] - edades[posicionEntera - 1]);
        } 
    }
    
    // Suponiendo que quieres mostrar el resultado en un elemento HTML con id 'primerCuartil'
    document.getElementById('primerCuartil').textContent = primerCuartil;
}
function calcularSegundoCuartil() {
    let segundoCuartil = 0;
    let edades = alumnos.map(alumno => alumno.Edad);
    edades.sort((a, b) => a - b);
    let n = edades.length;

    if (n > 0) {
        let posicionQ2 = (2 / 4) * (n + 1);  // Calcular la posición del segundo cuartil (Q2)
        let posicionEntera = Math.floor(posicionQ2);
        let fraccion = posicionQ2 - posicionEntera;

        if (posicionEntera > 0 && posicionEntera <= n) {
            segundoCuartil = edades[posicionEntera - 1];  // Obtener el valor del segundo cuartil (Q2)

            if (fraccion !== 0) {
                segundoCuartil += fraccion * (edades[posicionEntera] - edades[posicionEntera - 1]);  // Interpolación si es necesario
            }
        } 
    }
    document.getElementById('segundoCuartil').textContent = segundoCuartil;
}
function calcularDesvioEstandar(){
    let suma=0
    let E=0, desvioEstandar=0
    if(alumnos.length>0){
        alumnos.forEach(alumno=>{
            E=Math.pow((alumno.Edad+media),2)
            suma=suma+E
        })
    }
    desvioEstandar=(suma/(totalRespuestas-1))
    desvioEstandar=Math.sqrt(desvioEstandar)
    document.getElementById('desvioEstandar').textContent=desvioEstandar.toFixed(2)
}
