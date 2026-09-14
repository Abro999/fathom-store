# Fathom — premium curated storefront

"Objects worth finding." A Next.js 14 (App Router) + TypeScript + Tailwind storefront
built for a mixed-category dropshipping/curated brand, architected so the commerce
backend (Shopify / Odoo / WooCommerce / custom) can be swapped in later without
rebuilding the frontend.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site runs entirely on mock data out of the box —
no backend, no API keys needed to see everything working (browsing, filtering,
cart, checkout redirect stub).

## How to add your own products (right now, with no backend)

Products live in one file: `src/data/products.ts`. Each product is a plain
object shaped like this:

```ts
{
  id: "p-17",
  slug: "your-product-slug",        // used in the URL /product/your-product-slug
  title: "Product Name",
  descriptor: "Short one-line hook shown on cards",
  description: "Longer paragraph shown on the product page",
  images: [ { id: "img-1", url: "https://...", alt: "..." } ],
  price: 49,
  compareAtPrice: 65,               // optional, shows a strikethrough + discount %
  currency: "USD",
  variants: [
    { id: "v-17a", title: "Black", price: 49, sku: "SKU-1", inventory: 20, options: { Color: "Black" } },
  ],
  options: [{ name: "Color", values: ["Black"] }],
  inventory: 20,
  rating: 4.7,
  reviewCount: 50,
  category: "tech",                 // must match a slug in src/data/categories.ts
  tags: ["featured"],
  badges: ["new"],                  // "new" | "bestseller" | "limited" | "low-stock"
  shipping: "Free shipping, arrives in 3–5 business days.",
  specifications: [{ label: "Material", value: "..." }],
  features: ["...", "..."],
  faqs: [{ question: "...", answer: "..." }],
}
```

Add as many objects as you like to the `products` array — the shop grid,
homepage sections, search, and product pages all read from this same source
automatically. No other files need to change.

**Since this is a dropshipping store**, once you've picked a supplier, you have
two options:

1. **Manual, for a small catalog**: copy each supplier product's title, images,
   price, and description into the shape above.
2. **Automatic, for a larger catalog**: connect a real commerce backend (below)
   and its admin panel becomes where you manage products — no code edits at all.

## Swapping in a real commerce backend later

Nothing in `/src/app` or `/src/components` talks to Shopify/Odoo directly. It
all goes through one interface: `src/lib/commerce/CommerceProvider.ts`. Three
implementations exist:

- `MockProvider.ts` — what runs today, backed by `src/data/*`
- `ShopifyProvider.ts` — a stub with method-by-method notes on which Shopify
  Storefront API call maps to which method
- `OdooProvider.ts` — a stub with the equivalent Odoo JSON-RPC mapping

To go live on Shopify, for example:

1. Create a Storefront API access token in your Shopify admin.
2. Fill in `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_TOKEN` in `.env`.
3. Implement the methods in `ShopifyProvider.ts` (each one has a comment
   describing the exact GraphQL query/mutation it needs).
4. Set `COMMERCE_PROVIDER=shopify` in `.env`.

That's it — `src/lib/commerce/index.ts` is the only file that decides which
provider is active, and every page/component already imports from there.

WooCommerce would follow the same pattern: create a `WooCommerceProvider.ts`
implementing the same interface against the WooCommerce REST API.

## Payment gateway

This frontend **never handles card numbers directly** — that's intentional,
both for PCI compliance and to keep the codebase simple. `CheckoutService.ts`
hands off to whichever backend is connected:

- **Shopify**: `createCheckout()` returns Shopify's own hosted checkout URL —
  Shopify handles payment collection entirely.
- **Odoo**: `createCheckout()` would return an Odoo customer-portal payment link.
- **Custom backend / no commerce platform**: use **Stripe Checkout** (recommended
  default — good India + international support, simplest integration). Add a
  Next.js API route at `src/app/api/checkout/route.ts` that creates a Stripe
  Checkout Session server-side (using `STRIPE_SECRET_KEY` from `.env`, never
  exposed to the client) and returns its URL; have `CheckoutService.start()`
  call that route instead of `commerce.createCheckout()`. Razorpay or PayPal
  can replace Stripe the same way — swap the one API route, nothing else
  changes.

Right now, `/cart` → Checkout redirects to a mock URL (`/checkout/mock?...`)
so you can see the full flow without any payment account set up.

## Project structure

```
src/
  app/                 Next.js App Router pages (/, /shop, /product/[slug], /cart, ...)
  components/
    layout/            Header, Footer, CartDrawer, SearchOverlay, MobileNav
    home/               Homepage sections (Hero, TrendingRail, WhyUs, BestSellers, ...)
    product/            ProductCard, ProductGrid, ProductGallery, ProductInfo, ...
    shop/               ShopClient, FilterDrawer
    ui/                 Button, Badge, Drawer, Modal, Accordion, Toast, Skeleton, ...
  context/              CartContext (client-side cart state)
  data/                 Mock products, categories, reviews — EDIT THESE to change your catalog
  lib/
    types.ts            Shared Product/Variant/Cart types (Shopify/Odoo-compatible shape)
    commerce/            CommerceProvider interface + Mock/Shopify/Odoo implementations
  services/             ProductService, CartService, CheckoutService, etc. — thin
                         use-case wrappers the UI calls instead of the provider directly
```

## Design system

Brand tokens live as CSS variables in `src/app/globals.css` and are mapped
into Tailwind in `tailwind.config.ts`:

- Colors: `ink` (dark sections), `paper`/`cream` (light sections), `brass`
  (accent), `teel` (secondary), `charcoal` (body text)
- Type: **Fraunces** (display/serif headlines) + **Space Grotesk** (UI/body)
- Radius: mostly square-edged cards with hairline borders; pill shape
  reserved for buttons and filter chips

Change any of these tokens once and the whole site updates — no component
has a hard-coded color or font.

## Deployment

Frontend-only, so it deploys cleanly to **Vercel** (recommended — zero config
for Next.js), Netlify, or Cloudflare Pages. The commerce backend (Shopify/
Odoo/WooCommerce) stays external; only its API credentials live in your
hosting provider's environment variables.

```bash
npm run build
npm run start   # or deploy the repo directly to Vercel
```

## What's implemented vs. what's a stub

**Fully working today:** browsing, category filtering, sorting, search,
product variants, cart (add/update/remove, persisted via localStorage cart
id), responsive mobile nav + bottom tab bar, wishlist icon (UI only, not
persisted), newsletter form (UI only, no email provider wired), reviews
display, countdown-based limited drop section, SEO metadata + structured
data + sitemap/robots.

**Intentionally stubbed (documented, not faked):** Shopify/Odoo providers,
real payment collection, real email delivery for the contact form and
newsletter, wishlist persistence, customer accounts/login. Each stub has
comments explaining exactly what to implement and where.
