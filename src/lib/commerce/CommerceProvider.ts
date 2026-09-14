import {
  Cart,
  CartLine,
  Category,
  Customer,
  Order,
  Product,
  ProductFilters,
  Review,
} from "@/lib/types";

/**
 * CommerceProvider is the single contract the entire frontend talks to.
 * Nothing in /components or /app should ever import Shopify, Odoo, or
 * WooCommerce specific code directly — only this interface.
 *
 * Swapping backends later means writing one new class that implements
 * this interface (see ShopifyProvider / OdooProvider stubs) and changing
 * one line in `commerce/index.ts`. No UI code changes.
 */
export interface CommerceProvider {
  // Catalog
  getProducts(filters?: ProductFilters): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | null>;
  getReviews(productId: string): Promise<Review[]>;
  searchProducts(query: string): Promise<Product[]>;

  // Cart
  getCart(cartId: string): Promise<Cart>;
  addToCart(
    cartId: string,
    productId: string,
    variantId: string,
    quantity: number
  ): Promise<Cart>;
  updateCartLine(
    cartId: string,
    lineId: string,
    quantity: number
  ): Promise<Cart>;
  removeFromCart(cartId: string, lineId: string): Promise<Cart>;

  // Customer / Checkout (stubs — real implementations delegate to the
  // commerce backend's own hosted checkout / customer accounts)
  getCustomer(customerId: string): Promise<Customer | null>;
  createCheckout(cart: Cart): Promise<{ checkoutUrl: string }>;
  createOrder(cart: Cart, customer: Customer): Promise<Order>;
}

export type CartLineInput = Pick<
  CartLine,
  "productId" | "variantId" | "quantity"
>;
