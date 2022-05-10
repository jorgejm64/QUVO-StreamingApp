const router = require("express").Router();
const Movie = require("../models/Movie");
const Serie = require("../models/Serie");
const { verify } = require("../verifyToken");

//SEARCH
router.get("/", verify, async (req, res) => {
//Parametros de búsqueda
  const searchQuery = req.query.q;
  const typeMedia = req.query.type;

  if (verify) {
    try {
      if (typeMedia === "movie") {
        const movies = await Movie.aggregate([
          {
            $search: {
              index: "MovieTitle",
              text: {
                query: searchQuery,
                path: "title",
              },
            },
          },
        ]);
        res.status(201).json(movies);
      }

      if (typeMedia === "serie") {
        const series = await Serie.aggregate([
          {
            $search: {
              index: "SeriesTitle",
              text: {
                query: searchQuery,
                path: "title",
              },
            },
          },
        ]);
        res.status(201).json(series);
      }

      if (!typeMedia || typeMedia === "") {
          const movies = await Movie.aggregate([
            {
              $search: {
                index: "MovieTitle",
                text: {
                  query: searchQuery,
                  path: "title",
                },
              },
            },
          ]);
          const series = await Serie.aggregate([
            {
              $search: {
                index: "SeriesTitle",
                text: {
                  query: searchQuery,
                  path: "title",
                },
              },
            },
          ]);
    
          res.status(201).json(Object.assign(movies, series));
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
