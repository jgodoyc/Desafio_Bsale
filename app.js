document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    fetchDataC()
})

const contenedorCategorias = document.querySelector('#contenedor-categorias')
const contenedorProductos = document.querySelector('#contenedor-productos')

const buscar = document.querySelector('#btnSearch')

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
        const res = await fetch('http://127.0.0.1:5000/categorias/' + idCategoria)
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
        if(producto.url_image === null){            
            var url = 'https://www.bicifan.uy/wp-content/uploads/2016/09/producto-sin-imagen.png'
        }else{
            var url = producto.url_image
        }           
        
        template.querySelector('img').setAttribute('src', url );                  
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

buscar.addEventListener('click', async () => {
    const texto = document.getElementById('search').value
    try {
        if (texto !== "") {
            var resB = await fetch('http://127.0.0.1:5000/productos/buscar/' + texto)
        } else {
            var resB = await fetch('http://127.0.0.1:5000/productos')
        }
        var dataB = await resB.json()
        if (dataB['productos'].length > 0) {
            pintarProductos(dataB)
        } else {
            contenedorProductos.innerHTML = ""
            contenedorProductos.innerHTML = "Productos no encontrados"
        }

    } catch (error) {
        console.log(error)
    }
})

//onChange
// .filter
//productos.filter((producto ) => producto.name.includes("Cadena a buscar"))