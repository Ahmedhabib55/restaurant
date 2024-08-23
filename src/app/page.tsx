import React from "react";
import Header from "@/components/shared/Header";
import Slider from "@/components/shared/Slider";
import Menu from "@/components/menues/Menu";
import CartOverview from "@/components/shared/CartOverview";

const page = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto">
        <Slider />
      </section>

      <section id="eat" className="mt-10">
        <Menu />
      </section>
      <CartOverview />
    </>
  );
};

export default page;
