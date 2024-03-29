import React, { FC } from "react";

import {
  CategoryPreviewContainer,
  Preview,
  TitleLink,
} from "./category-preview.styles";

import ProductCard from "../product-card/product-card.component";
import { ItemType } from "../../store/categories/categories.types";

type CategoryPreviewProps = {
  title: string;
  products: ItemType[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <TitleLink to={title}>{title.toUpperCase()}</TitleLink>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
