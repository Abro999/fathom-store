"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartService } from "@/services/CartService";
import { Cart, Product, ProductVariant } from "@/lib/types";

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => void;
  lineCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_ID_KEY = "dropera_cart_id";

function getOrCreateCartId(): string {
  if (typeof window === "undefined") return "server-cart";
  let id = window.localStorage.getItem(CART_ID_KEY);
  if (!id) {
    id = `cart-${crypto.randomUUID()}`;
    window.localStorage.setItem(CART_ID_KEY, id);
  }
  return id;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = getOrCreateCartId();
    setCartId(id);
    CartService.get(id).then(setCart);
  }, []);

  const addItem = useCallback(
    async (product: Product, variant: ProductVariant, quantity = 1) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const updated = await CartService.add(cartId, product.id, variant.id, quantity);
        setCart({ ...updated });
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const updated = await CartService.updateQuantity(cartId, lineId, quantity);
        setCart({ ...updated });
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const updated = await CartService.remove(cartId, lineId);
        setCart({ ...updated });
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const clearCart = useCallback(() => {
    const newId = `cart-${crypto.randomUUID()}`;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CART_ID_KEY, newId);
    }
    setCartId(newId);
    setCart({ id: newId, lines: [], subtotal: 0, currency: cart?.currency ?? "INR" });
  }, [cart]);

  const lineCount = useMemo(
    () => cart?.lines.reduce((sum, l) => sum + l.quantity, 0) ?? 0,
    [cart]
  );

  const value: CartContextValue = {
    cart,
    isOpen,
    isLoading,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    lineCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
