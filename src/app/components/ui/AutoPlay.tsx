"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components1/ui/carousel";
import { Card, CardContent } from "./card";

export function CarouselPlugin() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 1000, stopOnInteraction: true }),
  ]);

  const images = [
    "/exclusive_image.png",
    "/hero_image.png",
    "/product_21.png",
    "/product_25.png",
    "/product_34.png",
  ];

  return (
    <div className="overflow-hidden max-w-xs" ref={emblaRef}>
      <div className="flex">
        {images.map((curElem, index) => (
          <div className="flex-[0_0_100%] min-w-0" key={index}>
            <div className="p-4">
              <Card>
                <CardContent className="flex items-center justify-center">
                  <img src={curElem} className="w-[200px] h-[200px]" alt="" />
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
