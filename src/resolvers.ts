import { CartService } from "./services";
import { Resolvers } from "./types";

const cartService = new CartService();

export const resolvers: Resolvers = {
  Query: {
    cart: async (parent, args) => {
      const cart = await  cartService.getById(args.cartId);
      return cart;
    }
  },
  Mutation: {
    addProductToCart: (a, { data }) => {
      const cart = cartService.addProduct({
        cartId: data.cartId || undefined,
        product: data.product
      })

      return {
        code: 200,
        message: "Produto adicionado ao carrinho com sucesso!",
        success: true,
        cart
      }
    }
  },
  Cart: {
    totalPrice: (parent) => {

      /*const totalPrice = parent.items.map(item => item.product.price?.value).reduce((acc, value) => acc || 0 + (value || 0), 0) || 0;
      return {
        value: totalPrice,
        label: `${totalPrice}`
      }*/
      console.log('Cart totalPrice parent', JSON.stringify(parent))
      return {
        value: 0,
        label: ''
      }
    },
    __resolveReference: async (parent) => {
      return await cartService.getById(parent.id)
    }
  },
  CartItem: {
    product: (parent) => {

      return {sku: parent.product.sku,
         price: { value: 55, label: 'teste 55'}}
    },
    totalPrice: (parent, args) => {
      console.log("CartItem totalPrice parent", JSON.stringify(parent))
      return {
        value: 1,
        label: '1'
      }
    }
  },




  /*CartItem: {
    product: ({product}) => {
      return {sku: product.sku,
      price: product.price}
    }
  }*/
}