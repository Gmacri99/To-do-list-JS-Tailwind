//Elementos que necesito para desarrollar las funciones 
let arrObj=[]
const d=document,
$contenedor=d.querySelector(".usuarios"),
$form=d.querySelector("#formulario"),
$fragment=d.createDocumentFragment()

//Función para insertar dinamicamente el contenido del arreglo en el DOM 
const MostrarData=()=>arrObj.forEach(el => {

    //se crean los elementos necesarios

    $li=d.createElement('li'),
    $btn=d.createElement("button")
    //Se define la herencia de elementos

    $contenedor.appendChild($li)
    $li.innerText=`${el.title}`
    $li.appendChild($btn)
    $li.classList.add("bg-slate-200","border-b","py-2","border-gray-300","grid","grid-cols-2","px-2","justify-around","transition-all","ease-in-out","duration-700")
    //función para el botón de eliminar y su contenido textual

    $btn.innerHTML=`X`
    $btn.classList.add("text-end","pr-4")
    // creación de variable clone para hacer una sola inserción en el dom
    let $clone=d.importNode($contenedor, true)
    $fragment.appendChild($clone)
    $btn.addEventListener("click",(e)=>{
        e.preventDefault()

        //se detecta exactamente cual es el id del elemento a eliminar y se guarda en una variable

        let indexForDelete=arrObj.findIndex(e=>e.id===el.id)
        arrObj.splice(indexForDelete,1)

        //una vez eliminado el elemento se ejecuta de nuevo la función MostrarData y se guarda en el localStorage el contenido del arreglo
        
        $contenedor.innerHTML=``
        MostrarData()
        localStorage.setItem("Notas",JSON.stringify(arrObj))
    })
});

$contenedor.appendChild($fragment)
//se agrega el evento DOMContentLoaded para cargar el arreglo al entrar en la pagina

d.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("Notas")===null) localStorage.setItem("Notas",JSON.stringify(arrObj))
    arrObj=JSON.parse(localStorage.getItem("Notas"))
    MostrarData()
})


// evento usado para la inserción de los elementos al arreglo una vez insertado se guarda la información del arreglo en el localStorage
d.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(e.target.matches("#formulario")){
        console.log($form.tarea.value)
        arrObj.push({id:arrObj.length+1, title:$form.tarea.value})
        console.log(arrObj)
        $contenedor.innerHTML=``

        setInterval(MostrarData(),1000)

        localStorage.setItem("Notas",JSON.stringify(arrObj))
    }
})

