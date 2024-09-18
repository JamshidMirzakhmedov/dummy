import React, { createContext, useReducer, ReactNode } from "react";
import { Product } from "../Types/Types";

interface CartItem extends Product {
  quantity: number;
}

type CartState = CartItem[];

type CartAction =
  | { type: "ADD_TO_CART"; product: Product & { quantity: number } }
  | { type: "REMOVE_FROM_CART"; id: number };

export const CartStateContext = createContext<CartState | undefined>(undefined);
export const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find((item) => item.id === action.product.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    }
    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.id);
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};
