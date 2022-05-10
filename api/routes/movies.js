const router = require("express").Router();
const Movie = require("../models/Movie");
const { verify } = require("../verifyToken");
var shell = require('shelljs');

//CREATE
router.post("/create", verify, async (req, res) => {
  //Solo el admin puede crear peliculas o subirlas
  if (req.user.isAdmin) {
    //Tomamos los datos del body
    const newMovie = new Movie(req.body);

    try {
      //Guardamos los datos en BD
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);

      //Si hubiere error lo mostramos
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  //Solo el admin puede actualizar las pelicuals o series
  if (req.user.isAdmin) {
    try {
      //Realizamos el update en BD
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);

      //Si hubiere error lo mostramos
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  //Si el usuario es admin
  if (req.user.isAdmin) {
    //Delete a BD
    try {
      //Buscamos y eliminamos la pelicula o serie
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("La pelicula ha sido eliminada...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion (Eliminar)");
  }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM
router.get("/random", verify, async (req, res) => {
  //Seleccionar el tipo de media, serie o pelicula
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const genreQuery = req.query.genre;
  //Si el usuario es admin
  if (verify) {
    //Delete a BD
    try {
      if (genreQuery) {
        const movie = await Movie.aggregate([
          { $match: { genre: genreQuery } },
        ]);
        res.status(200).json(movie);
      } else {
        //Buscamos
        const movie = await Movie.find(req.params.id);
        res.status(200).json(movie.reverse());
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion (Listar)");
  }
});

//GET ALL
router.get("/files", verify, async (req, res) => {
  var array = [];
  //Si el usuario es admin
  if (req.user.isAdmin) {
    try {
      //El siguiente script nos genera un array con los diferentes archivos mpd
      shell.ls('-R', './content/data').forEach(function (file) {
        if (file.includes(".mpd")){
          array.push(file);
        }
      });
      res.status(201).json(array);

    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion (Listar)");
  }
});


module.exports = router;
