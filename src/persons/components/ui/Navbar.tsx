import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
// import { AuthContext } from "../../auth";
export const Navbar = () => {
  // const { state, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.warn("Logout!");
    // navigate(`/login`, {
    //   replace: true,
    // });
    // logout();
  };
  const [showToggle, setShowToggle] = useState(false);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          CRUD Personas
        </Link>

        <button
          onClick={() => setShowToggle(!showToggle)}
          className="navbar-toggler"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showToggle ? "show" : ""}`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLink
              className={({ isActive }) =>
                `nav-item nav-link ${isActive ? "active" : ""}`
              }
              to={`/persons`}
            >
              Ver Personas
            </NavLink>
            <NavLink className="nav-item nav-link" to={`/search`}>
              Buscar
            </NavLink>
            <NavLink className="nav-item nav-link" to={`/add`}>
              Agregar
            </NavLink>
          </div>
        </div>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-primary">
            {"Fabian Niclous"}
          </span>
          <button className="nav-item nav-link btn" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
