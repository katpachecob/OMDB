import { Link } from "react-router-dom";

const Card = ({ movie, i, handleAdd}) => {

  // console.log(favorite)
  return (
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by5">
          <Link to={`/${movie.Title}/${movie.imdbID}`}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://cdn3.vectorstock.com/i/1000x1000/12/87/building-construction-site-warning-sign-vector-2041287.jpg"
              }
              alt={movie.Title}
            />
          </Link>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <div className="media-content">
              <p class="title is-4" >{movie.Title}</p>
              <p class="subtitle is-6">{movie.Year}</p>
            </div>
            <button onClick={() => handleAdd(movie)}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
