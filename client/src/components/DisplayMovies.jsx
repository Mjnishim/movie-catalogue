import React from "react";

function DisplayMovies(props) {
  const { movies } = props;

  const movieRows = movies.map((movie, idx) => (
    <tr key={idx}>
      <td>{movie.title}</td>
      <td>{movie.genre}</td>
      <td>{movie.subgenre}</td>
    </tr>
  ));

  return (
    <table style={{marginLeft: "15px"}}>
      <thead>
        <tr>
          <th colSpan="5">
            <h3>Selected movies</h3>
          </th>
        </tr>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Subgenre</th>
        </tr>
      </thead>
      <tbody>
        {movieRows}
      </tbody>
    </table>
  );
}
export default DisplayMovies;
