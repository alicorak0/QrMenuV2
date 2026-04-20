export interface Product {
  productId: number;
  categoryId: number;
  productName: string;
  description: string;
  tooltip: string;
  price: number;
  image: string;
  isFeatured: boolean;  
}