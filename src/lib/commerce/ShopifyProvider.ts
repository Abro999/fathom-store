import { CommerceProvider } from "./CommerceProvider";
import {
  Cart,
  Category,
  Customer,
  Order,
  Product,
  ProductFilters,
  Review,
} from "@/lib/types";

/**
 * ShopifyProvider — implementation stub.
 *
 * When ready to go live on Shopify:
 * 1. Create a Storefront API access token in the Shopify admin.
 * 2. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN as env vars
 *    (server-side only — never expose the token to the client).
 * 3. Implement each method below using GraphQL queries against
 *    https://{domain}/api/2024-10/graphql.json, mapping Shopify's
 *    Product/ProductVariant/Cart types onto the shared types in
 *    src/lib/types.ts.
 * 4. Flip COMMERCE_PROVIDER=shopify in .env and commerce/index.ts will
 *    pick this class up automatically — no component changes needed.
 */
export class ShopifyProvider implements CommerceProvider {
  private domain: string;
  private token: string;

  constructor() {
    this.domain = process.env.SHOPIFY_STORE_DOMAIN ?? "";
    this.token = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";
  }

  private async storefrontQuery<T>(_query: string, _variables?: Record<string, unknown>): Promise<T> {
    throw new Error(
      "ShopifyProvider is a stub. Implement storefrontQuery() with a fetch() call to the Shopify Storefront GraphQL API."
    );
  }

  async getProducts(_filters?: ProductFilters): Promise<Product[]> {
    throw new Error("Not implemented — map Shopify `products` query to Product[]");
  }
  async getProduct(_slug: string): Promise<Product | null> {
    throw new Error("Not implemented — map Shopify `productByHandle` to Product");
  }
  async getCategories(): Promise<Category[]> {
    throw new Error("Not implemented — map Shopify `collections` to Category[]");
  }
  async getCategory(_slug: string): Promise<Category | null> {
    throw new Error("Not implemented — map Shopify `collectionByHandle` to Category");
  }
  async getReviews(_productId: string): Promise<Review[]> {
    throw new Error("Not implemented — pull from a reviews app's metafields or a 3rd-party reviews API");
  }
  async searchProducts(_query: string): Promise<Product[]> {
    throw new Error("Not implemented — map Shopify `search` query to Product[]");
  }
  async getCart(_cartId: string): Promise<Cart> {
    throw new Error("Not implemented — map Shopify `cart` query to Cart");
  }
  async addToCart(): Promise<Cart> {
    throw new Error("Not implemented — Shopify `cartLinesAdd` mutation");
  }
  async updateCartLine(): Promise<Cart> {
    throw new Error("Not implemented — Shopify `cartLinesUpdate` mutation");
  }
  async removeFromCart(): Promise<Cart> {
    throw new Error("Not implemented — Shopify `cartLinesRemove` mutation");
  }
  async getCustomer(_customerId: string): Promise<Customer | null> {
    throw new Error("Not implemented — Shopify Customer Account API");
  }
  async createCheckout(_cart: Cart): Promise<{ checkoutUrl: string }> {
    throw new Error("Not implemented — return cart.checkoutUrl from `cartCreate`/`cartLinesAdd`");
  }
  async createOrder(): Promise<Order> {
    throw new Error(
      "Not applicable — Shopify creates the order via its own hosted checkout; listen for the order webhook instead."
    );
  }
}
