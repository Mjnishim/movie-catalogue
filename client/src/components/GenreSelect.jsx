import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const GenreSelect = (props) => (
  <FormControl style={{ minWidth: "120px" }}>
    <InputLabel htmlFor="genre-simple">Genre</InputLabel>
    <Select
      value={props.value}
      onChange={props.handleChange}
      inputProps={{
        name: "genre",
        id: "genre-simple"
      }}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="Action">Action</MenuItem>
      <MenuItem value="Adventure">Adventure</MenuItem>
      <MenuItem value="Comedy">Comedy</MenuItem>
      <MenuItem value="Crime">Crime</MenuItem>
      <MenuItem value="Drama">Drama</MenuItem>
      <MenuItem value="Historical">Historical</MenuItem>
      <MenuItem value="Horror">Horror</MenuItem>
      <MenuItem value="Musical/Dance">Musical/Dance</MenuItem>
      <MenuItem value="Romance">Romance</MenuItem>
      <MenuItem value="Sci-fi">Sci-fi</MenuItem>
      <MenuItem value="War">War</MenuItem>
      <MenuItem value="Western">Western</MenuItem>
    </Select>
  </FormControl>
)

export default GenreSelect;
