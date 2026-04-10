"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type { OrderState, OrderAction, Product } from "@/types";

const initialState: OrderState = {
  items: [],
  customerInfo: null,
  isDrawerOpen: false,
  isFormStep: false,
  isPaymentStep: false,
  isSubmitted: false,
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: action.quantity }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "TOGGLE_DRAWER":
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false, isFormStep: false, isPaymentStep: false };
    case "SET_FORM_STEP":
      return { ...state, isFormStep: action.isFormStep, isPaymentStep: false };
    case "SET_PAYMENT_STEP":
      return { ...state, isPaymentStep: action.isPaymentStep, isFormStep: false };
    case "SET_CUSTOMER_INFO":
      return { ...state, customerInfo: action.info };
    case "SUBMIT_ORDER":
      return { ...state, isSubmitted: true };
    case "RESET_ORDER":
      return initialState;
    default:
      return state;
  }
}

interface OrderContextValue {
  state: OrderState;
  dispatch: Dispatch<OrderAction>;
  totalItems: number;
  totalCost: number;
  addToOrder: (product: Product, qty?: number) => void;
  removeFromOrder: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  isInOrder: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalCost = state.items.reduce(
    (sum, i) => sum + i.product.unitPrice * i.quantity,
    0
  );

  const addToOrder = (product: Product, qty = 1) => {
    dispatch({ type: "ADD_ITEM", product, quantity: qty });
  };

  const removeFromOrder = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  };

  const updateQuantity = (productId: string, qty: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity: qty });
  };

  const toggleDrawer = () => dispatch({ type: "TOGGLE_DRAWER" });
  const openDrawer = () => dispatch({ type: "OPEN_DRAWER" });
  const closeDrawer = () => dispatch({ type: "CLOSE_DRAWER" });

  const isInOrder = (productId: string) =>
    state.items.some((i) => i.product.id === productId);

  const getItemQuantity = (productId: string) =>
    state.items.find((i) => i.product.id === productId)?.quantity ?? 0;

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        totalItems,
        totalCost,
        addToOrder,
        removeFromOrder,
        updateQuantity,
        toggleDrawer,
        openDrawer,
        closeDrawer,
        isInOrder,
        getItemQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
