from flask import Flask, jsonify
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)

conexion = MySQL(app)

@app.route('/wan')
def index():
    return "Wan"

@app.route('/productos')
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

def pag_not_found(error):
    return "<h1>La pagina que intentas acceder no existe...</h1>"

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404,pag_not_found)
    app.run()

