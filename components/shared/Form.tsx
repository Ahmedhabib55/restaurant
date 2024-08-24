"use client";
import { useStore } from "@/context/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useForm, FieldValues } from "react-hook-form";

interface FormProps {
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ onClose }) => {
  const { cart, dispatch } = useStore();
  const itemsWithQuantity = cart
    .filter((item) => item.quantity > 0)
    .map((item) => ({
      name: item.name,
      quantity: item.quantity,
    }));
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0
  );

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const submit = async (formData: FieldValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const { name, phone, address, order, totalPrice } = formData;
      const res = await fetch("https://tutlab-ay.vercel.app/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          order,
          totalPrice,
          spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Full error response:", errorData); // Log full error response
        throw new Error(errorData.message || "Failed to submit form");
      }
      onClose();
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
      dispatch({ type: "store/clearCart" });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mx-auto w-[300px] space-y-4 rounded-lg bg-white/20 p-6 shadow-lg backdrop-blur-lg">
        <div>
          <input
            placeholder="الاسم"
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:outline-none "
          />
          {errors.name && <p className="text-red-500">الاسم مطلوب</p>}
        </div>
        <div>
          <input
            placeholder="رقم الهاتف"
            type="tel"
            id="phone"
            {...register("phone", {
              required: true,
              pattern: /^(010|011|012|015)\d{8,9}$/,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:outline-none"
          />
          {errors.phone && <p className="text-red-500">رقم الهاتف مطلوب</p>}
        </div>
        <div>
          <input
            placeholder=" فين المكان"
            type="text"
            {...register("address", {
              required: true,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:outline-none"
          />
          {errors.address && <p className="text-red-500">المكان مطلوب</p>}
        </div>
        <div>
          <input
            type="text"
            id="order"
            value={itemsWithQuantity.map((item) => item.name).join(", ")}
            {...register("order")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:outline-none"
          />
        </div>
        <div>
          <input
            placeholder="السعر الإجمالي"
            type="text"
            id="totalPrice"
            value={totalPrice}
            {...register("totalPrice", {})}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:outline-none"
          />
        </div>
        {errorMessage && (
          <div className="text-center text-red-500">{errorMessage}</div>
        )}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 px-4 py-2 text-white hover:from-pink-600 hover:via-orange-500 hover:to-yellow-400 disabled:opacity-50"
          >
            {isSubmitting ? "جاري التأكيد..." : "تأكيد"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
