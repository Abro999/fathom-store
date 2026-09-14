import { CommerceProvider } from "./CommerceProvider";
import { Cart, Category, Customer, Order, Product, ProductFilters, Review } from "@/lib/types";

/**
 * OdooProvider — implementation stub.
 *
 * Odoo doesn't speak GraphQL out of the box; the common approach is:
 * 1. Expose product.template / product.product / sale.order over Odoo's
 *    JSON-RPC (or XML-RPC) API, or build a thin custom REST controller
 *    in an Odoo module that returns JSON shaped like src/lib/types.ts.
 * 2. Map product.template -> Product, product.product (variants) ->
 *    ProductVariant, product.category -> Category, sale.order -> Order.
 * 3. Cart can be modeled as a draft sale.order (state = 'draft') per
 *    session/customer.
 * 4. Set ODOO_URL, ODOO_DB, ODOO_API_KEY as server-side env vars and
 *    flip COMMERCE_PROVIDER=odoo in .env.
 */
export class OdooProvider implements CommerceProvider {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.ODOO_URL ?? "";
  }

  async getProducts(_filters?: ProductFilters): Promise<Product[]> {
    throw new Error("Not implemented — call Odoo JSON-RPC search_read on product.template");
  }
  async getProduct(_slug: string): Promise<Product | null> {
    throw new Error("Not implemented — search_read product.template by slug/default_code");
  }
  async getCategories(): Promise<Category[]> {
    throw new Error("Not implemented — search_read product.category");
  }
  async getCategory(_slug: string): Promise<Category | null> {
    throw new Error("Not implemented");
  }
  async getReviews(_productId: string): Promise<Review[]> {
    throw new Error("Not implemented — Odoo Website Reviews module or custom model");
  }
  async searchProducts(_query: string): Promise<Product[]> {
    throw new Error("Not implemented — search_read with a name/description domain filter");
  }
  async getCart(_cartId: string): Promise<Cart> {
    throw new Error("Not implemented — read draft sale.order and its order_line records");
  }
  async addToCart(): Promise<Cart> {
    throw new Error("Not implemented — create/update sale.order.line on the draft order");
  }
  async updateCartLine(): Promise<Cart> {
    throw new Error("Not implemented — write() on sale.order.line");
  }
  async removeFromCart(): Promise<Cart> {
    throw new Error("Not implemented — unlink() the sale.order.line");
  }
  async getCustomer(_customerId: string): Promise<Customer | null> {
    throw new Error("Not implemented — read res.partner");
  }
  async createCheckout(_cart: Cart): Promise<{ checkoutUrl: string }> {
    throw new Error("Not implemented — confirm the draft sale.order and return the portal payment link");
  }
  async createOrder(): Promise<Order> {
    throw new Error("Not implemented — action_confirm() on the sale.order");
  }
}
