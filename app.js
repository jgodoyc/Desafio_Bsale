document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    fetchDataC()
})
//Dominio, se recomienda modificar si se cambia de equipo
const dom = 'http://sheltered-brook-15546.herokuapp.com'

const contenedorCategorias = document.querySelector('#contenedor-categorias')
const contenedorProductos = document.querySelector('#contenedor-productos')
const buscar = document.querySelector('#btnSearch')

//Obtener informacion de producotos
const fetchData = async () => {
    try {
        const res = await fetch(dom + '/productos')
        const data = await res.json()
        pintarProductos(data)

    } catch (error) {
        console.log(error)
    }
}

//Obtener informacion filtrada
const fetchDataf = async (idCategoria) => {
    try {
        const res = await fetch(dom + '/categorias/' + idCategoria)
        const data = await res.json()
        pintarProductos(data)

    } catch (error) {
        console.log(error)
    }
}

//Dibujar en pantalla los productos
const pintarProductos = (data) => {
    contenedorProductos.innerHTML = ""
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()

    data['productos'].forEach(producto => {
        if (producto.url_image === null) {
            var url = 'https://www.bicifan.uy/wp-content/uploads/2016/09/producto-sin-imagen.png'
        } else {
            var url = producto.url_image
        }

        template.querySelector('img').setAttribute('src', url);
        template.querySelector('h5').textContent = producto.name
        template.querySelector('p span').textContent = producto.price

        const clone = template.firstElementChild.cloneNode(true)
        fragment.appendChild(clone)
    });
    contenedorProductos.appendChild(fragment)
}

//Obtener informacion de las categorias
const fetchDataC = async () => {
    try {
        const resC = await fetch(dom + '/categorias')
        const dataC = await resC.json()
        pintarCategorias(dataC)

    } catch (error) {
        console.log(error)
    }
}

//Dibujar botones de categorias
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

//Filtrar por categoria
buscar.addEventListener('click', async () => {
    const texto = document.getElementById('search').value
    try {
        if (texto !== "") {
            var resB = await fetch(dom + '/productos/buscar/' + texto)
        } else {
            var resB = await fetch(dom + '/productos')
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