import { CommerceProvider } from "./CommerceProvider";
import { MockProvider } from "./MockProvider";
import { ShopifyProvider } from "./ShopifyProvider";
import { OdooProvider } from "./OdooProvider";

// The ONLY place backend choice is made. Everything else in the app
// imports `commerce` from here and never touches a specific provider.
function createProvider(): CommerceProvider {
  const backend = process.env.COMMERCE_PROVIDER ?? "mock";

  switch (backend) {
    case "shopify":
      return new ShopifyProvider();
    case "odoo":
      return new OdooProvider();
    case "mock":
    default:
      return new MockProvider();
  }
}

export const commerce: CommerceProvider = createProvider();
