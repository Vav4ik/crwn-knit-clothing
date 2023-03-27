import { ItemType } from "../categories/categories.types";

export type CartItemType = ItemType & {
  quantity: number;
};
