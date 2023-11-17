class Persona{
    id=0;
    nombre="";
    apellido="";
    edad=1;


    constructor(id,nombre,apellido,edad)
    {
        this.id = id || -1;
        this.nombre = nombre || "nombre";
        this.apellido = apellido || "apellido";

        if(edad>18 && edad!=null)
        {
            this.edad = edad;
        }else this.edad = 1;

    }

    toString()
    {
        return 'ID: '+ this.id + '|Nombre: '+this.nombre + '|Apellido: '+this.anoFab+ '|Edad: '+ this.edad;
    }
}


class Futbolista extends Persona{
    equipo="";
    posicion="";
    cantidadGoles=1;

    constructor(id,nombre,apellido,edad,equipo,posicion,cantidadGoles)
    {
        super(id,nombre,apellido,edad);
        this.equipo = equipo;
        this.posicion = posicion;

        if(cantidadGoles >0 && cantidadGoles!=null)
        {
            this.cantidadGoles = cantidadGoles;
        }else this.cantidadGoles = 1;

    }




    toString()
    {
        return super.toString() + `|Cantidad Goles: ${this.cantidadadGoles}|Posicion: ${this.posicion}Equipo: ${this.equipo}`;
    }

}

class Profesional extends Persona{
    titulo = "";
    facultad = "";
    añoGraduacion = "";

    constructor(id,nombre,apellido,edad,titulo,facultad,añoGraduacion)
    {
        super(id,nombre,apellido,edad);
        this.titulo = titulo;
        this.facultad = facultad;
        if(añoGraduacion>1950 && añoGraduacion!=null)
        {
            this.añoGraduacion = añoGraduacion;
        }else this.añoGraduacion = 1;

    }

}
/////////// FIN CLASES

let txtId = document.getElementById("txtId");
let txtNombre = document.getElementById("txtNombre");
let txtApellido = document.getElementById("txtApellido");
let txtEdad = document.getElementById("txtEdad");
let SelectTipo = document.getElementById("SelectTipo");
let txtEquipo = document.getElementById("txtEquipo");
let txtPosicion = document.getElementById("txtPosicion");
let txtCantidadGoles = document.getElementById("txtCantidadGoles");
let txtTitulo = document.getElementById("txtTitulo");
let txtFacultad = document.getElementById("txtFacultad");
let txtAñoGraduacion = document.getElementById("txtAñoGraduacion");

const formTitulo = document.getElementById('titulo-abm');


const server = "http://localhost/personasFutbolitasProfesionales.php";

function statusSpinner(status)
{
    let spinner = document.getElementById("spinner");
    if(status)
    {   
        spinner.style.display = "";
    }else{
        spinner.style.display = "none";
    }
}

var arrayPersonas = [];
var arrayFutbolistas = [];
var arrayProfesionales = [];


statusSpinner(false);

function Inicializar(array)
{
    array.forEach(objeto => {
        if(objeto.hasOwnProperty("id") && objeto.hasOwnProperty("nombre") && objeto.hasOwnProperty("apellido") && objeto.hasOwnProperty("edad"))
        {
            if(objeto.hasOwnProperty("equipo") && objeto.hasOwnProperty("cantidadGoles") && objeto.hasOwnProperty("posicion"))
            {
                let futbolista = new Futbolista(objeto.id,objeto.nombre,objeto.apellido,objeto.edad,objeto.equipo,objeto.posicion,objeto.cantidadGoles);
                arrayFutbolistas.push(futbolista);
                arrayPersonas.push(futbolista);
            }

            if(objeto.hasOwnProperty("titulo") && objeto.hasOwnProperty("facultad")  && objeto.hasOwnProperty("añoGraduacion"))
            {
                let profesional = new Profesional(objeto.id,objeto.nombre,objeto.apellido,objeto.edad,objeto.titulo,objeto.facultad,objeto.añoGraduacion);
                arrayProfesionales.push(profesional);
                arrayPersonas.push(profesional);
            }
        }
    });

    mostrarPersonas(arrayPersonas);
}



