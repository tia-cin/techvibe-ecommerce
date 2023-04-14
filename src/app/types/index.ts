export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  image: any;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

export interface Product {
  _id: number;
  name: string;
  price: number;
  category: string;
  details: string;
  image: string;
  slug: { current: string };
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
