import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const nav=useNavigate();
  const handleLogout=(e: any)=>{
    e.preventDefault();
    localStorage.removeItem('currUser');
    nav('/login');
  }
  const currentUser = useSelector((state: any) => state.users.currentUser);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border border-2 border-bottom border-gray">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <img src="/assets/user.png" alt="user" className="ms-4" width={40} />
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser? currentUser?.name: "User name"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <img src="/assets/" alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
