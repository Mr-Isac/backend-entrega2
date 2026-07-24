import { Router } from "express";
import Cart from "../models/Cart.js";

const router = Router();


// Crear carrito
router.post("/", async (req, res) => {

  try {

    const cart = await Cart.create({
      products: []
    });

    res.status(201).json(cart);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Obtener carrito específico con populate
router.get("/:cid", async (req, res) => {

  try {

    const cart = await Cart.findById(
      req.params.cid
    )
    .populate(
      "products.product"
    );


    if (!cart) {

      return res.status(404).json({
        error: "Carrito no encontrado"
      });

    }


    res.json(cart);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {

  try {

    const cart = await Cart.findById(
      req.params.cid
    );


    if (!cart) {

      return res.status(404).json({
        error: "Carrito no encontrado"
      });

    }


    const product = cart.products.find(
      item =>
        item.product.toString() === req.params.pid
    );


    if (product) {

      product.quantity++;

    } else {

      cart.products.push({

        product: req.params.pid,

        quantity: 1

      });

    }


    await cart.save();


    res.json(cart);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Eliminar un producto específico del carrito
router.delete("/:cid/products/:pid", async (req, res) => {

  try {

    const cart = await Cart.findById(
      req.params.cid
    );


    if (!cart) {

      return res.status(404).json({
        error: "Carrito no encontrado"
      });

    }


    cart.products =
      cart.products.filter(
        item =>
          item.product.toString() !== req.params.pid
      );


    await cart.save();


    res.json({
      message: "Producto eliminado del carrito",
      cart
    });


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Actualizar todos los productos del carrito
router.put("/:cid", async (req, res) => {

  try {

    const cart = await Cart.findById(
      req.params.cid
    );


    if (!cart) {

      return res.status(404).json({
        error: "Carrito no encontrado"
      });

    }


    cart.products = req.body.products;


    await cart.save();


    res.json(cart);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Actualizar cantidad de un producto
router.put("/:cid/products/:pid", async (req, res) => {

  try {

    const cart = await Cart.findById(
      req.params.cid
    );


    if (!cart) {

      return res.status(404).json({
        error: "Carrito no encontrado"
      });

    }


    const product = cart.products.find(
      item =>
        item.product.toString() === req.params.pid
    );


    if (!product) {

      return res.status(404).json({
        error: "Producto no encontrado en carrito"
      });

    }


    product.quantity = req.body.quantity;


    await cart.save();


    res.json(cart);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {

  try {

    const cart = await Cart.findById(
      req.params.cid
    );


    if (!cart) {

      return res.status(404).json({
        error: "Carrito no encontrado"
      });

    }


    cart.products = [];


    await cart.save();


    res.json({
      message: "Carrito vaciado",
      cart
    });


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


export default router;