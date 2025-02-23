"use client";

import { useParams } from "next/navigation";
import { useSearchProductQuery } from "@/redux/api/allApi";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import ProductsBelow from "@/components/productsBelow";

export default function SearchPage() {
  const { title } = useParams();
  const { data: products = [], isLoading } = useSearchProductQuery(title);

  if (isLoading) {
    return <div className="text-center text-lg">Yuklanmoqda...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product, index) => {
        const rating = product.totalrating || 5;
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition">
              <div className="relative w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-md rounded-full p-1 h-8 w-8"
                >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Heart className="h-4 w-4 text-red-500" />
                  </motion.div>
                </Button>
                <motion.div
                  className="relative h-40 w-full bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={product.images?.[0] ? `${process.env.NEXT_PUBLIC_API_URL}/${product.images[0]}` : "/placeholder.svg"}
                    alt={product.title || "Mahsulot"}
                    className="object-contain p-5 flex justify-center items-center"
                    fill
                    unoptimized
                  />
                </motion.div>
              </div>
              <CardContent className="p-4 bg-white flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4" fill={index < rating ? "#FFD700" : "none"} stroke="#FFD700" />
                  ))}
                  <span className="text-xs text-gray-500">({product.reviews?.length || 0} reviews)</span>
                </div>
                <span className="text-sm font-bold text-green-600">{(product.price / 100).toLocaleString()} so'm</span>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" /> Cartga qo'shish
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
     
    </div>
     <div className="pt-10"><ProductsBelow/></div>
    </div>
  );
}
