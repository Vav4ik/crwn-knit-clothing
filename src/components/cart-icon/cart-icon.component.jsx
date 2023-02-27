import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CartItemContainer,
  ItemCount,
  ShoppingBagIcon,
} from "./cart-icon.styles";

import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartItemContainer onClick={toggleIsCartOpen}>
      <ShoppingBagIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartItemContainer>
  );
};

export default CartIcon;
