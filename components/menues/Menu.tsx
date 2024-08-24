"use client";
import { useState } from "react";
import {
  ciribat,
  drinks,
  fateer,
  filterMenu,
  sandiwtshatLahma,
  sandiwtshatShabey,
  suriRul,
  talab,
} from "@/constants";
import Sandwiches from "../shared/Sandwiches";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <div className="relative mx-auto flex w-fit items-center justify-center gap-4 rounded border border-gray-600  px-3 py-4 text-white ">
        <div className="absolute left-3 top-[-21px]  h-[26px] w-fit bg-black ">
          <h3 className=" rounded-md  bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text px-4 py-2 text-center text-base font-bold text-transparent ">
            Menu
          </h3>
        </div>
        <nav
          id="menu"
          className="flex h-16 items-center justify-center text-white"
        >
          <ul className="direction-rtl flex items-center justify-center gap-2 sm:gap-4">
            {filterMenu.map((item) => (
              <li
                onClick={() => handleCategoryClick(item.category)}
                key={item.category}
                className={`${
                  selectedCategory === item.category
                    ? "border-2 border-orange-400 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-base text-transparent sm:text-xl"
                    : "text-white"
                } cursor-pointer text-nowrap rounded-md border border-solid border-gray-600 px-3  py-[6px] text-center text-sm font-bold text-transparent sm:px-4  sm:py-2 `}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="direction-rtl container mx-auto mt-10">
        <div className="mb-10 flex flex-wrap justify-center gap-4 ">
          {(selectedCategory === "all" ||
            selectedCategory === "shabey" ||
            selectedCategory === "talab") && (
            <>
              <Sandwiches
                title="شندوتشات شعبي"
                arrayOfSandwich={sandiwtshatShabey}
              />
              <Sandwiches title="طلبات" arrayOfSandwich={talab} />
              <Sandwiches title="" arrayOfSandwich={fateer} />
            </>
          )}

          {(selectedCategory === "all" ||
            selectedCategory === "lahma" ||
            selectedCategory === "suri_rul_ciribat") && (
            <>
              <Sandwiches
                title="شندوتشات "
                arrayOfSandwich={sandiwtshatLahma}
              />
              <Sandwiches title="سوري رول" arrayOfSandwich={suriRul} />
              <Sandwiches title=" كريبات" arrayOfSandwich={ciribat} />
            </>
          )}

          {(selectedCategory === "all" || selectedCategory === "drinks") && (
            <Sandwiches title="المشروبات" arrayOfSandwich={drinks} />
          )}
        </div>
      </div>
    </>
  );
};
export default Menu;
