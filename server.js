const express = require("express");
const app = express();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://movie:movie@localhost:5432/movie");

const Actor = sequelize.define("actor", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  }
});

const Movie = sequelize.define("movie", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  }
});

Actor.belongsToMany(Movie, { as: "Movies", through: "actsIn" });
Movie.belongsToMany(Actor, { as: "Actors", through: "actsIn" });

app.get("/api/movie", (req, res) => {
  const param = req.query.search;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

app.post("/api/movie", (req, res) => {
  const title = req.query.title;
  const actors = req.query.actors;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }
