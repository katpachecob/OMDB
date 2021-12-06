import { useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import Logout from "./Logout";
import { useHistory } from "react-router";
import { BiMoviePlay } from "react-icons/bi";

const Navbar = () => {
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/me")
      .then((data) =>dispatch(login(data.data)))
      .then(() => history.push(`/`));
  }, []);

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "white",
  };

  return (
    <nav className="navbar has-background-dark	mb-4 ">
      <h1 className="navbar-item has-text-white is-fixed-top">
        <Link to="/" style={linkStyle}>
          <BiMoviePlay /> OMDB
        </Link>
      </h1>
      {user ? (
        <div className="navbar-item navbar-end">
          <button className="button is-ghost has-text-white">
            <Link to="/search">Movies</Link>
          </button>
          <button className="button is-ghost has-text-white">
            <Link to={`/my/movies/${user.id}`}>My favorite movie</Link>
          </button>
          <p className="has-text-white"></p>
          <span></span>
          <Logout />
        </div>
      ) : (
        <>
          <div className="navbar-item navbar-end">
            <div>

            <button class="button is-info is-inverted">
              <span>
              <Link to="/login"> 
              Log in
                </Link>
              </span>
            </button>
            </div>
            &nbsp;
            <div>
            <button class="button is-info is-inverted">
              <Link to="/register">Register</Link>
            </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
