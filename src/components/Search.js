//import axios from "axios"
import { useEffect, useState } from "react";
import mainRoute from "../api/mainRoute";
import APIkey from "../api/Key";
import { useHistory, useParams } from "react-router-dom";
import Card from "../content/Card";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import {FaSearch} from "react-icons/fa";
const Search = () => {
  const history = useHistory();
  const { search } = useParams();
  const [movies, setMovies] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [favorite, setFavorite] = useState([]);

  const user = useSelector(selectUser);

  const handleChange = (e) => {
    setSearchedName(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    mainRoute
      .get(`?apikey=${APIkey}&s=${searchedName}`)
      .then((res) => setMovies(res.data.Search))
      .then((movie) => {
        history.push(`/${searchedName}`);
      });
    setSearchedName("");
  };
  useEffect(() => {
    mainRoute.get(`?apikey=${APIkey}&s=${search}`).then((res) => res.data);
  }, []);

  const linkStyle = {
    margin: "6rem",
    textDecoration: "none",
    color: "white",
  };
  const handleAdd = (movie) => {

    axios
      .post(`/api/my/movies/${user.id}`, {
        name: movie.Title,
        year: movie.Year,
        imdbID: movie.imdbID,
        url: movie.Poster
      })
      .then((movie) => setFavorite(movie));
  };

  return (
    <div class="tile is-parent level-item has-text-centered">
      <div class="field">
        
      <input
     class="input is-rounded is-large"
        type="text"
        placeholder="Search a movie"
        value={searchedName}
        onChange={handleChange}
      ></input>
    
      <button class="button is-large" onClick={handleSearch}><FaSearch/></button>
      
        </div>
      <div className="columns is-multiline layout">
        {movies ? (
          movies.map((movie, i) => (
            <div className="column is-3" key={i}>
              <Card movie={movie} handleAdd={handleAdd} />
              {/* <button onClick={handleAdd}>Agregar</button> */}
            </div>
          ))
        ) : (
          <div className="content">
          <div class="field is-parent has-text-centered">
              <div class="field">
          <h1  style={linkStyle}>No hay datos</h1>
          </div>
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Search;
