import React, { useState } from "react";
import { Link } from "gatsby";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <ul
          id="navMenu"
          className={` navbar-start has-text-centered navbar-menu ${
            isActive && "is-active"
          }`}
        >
          {/* TODO: inline override of padding is a result of refactoring
                to a ul for accessibilty purposes, would like to see a css
                re-write that makes this unneccesary.
             */}
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/disease-catalog">
              Disease Catalog
            </Link>
          </li>
          <li className="navbar-item" style={{ padding: "0px" }}>
            <Link className="navbar-item" to="/cell-line">
              Cell-line
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
