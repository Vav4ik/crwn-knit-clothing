import React, { FC } from "react";

import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import { CartItemType } from "../../store/cart/cart.types";

type CartItemProps = {
  cartItem: CartItemType;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
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
