document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    fetchDataC()    
})

const contenedorCategorias = document.querySelector('#contenedor-categorias')
const contenedorProductos = document.querySelector('#contenedor-productos')
const buscador = document.querySelector('search')
const productos = []

const fetchData = async () => {
    try {
        const res = await fetch('http://127.0.0.1:5000/productos')
        const data = await res.json()
        pintarProductos(data)

    } catch (error) {
        console.log(error)
    }
}

const fetchDataf = async (idCategoria) => {
    try {
        const res = await fetch('http://127.0.0.1:5000/categorias/'+idCategoria)                    
        const data = await res.json()
        pintarProductos(data)
        
    } catch (error) {
        console.log(error)
    }
}


const pintarProductos = (data) => {       
    contenedorProductos.innerHTML = ""
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()

    data['productos'].forEach(producto => { 
        template.querySelector('img').setAttribute('src', producto.url_image)
        template.querySelector('h5').textContent = producto.name
        template.querySelector('p span').textContent = producto.price

        const clone = template.firstElementChild.cloneNode(true)
        fragment.appendChild(clone)        
    });
    contenedorProductos.appendChild(fragment)
}


const fetchDataC = async () => {
    try {
        const resC = await fetch('http://127.0.0.1:5000/categorias')
        const dataC = await resC.json()
        pintarCategorias(dataC)

    } catch (error) {
        console.log(error)
    }
}



const pintarCategorias = (dataC) => {
    const templateC = document.querySelector('#template-categorias').content
    const fragmentC = document.createDocumentFragment()
    
    dataC['categorias'].forEach(categoria => {
        templateC.querySelector('span').textContent = categoria.name
        templateC.querySelector('button').dataset.id = categoria.id
        const id = categoria.id        

        const cloneC = templateC.firstElementChild.cloneNode(true)
        cloneC.addEventListener('click', async (id) => {
            
            const idCategoria = categoria.id
            await fetchDataf(idCategoria);
        })         
        fragmentC.appendChild(cloneC) 
    });  
    contenedorCategorias.appendChild(fragmentC)     
      
}



//onChange
// .filter
//productos.filter((producto ) => producto.name.includes("Cadena a buscar"))