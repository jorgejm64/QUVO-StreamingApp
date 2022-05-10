const router = require("express").Router();
const List = require("../models/List");
const { verify } = require("../verifyToken");


//CREATE 
router.post("/", verify, async (req, res) => {
  //Solo el admin puede crear peliculas o subirlas
  if (req.user.isAdmin) {
    //Tomamos los datos del body
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion (Crear)")
  }
});


//DELETE
router.delete("/:id", verify, async (req, res) => {
  //Solo el admin puede crear peliculas o subirlas
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("La lista ha sido eliminada");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion (Eliminar)")
  }
});


//GET
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL
router.get("/all", verify, async (req, res) => {
  //Si el usuario es admin
  if (req.user.isAdmin) {
    //Delete a BD
    try {
      //Buscamos y eliminamos la pelicula o serie
      const lists = await List.find(req.params.id);
      res.status(200).json(lists.reverse());
    } catch(err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion (Listar)")
  }
});

module.exports = router;
