import { Link, useLocation } from "react-router-dom";
import "./index.css";

function CineMateNavigation() {
  const links = ["Home", "Movies", "TV Shows"];

  const { pathname } = useLocation();
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-light"> 
{/* fixed-top */}

  <div className="container-fluid">

    <a class="navbar-brand" href="#">
      CineMate
    </a>

    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>


    <div class="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    {links.map((link, index) => (
        <li className="nav-item">
        <Link
          key={index}
          to={`/CineMate/${link}`}
          className={`nav-link ${pathname.includes(link) && "active"}`}
        >
          {link}
        </Link>
        </li>
      ))}
    </ul>


      <form className="d-flex input-group w-auto">
        <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-primary" type="button" data-mdb-ripple-color="dark">
          Search
        </button>
      </form>
      <ul class="navbar-nav mb-2 mb-lg-0">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle hidden-arrow" href="#" id="navbarDropdown" role="button"
            data-mdb-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-bell"></i>
          </a>

          <ul class="dropdown-menu dropdown-menu-end notifications-list p-1" aria-labelledby="navbarDropdown">
            <li>
              <div class="row">
                <div class="col-md">
                  <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg" height='63' width='auto'
                    class="d-block" alt="..." />
                </div>
                <div class="col-md">
                  <p class="h6 mb-0">New</p>
                  <p class="h6 mb-1">Movie title</p>
                  <span class="small">Today</span>
                </div>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <div class="row">
                <div class="col-md">
                  <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(10).jpg" height='63' width='auto'
                    class="d-block" alt="..." />
                </div>
                <div class="col-md">
                  <p class="h6 mb-0">New</p>
                  <p class="h6 mb-1">Movie title</p>
                  <span class="small">Today</span>
                </div>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <div class="row">
                <div class="col-md">
                  <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(11).jpg" height='63' width='auto'
                    class="d-block" alt="..." />
                </div>
                <div class="col-md">
                  <p class="h6 mb-0">New</p>
                  <p class="h6 mb-1">Movie title</p>
                  <span class="small">Today</span>
                </div>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <div class="row">
                <div class="col-md">
                  <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(20).jpg" height='63' width='auto'
                    class="d-block" alt="..." />
                </div>
                <div class="col-md">
                  <p class="h6 mb-0">New</p>
                  <p class="h6 mb-1">Movie title</p>
                  <span class="small">Today</span>
                </div>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <div class="row">
                <div class="col-md">
                  <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(5).jpg" height='63' width='auto'
                    class="d-block" alt="..." />
                </div>
                <div class="col-md">
                  <p class="h6 mb-0">New</p>
                  <p class="h6 mb-1">Movie title</p>
                  <span class="small">Today</span>
                </div>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <div class="row">
                <div class="col-md">
                  <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg" height='63' width='auto'
                    class="d-block" alt="..." />
                </div>
                <div class="col-md">
                  <p class="h6 mb-0">New</p>
                  <p class="h6 mb-1">Movie title</p>
                  <span class="small">Today</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown"
            aria-expanded="false">
            <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(2).jpg" class="rounded-circle img-fluid"
              height='25' width='25'/>
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-1" aria-labelledby="navbarDropdown">
            <li class="my-2 d-flex align-items-center"><img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg" class="rounded-circle img-fluid me-1"
                height='25' width='25'/><span> User 1</span></li>
            <li class="my-2 d-flex align-items-center"><img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(6).jpg" class="rounded-circle img-fluid me-1"
                height='25' width='25'/><span> User 2</span></li>
            <li class="my-2 d-flex align-items-center"><img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg" class="rounded-circle img-fluid me-1"
                height='25' width='25'/><span> User 3</span></li>
            <li><a class="dropdown-item" href="#">Manage Profilses</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li><a class="dropdown-item" href="#">Your Account</a></li>
            <li><a class="dropdown-item" href="#">Help</a></li>
            <li><a class="dropdown-item" href="#">Log Out</a></li>
          </ul>
        </li>
      </ul>

    </div>

  </div>

</nav>

    </div>
    
  );
}
export default CineMateNavigation;
