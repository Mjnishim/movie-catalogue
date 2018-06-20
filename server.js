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
    movies = await Movie.findAll({
      include: [
        {
          model: Actor,
          as: "Actors",
          where: {
            name: {
              [Op.iLike]: `%${actor}%`
            }
          }
        }
      ]
    });
  } else if (title && genre) {
    movies = await Movie.findAll({
      where: {
        [Op.and]: [
          {
            title: {
              [Op.iLike]: `%${title}%`
            }
          },
          {
            [Op.or]: [{ genre }, { subgenre: genre }]
          }
        ]
      },
      include: [
        {
          model: Actor,
          as: "Actors"
        }
      ]
    });
  } else if (title) {
    movies = await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`
        }
      },
      include: [
        {
          model: Actor,
          as: "Actors"
        }
      ]
    });
  } else if (genre) {
    movies = await Movie.findAll({
      where: {
        [Op.or]: [{ genre }, { subgenre: genre }]
      },
      include: [
        {
          model: Actor,
          as: "Actors"
        }
      ]
    });
  } else {
    movies = await Movie.findAll({
      include: [
        {
          model: Actor,
          as: "Actors"
        }
      ]
    });
  }
  res.json({ movies });
  return;
});

app.post("/api/movie", async (req, res) => {
  const title = req.body.title;
  const actors = req.body.Actors;
  const genre = req.body.genre;
  const subgenre = req.body.subgenre;
  if (!title) {
    res.json({
      error: "Missing required parameter `title`"
    });
    return;
  }
  const actorObjects = await Actor.findAll({
    where: {
      id: {
        [Op.in]: actors.map(actor => actor.id)
      }
    }
  });
  const movie = await Movie.create({
    title: title,
    genre: genre,
    subgenre: subgenre
  });
  await movie.setActors(actorObjects);
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
