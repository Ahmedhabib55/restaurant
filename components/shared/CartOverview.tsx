"use client";

import { useStore } from "@/context/store";
import { formatCurrencyEGP } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const CartOverview = () => {
  const { cart } = useStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0
  );

  if (!totalItems) return null;
  return (
    // <div className=" direction-rtl fixed inset-x-0 bottom-0 z-50 flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
    <div className=" direction-rtl fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border border-white/20 bg-white/30 p-3 text-sm uppercase text-stone-200 shadow-lg backdrop-blur-lg sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span className="ml-4">{totalItems} عنصر</span>
        <span>{formatCurrencyEGP(totalPrice)}</span>
      </p>
      <Link
        href="/cart"
        className="rounded-lg border border-solid px-4 py-2 text-xl text-stone-300 "
      >
        افتح السلة
      </Link>
    </div>
  );
};

export default CartOverview;
