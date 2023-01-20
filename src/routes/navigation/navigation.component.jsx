import { Fragment } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

const Navigation = () => {
  const activeStyle = { borderBottom: "2px solid black" };

  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <NavLink
            to="/shop"
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            SHOP
          </NavLink>
          <NavLink
            to="/sign-in"
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            SIGN IN
          </NavLink>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
