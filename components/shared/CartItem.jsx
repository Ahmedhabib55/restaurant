"use client";

import { useStore } from "@/context/store";
import { formatCurrencyEGP } from "@/utils/helpers";

function CartItem({ item }) {
  const { _id, name, quantity, price } = item;
  const { dispatch } = useStore();

  const handleIncreaseQuantity = (_id) => {
    dispatch({ type: "store/increaseQuantity", payload: _id });
  };

  const handleDecreaseQuantity = (_id) => {
    dispatch({ type: "store/decreaseQuantity", payload: _id });
  };

  const handleDeleteItem = (_id) => {
    dispatch({ type: "store/removeFromCart", payload: _id });
  };

  return (
    <li className="flex items-center justify-between gap-6 py-3">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4 sm:gap-6">
        <p className="mr-4 text-sm font-bold">
          {formatCurrencyEGP(price * quantity)}
        </p>

        <div
          className="cursor-pointer rounded-xl border p-2"
          onClick={() => handleIncreaseQuantity(_id)}
        >
          +
        </div>
        <span>{quantity}</span>
        <div
          className="cursor-pointer rounded-xl border p-2"
          onClick={() => handleDecreaseQuantity(_id)}
        >
          -
        </div>
        <button
          className="cursor-pointer rounded-xl border bg-gray-500 px-4 py-2 text-white"
          onClick={() => handleDeleteItem(_id)}
        >
          حذف
        </button>
      </div>
    </li>
  );
}

export default CartItem;
