import { commerce } from "@/lib/commerce";

export const CustomerService = {
  get: (customerId: string) => commerce.getCustomer(customerId),
};
