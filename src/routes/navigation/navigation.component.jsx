import { Fragment } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <NavLink to="/shop" className="nav-link">
            SHOP
          </NavLink>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
