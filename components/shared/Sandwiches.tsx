"use client";
import { useStore } from "@/context/store";
import { Sandwich } from "@/types";

const Sandwiches = ({
  title,
  arrayOfSandwich,
}: {
  title: string;
  arrayOfSandwich: Sandwich[];
}) => {
  const { dispatch } = useStore();

  function handleClick(id: string) {
    const foundSandwich = arrayOfSandwich.find(
      (sandwich) => sandwich._id === id
    );

    if (foundSandwich) {
      dispatch({
        type: "store/addToCart",
        payload: {
          _id: id,
          quantity: 1,
          name: foundSandwich.name,
          price: foundSandwich.price,
        },
      });
    }
  }

  return (
    <div className="direction-rtl relative mb-4  h-fit w-[300px] border border-dashed  border-gray-500 px-4  sm:w-[320px] lg:w-[350px]   ">
      <h3 className=" absolute right-3 top-[-18px] rounded-lg  bg-red-700 px-2 py-1 text-lg  font-semibold tracking-wide text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 pt-2 text-white">
        {arrayOfSandwich.map((sandwich) => (
          <li
            key={sandwich._id}
            onClick={() => handleClick(sandwich._id)}
            className="flex cursor-pointer items-center justify-between rounded-md p-3 transition-all delay-75 hover:bg-gray-950"
          >
            <div>
              <p className="text-xl">{sandwich.name}</p>

              {sandwich.ingredients && sandwich.ingredients.length > 0 && (
                <div className="flex items-center justify-center gap-1">
                  {sandwich.ingredients.map((ingredient) => (
                    <span key={ingredient} className="text-sm text-[#777]">
                      {ingredient}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span>{sandwich.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/*
sandiwtshatShabey
*/
export default Sandwiches;
