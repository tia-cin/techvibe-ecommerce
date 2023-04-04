export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  image: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  details: string;
  image: string;
  slug: string;
}

export interface Banner {
  image: string | any;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
}
