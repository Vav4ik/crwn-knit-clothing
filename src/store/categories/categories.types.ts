export type ItemType = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
  };
  
  export type CategoryType = {
    title: string;
    items: ItemType[];
  };
  
  export type CategoriesMapType = {
    [key: string]: ItemType[];
  }