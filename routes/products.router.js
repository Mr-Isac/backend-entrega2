import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();


// Obtener productos con filtros, paginación y ordenamiento
router.get("/", async (req, res) => {

  try {

    const {
      limit = 10,
      page = 1,
      sort,
      query
    } = req.query;


    let filter = {};


    // Buscar por categoría o disponibilidad
    if (query) {

      if (query === "true" || query === "false") {

        filter.status = query === "true";

      } else {

        filter.category = query;

      }

    }


    let options = {
      limit: Number(limit),
      page: Number(page),
      lean: true
    };


    // Ordenamiento por precio
    if (sort === "asc") {

      options.sort = {
        price: 1
      };

    }

    if (sort === "desc") {

      options.sort = {
        price: -1
      };

    }


    const result = await Product.paginate(
      filter,
      options
    );


    res.json({

      status: "success",

      payload: result.docs,

      totalPages: result.totalPages,

      prevPage: result.prevPage,

      nextPage: result.nextPage,

      page: result.page,

      hasPrevPage: result.hasPrevPage,

      hasNextPage: result.hasNextPage,

      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,

      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null

    });


  } catch (error) {

    res.status(500).json({
      status: "error",
      error: error.message
    });

  }

});



// Obtener producto por ID
router.get("/:pid", async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.pid
    );


    if (!product) {

      return res.status(404).json({
        error: "No encontrado"
      });

    }


    res.json(product);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Crear producto
router.post("/", async (req, res) => {

  try {

    const product = await Product.create(
      req.body
    );


    const io = req.app.get("io");


    if (io) {

      io.emit(
        "updateProducts",
        product
      );

    }


    res.status(201).json(product);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Actualizar producto
router.put("/:pid", async (req, res) => {

  try {

    const updated = await Product.findByIdAndUpdate(

      req.params.pid,

      req.body,

      {
        new: true
      }

    );


    if (!updated) {

      return res.status(404).json({
        error: "No encontrado"
      });

    }


    res.json(updated);


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});



// Eliminar producto
router.delete("/:pid", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.pid
    );


    res.json({
      message: "Producto eliminado"
    });


  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


export default router;