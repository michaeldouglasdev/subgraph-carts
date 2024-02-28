export interface CartModel {
  id: string;
  items: CartItemModel[];
  totalPrice?: number;
}

export interface CartItemModel {
  id: string;
  product: AddCartItemProductModel;
  qty: number;
}

export interface AddCartItemProductModel {
  sku: string;
}
export interface ProductModel {
  sku: string;
  price: PriceModel;
}

export interface PriceModel {
  value: number;
  label: string;
}
export interface ProductOfferModel {
  id: string;
  price: PriceModel;
}

