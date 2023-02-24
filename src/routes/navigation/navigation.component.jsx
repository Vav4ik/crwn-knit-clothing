import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import {
  LogoContainer,
  NavgationLink,
  NavigationContainer,
  NavLinks,
} from "./navigation.styles";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
  // const activeStyle = { borderBottom: "2px solid black" };

  const currentUser  = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavgationLink to="/shop">SHOP</NavgationLink>
          {currentUser ? (
            <NavgationLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavgationLink>
          ) : (
            <NavgationLink to="/auth">SIGN IN</NavgationLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
