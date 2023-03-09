import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  LogoContainer,
  NavgationLink,
  NavigationContainer,
  NavLinks,
} from "./navigation.styles";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch()

  const currentUser  = useSelector(selectCurrentUser);
  const isCartOpen  = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart())

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
