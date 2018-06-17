const Sequelize = require("sequelize");
const sequelize = new Sequelize("movie", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

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

sequelize.sync(function(err) {});

module.exports = {
  Actor,
  Movie,
  sequelize,
  Sequelize
};