function peticionAlServer()
{
    statusSpinner(true);
    
    let consulta = fetch(server)
    .then(resp =>{

        if(resp.status == 200)
        {
            statusSpinner(false);
            resp.json().then(objJson=>{
                var cadena = objJson;

                Inicializar(cadena);
            })
        }

        
    })    

}
//desvinculacion de funcion submit

document.getElementById("FrmABM").addEventListener("submit",e=> {
    e.preventDefault();
    })

    document.getElementById("FrmDatos").addEventListener("submit",e=> {
        e.preventDefault();
        })
//

function validarIndex(index)
{
    let retorno = -1;  
    arrayPersonas.forEach(persona=>{
        if(persona.id == index)
        { 
         retorno = index;
        }
    })

    return retorno;
}

/*
function mostrarCorrespondiente()
{
    if(SelectTipo.value == "tAereo")
    {
        txtAM.style.display="";
        txtAutonomia.style.display="";
        txtCantPue.style.display="none";
        txtCantRue.style.display="none";
        

        
    }else if(SelectTipo.value == "tTerrestre")
    {
        txtCantPue.style.display="";
        txtCantRue.style.display="";
        txtAM.style.display="none";
        txtAutonomia.style.display="none";
        
    }

}

SelectTipo.addEventListener("change",mostrarCorrespondiente);
*/

function limpiarCampos() {
    txtEquipo.value = "";
    txtCantidadGoles.value = "";
    txtPosicion.value = "";
    txtTitulo.value = "";
    txtFacultad.value = "";
    txtAñoGraduacion.value = "";

}

function mostrarCorrespondiente() {
    limpiarCampos();

    if (SelectTipo.value == "tFutbolista") {
        txtEquipo.style.display = "";
        txtPosicion.style.display = "";
        txtCantidadGoles.style.display = "";
        txtTitulo.style.display = "none";
        txtFacultad.style.display = "none";
        txtAñoGraduacion.style.display = "none";
    } else if (SelectTipo.value == "tProfesional") {
        txtTitulo.style.display = "";
        txtFacultad.style.display = "";
        txtAñoGraduacion.style.display = "";
        txtCantidadGoles.style.display = "none";
        txtPosicion.style.display = "none";
        txtEquipo.style.display = "none";

    }
}

SelectTipo.addEventListener("change", mostrarCorrespondiente);


function mostrarYllenarABM(tagId)
{
    arrayPersonas.forEach(el=>{

        if(el.id == tagId)
        {
            document.getElementById("FrmABM").style.display = "";
            txtId.value = el.id;
            txtNombre.value = el.nombre;
            txtApellido.value = el.apellido;
            txtEdad.value = el.edad;
            if(el.hasOwnProperty("equipo"))
            {
                SelectTipo.value = "tFutbolista";
                mostrarCorrespondiente();
                txtEquipo.value = el.equipo;
                txtPosicion.value = el.posicion;
                txtCantidadGoles.value = el.cantidadGoles;

            }else{
                SelectTipo.value = "tProfesional";
                mostrarCorrespondiente();
                txtTitulo.value = el.titulo;
                txtFacultad.value = el.facultad;
                txtAñoGraduacion.value = el.añoGraduacion;
            }
           
        }
    })
    
}

function DelOrModif(event)
{
    let rowId = event.target.parentNode.parentNode.id;
    
    let indexValido = validarIndex(rowId);
        
    

    if(indexValido != -1)
    {        
        formTitulo.innerText = event.target.value;
        
        document.getElementById("FrmDatos").style.display="none";
        
        mostrarYllenarABM(indexValido);
    }
}


