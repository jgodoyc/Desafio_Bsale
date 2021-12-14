from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from config import config
import os

app = Flask(__name__)
#CORS(app)

conexion = MySQL(app)

@app.route('/')
def index():
    return "Wan"


@app.route('/productos', methods=['GET'])
def listar_productos():
    try:
        cursor = conexion.connection.cursor()
        sql="SELECT id, name, url_image, price, discount, category FROM product"
        cursor.execute(sql)
        datos = cursor.fetchall()
        productos = []
        for fila in datos:
            producto = {
                'id':fila[0],
                'name':fila[1],
                'url_image':fila[2],
                'price':fila[3],
                'discount':fila[4],
                'category':fila[5]
            }
            productos.append(producto)
        return jsonify({'productos':productos, 'mensaje':"Productos listados."})

    except Exception as ex:
        return jsonify({'mensaje':"Error"})

@app.route('/productos/<id>', methods=['GET'])
def ver_producto(id):
    try:
        cursor = conexion.connection.cursor()
        sql="SELECT id, name, url_image, price, discount, category FROM product WHERE id = '{0}'".format(id)
        cursor.execute(sql)
        datos=cursor.fetchone()
        if datos != None:
            producto = {
                'id':datos[0],
                'name':datos[1],
                'url_image':datos[2],
                'price':datos[3],
                'discount':datos[4],
                'category':datos[5]
            }
            return jsonify({'productos':producto, 'mensaje':"Producto encontrado."})
        else:
            return jsonify({'mensaje':"Producto no encontrado."}) 
    except Exception as ex:
       return jsonify({'mensaje':"Error"}) 
    
@app.route('/categorias', methods=['GET'])
def listar_categorias():
    try:
        cursor = conexion.connection.cursor()
        sql="SELECT id, name FROM category"
        cursor.execute(sql)
        datos = cursor.fetchall()
        categorias = []
        for fila in datos:
            categoria = {
                'id':fila[0],
                'name':fila[1]
            }
            categorias.append(categoria)
        return jsonify({'categorias':categorias, 'mensaje':"Categorias listadas."})
    except Exception as ex:
       return jsonify({'mensaje':"Error"}) 


@app.route('/categorias/<id>', methods=['GET'])
def ver_categoria(id):
    try:
        cursor = conexion.connection.cursor()
        sql="SELECT id, name, url_image, price, discount, category FROM product WHERE category = '{0}'".format(id)
        cursor.execute(sql)
        datos = cursor.fetchall()
        productos = []
        for fila in datos:
            producto = {
                'id':fila[0],
                'name':fila[1],
                'url_image':fila[2],
                'price':fila[3],
                'discount':fila[4],
                'category':fila[5]
            }
            productos.append(producto)
        return jsonify({'productos':productos, 'mensaje':"Productos listados."})
    except Exception as ex:
       return jsonify({'mensaje':"Error"}) 


@app.route('/productos/buscar/<texto>', methods=['GET'])
def buscar_producto(texto):
    try:
        cursor = conexion.connection.cursor()
        sql="SELECT id, name, url_image, price, discount, category FROM product WHERE name LIKE '%{0}%'".format(texto)
        cursor.execute(sql)
        datos = cursor.fetchall()
        productos = []
        if datos != None:
            for fila in datos:
                producto = {
                    'id':fila[0],
                    'name':fila[1],
                    'url_image':fila[2],
                    'price':fila[3],
                    'discount':fila[4],
                    'category':fila[5]
                }
                productos.append(producto)
            return jsonify({'productos':productos, 'mensaje':"Productos listados."})
        else:
            return jsonify({'mensaje':"Producto no encontrado."}) 
    except Exception as ex:
       return jsonify({'mensaje':"Error"}) 


def pag_not_found(error):
    return "<h1>La pagina que intentas acceder no existe...?</h1>", 404

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,pag_not_found)
    PORT = int(os.environ.get("PORT", 5000))
    app.run(port = PORT, host='0.0.0.0', debug = 'DEBUG')
    app.run()