import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useHistory, useParams,Link } from "react-router-dom";
import {FaSearch} from "react-icons/fa";

const MyFavorite = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [movies, setMovie] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/my/movies/${id}`)
      .then((favoritas) => setMovie(favoritas.data));
  }, []);

  const handleDelete = (movie) => {
    console.log(movie["imdbID"]);
    axios
      .delete(`/api/my/movies/${user.id}`, {
        data: {
          imdbID: movie["imdbID"],
        },
      })
      .then((a) => axios.get(`/api/my/movies/${id}`))
      .then((favoritas) => setMovie(favoritas.data))
      .catch((e) => console.log(e));
  };

  const linkStyle = {
    margin: "6rem",
    textDecoration: "none",
    color: "white",
  };

  return (
    <div className="content columns is-multiline layout">
       
        
      {movies.length !== 0 ? (
        movies.map((movie) => (
            <div className="column is-4"> 
            <img src={movie["url"]} alt={movie["name"]}></img>
            <div className="card-content">
        <div className="media">
        <div className="media-left">
            <div className="media-content">
            <h1>{movie["name"]}</h1>
            <h1>{movie["year"]}</h1>
        </div>
        </div>
        </div>
        </div>
            <button onClick={() => handleDelete(movie)}>
              ELIMINAR DE FAVORITOS
            </button>
          </div>
        ))
      ) : (
          <div class="field is-parent has-text-centered">
              <div class="field">
        <h1  style={linkStyle}>No tienes películas favoritas <button class="button is-large"><Link to="/search"><FaSearch/></Link></button></h1>
        
        </div>
        </div>
      )}
      
    </div>

  );
};

export default MyFavorite;
