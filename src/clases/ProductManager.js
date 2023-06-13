import fs from "fs";
export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.fs = fs;
    this.init = [];
    // this.fs.writeFileSync(this.path, "[]", (err) => {
    //   if (err) return console.log("ERROR", err);
    //   else {
    //     console.log("Escribio...");
    //   }
    // });
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let valido = true;
    this.product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    for (let element in this.product) {
      if (
        this.product[element] == null ||
        this.product[element] == "" ||
        this.product[element] == 0
      ) {
        valido = false;
      }
    }

    if (valido) {
      console.log("verificando la lista de productos...");
      const existe = this.products.find(
        (producto) => producto.code == this.product.code
      );
      if (existe) {
        return `el producto con codigo - ${this.product.code} -  ya existe!!!!`;
      } else {
        console.log("Agregando Producto...");
        let id = 0;
        let tamanoLista = this.products.length;
        id = tamanoLista + 1;
        this.product.id = id;
        this.products.push(this.product);
        let data = JSON.stringify(this.products);
        console.log(data);
        this.fs.writeFileSync(this.path, data, (err) => {
          if (err) console.log("ERROR", err);
          else {
            console.log("Escribio...");
          }
        });
        return `Producto  ${this.product.title} agregado satisfactoriamente `;
      }
    } else {
      return "Ingrese valores validos, no null, vacios o valores en 0";
    }
  }

  updateProductByIdAndObject(id, productoEditar) {
    let contenidoArchivo = this.fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(contenidoArchivo);

    console.log("Entro a edit Product el id -> ", id);
    this.products.forEach((element) => {
      if (element.id == id) {
        element = productoEditar;
        this.products = this.products.filter((i) => i.id != id);
        element.id = id;
        this.products.push(element);

        this.products = this.products.sort((x, y) => x.id - y.id);
        let data = JSON.stringify(this.products);
        //console.log(data);
        this.fs.writeFileSync(this.path, data, (err) => {
          if (err) return console.log("ERROR", err);
          else {
            console.log("Escribio...");
          }
        });
      } else {
        return console.log("No se encontro el id");
      }
    });

    console.log("fin update.");
    return this.products;
  }

  deleteProductById(id) {
    let contenidoArchivo = this.fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(contenidoArchivo);
    this.products = this.products.filter((prod) => prod.id != id);
    let data = JSON.stringify(this.products);
    this.fs.writeFileSync(this.path, data, (err) => {
      if (err) return console.log("ERROR", err);
      else {
        console.log("Escribio...");
      }
    });
    return this.products;
  }
  getProducts() {
    let contenido = this.fs.readFileSync(this.path, "utf-8");
    return JSON.parse(contenido);
  }

  getProductById(id) {
    let encontrado = false;
    let producto;
    let contenidoArchivo = this.fs.readFileSync(this.path, "utf-8");
    this.products = JSON.parse(contenidoArchivo);
    //console.log("consultando archivo products -> ", this.products);
    //console.log("cnt", contenidoArchivo);
    console.log("buscar id = ", id);
    this.products.forEach((e) => {
      if (e.id == id) {
        producto = e;
        encontrado = true;
        return producto;
      }
    });
    if (encontrado) {
      return producto;
    } else {
      return "Not Found";
    }
  }
}
