import { faker } from "@faker-js/faker";
import { Datasource } from "./datasource";
import { CartModel, PriceModel, ProductModel, ProductOfferModel } from "./models";
import { SimpleProductInput } from "./types";

let counter: number = 1;

interface AddProductOptions {
  cartId?: string;
  product: SimpleProductInput;
}

interface CartDTO {
  id: number;
  product: ProductModel[];
}


const datasource = new Datasource();

export class CartService {


 async addProduct(data: AddProductOptions) {
    const { cartId} = data;
    let cart: CartModel;

    if (cartId) {
      cart = await datasource.get<CartModel>(`/carts/${cartId}`)
    } else {
      cart = {
        id: faker.string.uuid(),
        items: [],
      }
    }

    cart.items?.push({
      id: faker.string.uuid(),
      product: {
        sku: data.product.sku,
      },
      qty: data.product.qty,
    });

    datasource.post('/carts', cart)
    return cart;
  }

  async getById(cartId: string | null | undefined): Promise<CartModel | null>{
    if (!cartId) {
      return null;
    }
    return await datasource.get(`/carts/${cartId}`);
  }
}

