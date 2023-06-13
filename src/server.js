import express from "express";
import ProductManager from "./clases/ProductManager.js";

const app = express();
const ruta = "./src/clases/files/productos.json";
const productManager = new ProductManager(ruta);

app.use(express.urlencoded({ extended: true }));
app.get("/products", async (req, resp) => {
  const limite = req.query.limit;
  if (limite != null) {
    const productos = await productManager.getProducts();
    let respuesta;
    if (limite > productos.length || limite < 0) {
      respuesta = "Ingrese un limite de productos valido";
    } else {
      productos.length = limite;
      respuesta = productos;
    }
    resp.send(respuesta);
  } else {
    const productos = await productManager.getProducts();
    resp.send(productos);
  }
});

app.get("/products/:idProduto", async (req, resp) => {
  let idProduto = req.params.idProduto;

  let producto = await productManager.getProductById(idProduto);

  resp.send(producto);
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
