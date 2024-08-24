"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface CartItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  // totalPrice: number;
  // Add other properties of cart items here
}

type Action =
  | { type: "store/setUser"; payload: string }
  | { type: "store/addToCart"; payload: CartItem }
  | { type: "store/removeFromCart"; payload: string }
  | { type: "store/increaseQuantity"; payload: string }
  | { type: "store/decreaseQuantity"; payload: string }
  | { type: "store/clearCart" }
  | { type: "store/setPhone"; payload: string }
  | { type: "store/setMessage"; payload: string }
  | { type: "store/setIsLoading"; payload: boolean };

interface StoreState {
  userName: string;
  userPhone: number;
  cart: CartItem[];
  isLoading: boolean;
  message: string;
  dispatch?: React.Dispatch<Action>;
}

const StoreContext = createContext<
  (StoreState & { dispatch: React.Dispatch<Action> }) | undefined
>(undefined);

const initialState: StoreState = {
  userName: "",
  userPhone: 0,
  cart: [],
  isLoading: false,
  message: "",
};

const reducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case "store/setUser":
      return { ...state, userName: action.payload };
    case "store/addToCart": {
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItemIndex !== -1) {
        return {
          ...state,
          cart: state.cart.map((item, index) =>
            index === existingItemIndex
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: (item.quantity + 1) * item.price, // Calculate total price based on price
                }
              : item
          ),
        };
      } else {
        // Ensure the new item has the correct totalPrice
        const newItem = {
          ...action.payload,
          totalPrice: action.payload.quantity * action.payload.price,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    case "store/removeFromCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case "store/increaseQuantity": {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        ),
      };
    }
    case "store/decreaseQuantity":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: (item.quantity - 1) * item.price, // Calculate total price based on price
              }
            : item
        ),
      };
    case "store/clearCart":
      return { ...state, cart: [] };
    case "store/setPhone":
      // @ts-ignore
      return { ...state, userPhone: action.payload };
    case "store/setMessage":
      return { ...state, message: action.payload };
    case "store/setIsLoading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [{ userName, userPhone, cart, isLoading, message }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <StoreContext.Provider
      value={{
        userName,
        userPhone,
        cart,
        isLoading,
        message,
        dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined)
    throw new Error("StoreContext was used outside of the StoreProvider");
  return context;
};