function mostrarPersonas(arrayPersonas) {
    document.getElementById("persona-container").innerHTML = "";
    arrayPersonas.forEach(el => {
        let tr = document.createElement("tr");
        tr.setAttribute("id", el.id);
        tr.classList.add("trPersonas");
        tr.innerHTML = `
            <td>${el.id}</td>
            <td>${el.nombre}</td>
            <td>${el.apellido}</td>
            <td>${el.edad}</td>
            <td>${el.equipo || "N/A"}</td>
            <td>${el.posicion || "N/A"}</td>
            <td>${el.cantidadGoles || "N/A"}</td>
            <td>${el.titulo || "N/A"}</td>
            <td>${el.facultad || "N/A"}</td>
            <td>${el.añoGraduacion || "N/A"}</td>
        `;

        let botones = ["Modificar", "Eliminar"];
        botones.forEach(btnStr => {
            let input = document.createElement("input");
            input.type = "button";
            input.id = btnStr + el.id;
            input.value = btnStr;
            input.className = "btnTABLA";
            input.addEventListener('click', DelOrModif);

            celda = document.createElement("td");
            celda.appendChild(input);
            tr.appendChild(celda);
        });

        document.getElementById("persona-container").appendChild(tr);
    });
}

function mostrarFutbolistas(arrayFutbolistas) {
    document.getElementById("persona-container").innerHTML = "";
    arrayFutbolistas.forEach(el => {
        let tr = document.createElement("tr");
        tr.setAttribute("id", el.id);
        tr.classList.add("trFutbolistas"); // Cambiado el nombre de la clase
        tr.innerHTML = `
            <td>${el.id}</td>
            <td>${el.nombre}</td>
            <td>${el.apellido}</td>
            <td>${el.edad}</td>
            <td>${el.equipo || "N/A"}</td>
            <td>${el.posicion || "N/A"}</td>
            <td>${el.cantidadGoles || "N/A"}</td>
            <td>${el.titulo || "N/A"}</td>
            <td>${el.facultad || "N/A"}</td>
            <td>${el.añoGraduacion || "N/A"}</td>
        `;

        let botones = ["Modificar", "Eliminar"];
        botones.forEach(btnStr => {
            let input = document.createElement("input");
            input.type = "button";
            input.id = btnStr + el.id;
            input.value = btnStr;
            input.className = "btnTABLA";
            input.addEventListener('click', DelOrModif);

            celda = document.createElement("td");
            celda.appendChild(input);
            tr.appendChild(celda);
        });

        document.getElementById("persona-container").appendChild(tr);
    });
}

function mostrarProfesionales(arrayProfesionales) {
    document.getElementById("persona-container").innerHTML = "";
    arrayProfesionales.forEach(el => {
        let tr = document.createElement("tr");
        tr.setAttribute("id", el.id);
        tr.classList.add("trProfesionales"); // Cambiado el nombre de la clase
        tr.innerHTML = `
            <td>${el.id}</td>
            <td>${el.nombre}</td>
            <td>${el.apellido}</td>
            <td>${el.edad}</td>
            <td>${el.equipo || "N/A"}</td>
            <td>${el.posicion || "N/A"}</td>
            <td>${el.cantidadGoles || "N/A"}</td>
            <td>${el.titulo || "N/A"}</td>
            <td>${el.facultad || "N/A"}</td>
            <td>${el.añoGraduacion || "N/A"}</td>
        `;

        let botones = ["Modificar", "Eliminar"];
        botones.forEach(btnStr => {
            let input = document.createElement("input");
            input.type = "button";
            input.id = btnStr + el.id;
            input.value = btnStr;
            input.className = "btnTABLA";
            input.addEventListener('click', DelOrModif);

            celda = document.createElement("td");
            celda.appendChild(input);
            tr.appendChild(celda);
        });

        document.getElementById("persona-container").appendChild(tr);
    });
}

