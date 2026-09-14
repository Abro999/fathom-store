import { CommerceProvider } from "./CommerceProvider";
import { categories } from "@/data/categories";
import { getAllProducts, getProductBySlug } from "@/data/products";
import { getReviewsForProduct } from "@/data/reviews";
import { Cart, CartLine, Customer, Order, Product, ProductFilters } from "@/lib/types";

// In-memory cart store keyed by cartId. In a real deployment this would
// live in a database or the commerce backend itself (Shopify Cart API,
// Odoo sale.order, etc.) — the shape below is what that swap needs to
// preserve so the frontend doesn't notice the difference.
const carts = new Map<string, Cart>();

function emptyCart(id: string): Cart {
  return { id, lines: [], subtotal: 0, currency: "USD" };
}

function recalculate(cart: Cart): Cart {
  cart.subtotal = cart.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  return cart;
}

function applyFilters(products: Product[], filters?: ProductFilters): Product[] {
  if (!filters) return products;
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.descriptor.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.minRating !== undefined) {
    result = result.filter((p) => p.rating >= filters.minRating!);
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.inventory > 0);
  }
  if (filters.onSaleOnly) {
    result = result.filter((p) => !!p.compareAtPrice && p.compareAtPrice > p.price);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => (b.badges?.includes("new") ? 1 : 0) - (a.badges?.includes("new") ? 1 : 0));
      break;
    default:
      break;
  }

  return result;
}

// Simulated network latency so loading/skeleton states are visible and
// realistic when this is swapped for a real remote API later.
const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

export class MockProvider implements CommerceProvider {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    await delay();
    return applyFilters(getAllProducts(), filters);
  }

  async getProduct(slug: string): Promise<Product | null> {
    await delay();
    return getProductBySlug(slug);
  }

  async getCategories() {
    await delay();
    return categories;
  }

  async getCategory(slug: string) {
    await delay();
    return categories.find((c) => c.slug === slug) ?? null;
  }

  async getReviews(productId: string) {
    await delay();
    return getReviewsForProduct(productId);
  }

  async searchProducts(query: string) {
    await delay(100);
    return applyFilters(getAllProducts(), { search: query });
  }

  async getCart(cartId: string): Promise<Cart> {
    await delay(80);
    return carts.get(cartId) ?? emptyCart(cartId);
  }

  async addToCart(cartId: string, productId: string, variantId: string, quantity: number): Promise<Cart> {
    await delay(120);
    const cart = carts.get(cartId) ?? emptyCart(cartId);
    const product = getAllProducts().find((p) => p.id === productId);
    if (!product) throw new Error("Product not found");
    const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

    const existing = cart.lines.find((l) => l.variantId === variant.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      const line: CartLine = {
        id: `line-${variant.id}-${Date.now()}`,
        productId: product.id,
        variantId: variant.id,
        productTitle: product.title,
        variantTitle: variant.title,
        image: product.images[0]?.url ?? "",
        price: variant.price,
        quantity,
        slug: product.slug,
      };
      cart.lines.push(line);
    }
    carts.set(cartId, recalculate(cart));
    return cart;
  }

  async updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
    await delay(80);
    const cart = carts.get(cartId) ?? emptyCart(cartId);
    const line = cart.lines.find((l) => l.id === lineId);
    if (line) {
      if (quantity <= 0) {
        cart.lines = cart.lines.filter((l) => l.id !== lineId);
      } else {
        line.quantity = quantity;
      }
    }
    carts.set(cartId, recalculate(cart));
    return cart;
  }

  async removeFromCart(cartId: string, lineId: string): Promise<Cart> {
    return this.updateCartLine(cartId, lineId, 0);
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    await delay();
    return null;
  }

  async createCheckout(cart: Cart): Promise<{ checkoutUrl: string }> {
    await delay(200);
    // A real provider returns the backend's hosted checkout URL here, e.g.
    // Shopify's `checkoutUrl` from the Storefront API cart mutation.
    return { checkoutUrl: "/checkout/mock?cart=" + cart.id };
  }

  async createOrder(cart: Cart, customer: Customer): Promise<Order> {
    await delay(200);
    return {
      id: `order-${Date.now()}`,
      lines: cart.lines,
      total: cart.subtotal,
      currency: cart.currency,
      status: "pending",
    };
  }
}
