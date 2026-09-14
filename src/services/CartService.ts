import { commerce } from "@/lib/commerce";

export const CartService = {
  get: (cartId: string) => commerce.getCart(cartId),
  add: (cartId: string, productId: string, variantId: string, quantity = 1) =>
    commerce.addToCart(cartId, productId, variantId, quantity),
  updateQuantity: (cartId: string, lineId: string, quantity: number) =>
    commerce.updateCartLine(cartId, lineId, quantity),
  remove: (cartId: string, lineId: string) => commerce.removeFromCart(cartId, lineId),
};
