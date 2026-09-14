import { commerce } from "@/lib/commerce";
import { Cart, Customer } from "@/lib/types";

export const OrderService = {
  create: (cart: Cart, customer: Customer) => commerce.createOrder(cart, customer),
};