//EVALUA EL FILTRO Y MUESTRA SEGUN CORRESPONDA
function filtroCorrespondiente() {
    if (document.getElementById("filtroTipo").value == "vTodos") {
        mostrarPersonas(arrayPersonas);
    } else if (document.getElementById("filtroTipo").value == "vFutbolista") {
        mostrarFutbolistas(arrayFutbolistas);
    } else if (document.getElementById("filtroTipo").value == "vProfesional") {
        mostrarProfesionales(arrayProfesionales);
    }
}

document.getElementById("filtroTipo").addEventListener("change",filtroCorrespondiente);


peticionAlServer();

function initConfig()
{
    document.getElementById("FrmABM").style.display="none";
    document.getElementById("FrmDatos").style.display="";
}

function altaConfig(){
    document.getElementById("FrmABM").style.display="";
    document.getElementById("FrmDatos").style.display="none";
    txtCantidadGoles.style.display="none";
    txtEquipo.style.display="none";
    txtPosicion.style.display="none";
    txtTitulo.style.display="none";
    txtFacultad.style.display="none";
    txtAñoGraduacion.style.display="none";

    formTitulo.innerText = "Alta";
    
}

initConfig();

document.getElementById("btnCancelar").addEventListener("click",initConfig);

/*
function darDeAlta(persona) {   
    statusSpinner(true);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4) {
            if(xhttp.status == 200 && validarDatos()) {
                console.log(xhttp.response);
                statusSpinner(false);
                const nuevoId = JSON.parse(xhttp.response).id;
                persona.id = nuevoId;
                arrayPersonas.push(persona); 
                initConfig();
                mostrarPersonas(arrayPersonas);
            } else {
                statusSpinner(false);
                initConfig();
                alert("Error al dar de alta.");   
            }
        }     
    };
    xhttp.open("PUT", server, true);
    xhttp.setRequestHeader('Content-Type' , 'application/json');
    xhttp.send(JSON.stringify(persona));
}*/

async function darDeAlta(persona) {
    statusSpinner(true);

    try {
        const response = await fetch(server, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(persona),
        });

        if (response.ok && validarDatos()) {
            const nuevoId = (await response.json()).id;
            persona.id = nuevoId;
            arrayPersonas.push(persona);
            initConfig();
            mostrarPersonas(arrayPersonas);
        } else {
            throw new Error('Error al dar de alta.');
        }
    } catch (error) {
        console.error(error);
        alert('Error al dar de alta.');
    } finally {
        statusSpinner(false);
        initConfig();
    }
}


function validarDatos() {
    let tipoPersona = SelectTipo.value;
    if (parseInt(txtEdad.value) > 18 && txtNombre.value != "" && txtApellido.value != "") {
        if (tipoPersona == "tFutbolista") {
            if (txtEquipo.value == "" || txtPosicion.value == "" || parseInt(txtCantidadGoles.value) < 1) {
                alert("Por favor, ingresa todos los datos para los futbolistas");
                return false;
            }
        } else if (tipoPersona == "tProfesional") {
            if (txtTitulo.value == "" || txtFacultad.value == "" || parseInt(txtAñoGraduacion.value) < 1950) {
                alert("Por favor, ingresa todos los datos para los profesionales");
                return false;
            }
        }
    } else {
        alert("Por favor, ingresa todos los datos para las personas");
        return false;
    }
    return true;
}

