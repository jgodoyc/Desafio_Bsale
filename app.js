document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    fetchDataC()
    fetchDataf()
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
        template.querySelector('img').setAttribute('src', producto.url_image)
        template.querySelector('h5').textContent = producto.name
        template.querySelector('p span').textContent = producto.price

        const clone = template.cloneNode(true)
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


const contenedorCategorias = document.querySelector('#contenedor-categorias')
const pintarCategorias = (dataC) => {
    const templateC = document.querySelector('#template-categorias').content
    const fragmentC = document.createDocumentFragment()
    
    dataC['categorias'].forEach(categoria => {
        templateC.querySelector('span').textContent = categoria.name
        templateC.querySelector('button').dataset.id = categoria.id
        const cloneC = templateC.cloneNode(true)
        fragmentC.appendChild(cloneC)        
    });    
    
    contenedorCategorias.appendChild(fragmentC)
    const editButtons = document.querySelectorAll('.btn-secondary');



    editButtons.forEach(function(item, idx){

        item.addEventListener('click', function(){
            contenedorProductos.remove();
            const idCategoria = item.dataset.id
            console.log(idCategoria)
            fetchDataf();
        })

        const fetchDataf = async () => {
            try {
                const resf = await fetch('http://127.0.0.1:5000/categorias/'+item.dataset.id)                    
                const dataf = await resf.json()
                console.log(dataf)
                pintarProductos(dataf)
                
            } catch (error) {
                console.log(error)
            }
        }
    });
    
} 




