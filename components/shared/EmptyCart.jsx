import Link from "next/link";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <Link
        href="/"
        className="rounded-lg border px-4 py-2 text-base text-white"
      >
        &larr; العودة إلى القائمة
      </Link>

      <p className="mt-7 font-semibold text-white">
        سلة التسوق الخاصة بك فارغة. ابدأ بإضافة بعض المنتجات :)
      </p>
    </div>
  );
}

export default EmptyCart;