document.getElementById("btnAceptar").addEventListener("click",function(){

    let id = parseInt(txtId.value);
    let nombre = txtNombre.value;
    let apellido = txtApellido.value;
    let edad = parseInt(txtEdad.value);
    let equipo = txtEquipo.value;
    let posicion = txtPosicion.value;
    let cantidadGoles = parseInt(txtCantidadGoles.value);
    let titulo = txtTitulo.value;
    let facultad = txtFacultad.value;
    let añoGraduacion = parseInt(txtAñoGraduacion.value);


    if(formTitulo.innerText == "Alta")
    {
        if(SelectTipo.value == "tFutbolista")
        {
            let futbolista = new Futbolista(0,nombre,apellido,edad,equipo,posicion,cantidadGoles);
            console.log(futbolista);
            darDeAlta(futbolista);
        }else if(SelectTipo.value = "tProfesional")
        {
            let profesional = new Profesional(0,nombre,apellido,edad,titulo,facultad,añoGraduacion);
            console.log(profesional);
            darDeAlta(profesional);
        }
    }else if(formTitulo.innerText == "Modificar")
    {
        if(SelectTipo.value == "tFutbolista")
        {
            let futbolista = new Futbolista(0,nombre,apellido,edad,equipo,posicion,cantidadGoles);
            Modificar(futbolista);
            
        }else if(SelectTipo.value = "tProfesional")
        {
            let profesional = new Profesional(0,nombre,apellido,edad,titulo,facultad,añoGraduacion);
            Modificar(profesional);
        }
    }else if(formTitulo.innerText == "Eliminar")
    {
        if(SelectTipo.value == "tFutbolista")
        {
            let futbolista = new Futbolista(0,nombre,apellido,edad,equipo,posicion,cantidadGoles);
            Eliminar(futbolista);
            
        }else if(SelectTipo.value = "tProfesional")
        {
            let profesional = new Profesional(0,nombre,apellido,edad,titulo,facultad,añoGraduacion);
            Eliminar(profesional);
        }
    }

});

document.getElementById("btnAgregar").addEventListener("click", altaConfig);


function Modificar(persona) {
    return new Promise((resolve, reject) => {
        SelectTipo.disabled = true;
        statusSpinner(true);

        fetch(server, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(persona)
        })
            .then(async (consulta) => {
                let response = await consulta.text();

                if (consulta.status === 200 && validarDatos()) {
                    persona.id = parseInt(txtId.value);
                    persona.nombre = txtNombre.value;
                    persona.apellido = txtApellido.value;
                    persona.edad = parseInt(txtEdad.value);
                    persona.equipo = txtEquipo.value;
                    persona.posicion = txtPosicion.value;
                    persona.cantidadGoles = parseInt(txtCantidadGoles.value);
                    persona.titulo = txtTitulo.value;
                    persona.facultad = txtFacultad.value;
                    persona.añoGraduacion = parseInt(txtAñoGraduacion.value);

                    let id = BuscarId(persona.id);
                    arrayPersonas.splice(id, 1);

                    arrayPersonas.push(persona);

                    initConfig();
                    mostrarPersonas(arrayPersonas);
                    statusSpinner(false);

                    resolve(); // Resuelve la promesa si la operación es exitosa
                } else {
                    reject("Error al modificar. Verifique la conexión con el servidor."); // Rechaza la promesa en caso de error
                }
            })
            .catch((error) => {
                console.error(error);
                reject("Error al modificar. Verifique la conexión con el servidor."); // Rechaza la promesa en caso de error
            })
            .finally(() => {
                SelectTipo.disabled = false;

                statusSpinner(false);
            });
    });
}



function BuscarId(id) {
	let index = -1;
	for (let i = 0; i < arrayPersonas.length; i++) {
		let persona = arrayPersonas[i];
		if (persona.id == id) {
			index = i;
			break;
		}
	}

	return index;
}


async function Eliminar(persona) {
    let consulta = null;
	
    statusSpinner(true);

    try {
        consulta = await fetch(server, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(persona)
        });

        if (consulta.status == 200) {
            let index = BuscarId(persona.id);
            arrayPersonas.splice(index, 1);

            initConfig();
            mostrarPersonas(arrayPersonas);
        } else {
            throw new Error('Hubo un problema con la baja. Verifique la conexión con el servidor.');
        }
    } catch (error) {
        console.error(error);
        alert('Hubo un problema con la baja. Verifique la conexión con el servidor.');
        initConfig();
    } finally {
        statusSpinner(false);
        limpiarCampos();
    }
}






