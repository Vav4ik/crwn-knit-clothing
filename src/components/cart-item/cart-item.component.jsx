import React from "react";

import { CartItemContainer, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img alt={name} src={imageUrl} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x £{price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
