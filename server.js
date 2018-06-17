const express = require("express");
const bodyParser = require("body-parser");
const { Actor, Movie, Sequelize } = require("./db");
const Op = Sequelize.Op;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/movie/search", async (req, res) => {
  const title = req.body.title;
  const actor = req.body.actor;
  const genre = req.body.genre;
  let movies;
  if (actor) {
    const actors = await Actor.findAll({
      where: {
        name: {
          [Op.iLike]: `%${actor}%`
        }
      }
    });
    movies = await Movie.findAll({
      where: {
        actsIn: actors
      }
    });
  }
  if (title && genre) {
    movies = await Movie.findAll({
      where: {
        [Op.and]: [
          {
            title: {
              [Op.iLike]: `%${title}%`
            }
          },
          {
            genre: genre
          }
        ]
      }
    });
  } else if (title) {
    movies = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`
        }
      }
    });
  } else if (genre) {
    movies = await Movie.findAll({
      where: {
        genre
      }
    });
  } else {
    movies = await Movie.findAll();
  }
  res.json({ movies });
  return;
});

app.post("/api/movie", async (req, res) => {
  const title = req.body.title;
  const actors = req.body.actors;
  const genre = req.body.genre;
  if (!title) {
    res.json({
      error: "Missing required parameter `title`"
    });
    return;
  }
  const movie = await Movie.create(
    {
      title: title,
      genre: genre,
      Actors: actors
    },
    {
      include: [
        {
          model: Actor,
          as: "Actors"
        }
      ]
    }
  );
  res.json({ movie });
});

app.get("/api/actors", async (req, res) => {
  const name = req.query.name;
  const actors = await Actor.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    }
  });
  res.json({ actors });
  return;
});

app.post("/api/actors/", async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.json({
      error: "Missing required parameter `name`"
    });
    return;
  }
  const actor = await Actor.create({
    name
  });
  res.json({ actor });
  return;
});

app.listen(3030, function() {
  console.log("Started on PORT 3030");
});
