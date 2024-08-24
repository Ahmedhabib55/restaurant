"use client";

import { useEffect, useRef, useState } from "react";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useStore } from "@/context/store";
import Link from "next/link";
import Form from "./Form";

function Cart() {
  const { cart, dispatch } = useStore();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleClearCart = () => {
    dispatch({ type: "store/clearCart" });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <Link href="/" className="flex items-center gap-2 text-base text-white">
        &larr; العودة إلى القائمة
      </Link>

      <ul className="mt-3 divide-y divide-stone-200 border-b text-white">
        {cart.map((item) => (
          <CartItem item={item} key={item._id} />
        ))}
      </ul>
      <div className="mb-4 mt-6 space-x-2 text-end">
        <p className="text-white ">المجموع: {totalPrice}</p>
      </div>

      <div className="mt-6 space-x-2">
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-md bg-gradient-to-r from-pink-500 via-orange-400  to-yellow-300 px-4 py-2 text-xl font-medium text-white"
        >
          تأكيد الطلب
        </button>

        <button
          className="rounded-md border border-gray-700 px-4 py-2 text-white"
          onClick={handleClearCart}
        >
          إفراغ السلة
        </button>
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-[rgba(80,73,73,0.22)] p-6 shadow-lg backdrop-blur-[6px]">
          <div ref={modalRef}>
            <Form onClose={() => setOpenModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
