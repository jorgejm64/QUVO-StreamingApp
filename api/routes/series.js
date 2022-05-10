const router = require("express").Router();
const Serie = require("../models/Serie");
const { verify } = require("../verifyToken");

//CREATE
router.post("/create", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newSerie = new Serie(req.body);
    try {
      const savedSerie = await newSerie.save();
      res.status(201).json(savedSerie);

    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No tienes permitido realizar esta accion");
  }
});

//GET A SINGLE SERIE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    res.status(200).json(serie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Serie.findByIdAndDelete(req.params.id);
      res.status(200).json("La serie ha sido eliminada...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No tienes permitido realizar esta accion (Eliminar)");
  }
});

//UPDATE
router.put("/update/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedSerie = await Serie.findByIdAndUpdate(req.params.id, 
        {
          $set: req.body,
        }, 
        {new: true}
      );
      res.status(200).json(updatedSerie);

    } catch(err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("No tienes permitido realizar esta accion");
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
        const series = await Serie.aggregate([
          { $match: { genre: genreQuery } },
        ]);
        res.status(200).json(series);
      } else {
        //Buscamos
        const series = await Serie.find(req.params.id);
        res.status(200).json(series.reverse());
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //Forbidden estado
    res.status(403).json("No tienes permitido realizar esta accion (Listar)");
  }
});

module.exports = router;
