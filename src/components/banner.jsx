import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Banner1, Banner2, Banner3, Ramazon } from "@/images";
import Link from "next/link";

const bannerData = [
    {
        id: 1,
        img: Banner1,
        title: "Harkuni foyda"
    },
    {
        id: 2,
        img: Banner2,
        title: "Bosch bilan chegirmalar"
    },
    {
        id: 3,
        img: Banner3,
        title: "Avto uchun tovarlar"
    },
    {
        id: 4,
        img: Ramazon,
        title: "Ramazon Haridlari"
    }
];

const BannerCarousel = () => {
    return (
      <section className="w-full bg-gray-50 py-4">
        <div className="w-full max-w-[1920px] mx-auto">
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {bannerData.map((banner, index) => (
                <CarouselItem key={banner.id}>
                  <Card className="border-0 rounded-xl overflow-hidden">
                    <Link href="/categories">
                    <CardContent className="p-0">
                      <div className="relative  aspect-[20/8] sm:aspect-[20/7] md:aspect-[20/6]">
                        <Image
                          src={banner.img}
                          alt={banner.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                            <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                              {banner.title}
                            </h3>
                            <p className="text-white/90 mt-2 hover:underline text-lg md:text-xl" href={"/categories"}>
                              Discover More
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    </Link>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute z-10 flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <CarouselPrevious className="h-12 w-12 bg-white/30 hover:bg-white/60 backdrop-blur-sm border-none" />
              <CarouselNext className="h-12 w-12 bg-white/30 hover:bg-white/60 backdrop-blur-sm border-none" />
            </div>
          </Carousel>
        </div>
      </section>
    );
  };

export default BannerCarousel;