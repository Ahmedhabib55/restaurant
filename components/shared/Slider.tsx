import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Slider = () => {
  return (
    <Carousel className="container mx-auto max-w-5xl">
      <CarouselContent>
        {[1, 2, 3].map((index) => (
          <CarouselItem key={index}>
            <div className="mt-1 grid h-[25rem] w-full place-items-center rounded-xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300">
              <span className="text-xl font-bold text-white">
                Slider for the best dishes in Tutlab ay {index}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
