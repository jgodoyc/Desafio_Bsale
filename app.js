document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('http://127.0.0.1:5000/productos')
        const data = await res.json()
        pintarProductos(data)

    } catch (error) {
        console.log(error)
    }
}

const contenedorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()

    data['productos'].forEach(producto => {
        //console.log(producto.url_image)
        template.querySelector('img').setAttribute('src', producto.url_image)
        template.querySelector('h5').textContent = producto.name
        template.querySelector('p span').textContent = producto.price

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    });

    contenedorProductos.appendChild(fragment)
}