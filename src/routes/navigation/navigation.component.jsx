import { Fragment, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const activeStyle = { borderBottom: "2px solid black" };

  const { currentUser } = useContext(UserContext);

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
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <NavLink
              to="/auth"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              SIGN IN
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
