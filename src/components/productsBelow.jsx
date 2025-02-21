"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton qo'shildi
import { useGetAllProductsQuery, useAddProductToCartMutation, useLikeProductMutation } from "@/redux/api/allApi";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion qo'shildi

export default function ProductsBelow() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = window.innerWidth < 768 ? 150 : 200;
    const targetScroll =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const { data: productsData, isLoading, isError } = useGetAllProductsQuery();
  const [addToCart, { isLoading: cartLoading }] = useAddProductToCartMutation();
  const [likeProduct] = useLikeProductMutation();
  const products = productsData || [];

  const handleAddToCart = async (productId) => {
    try {
      await addToCart({ product_id: productId }).unwrap();
      console.log(`Product ${productId} added to cart successfully`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleLikeProduct = async (productId) => {
    try {
      await likeProduct({ product_id: productId }).unwrap();
      console.log(`Product ${productId} is liked`);
    } catch (error) {
      console.error("Failed to add to Like:", error);
    }
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full px-2 py-4 md:px-4 md:py-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base md:text-xl font-bold">Yoqishi mumkin</h2>
        <Button variant="ghost" className="text-primary text-xs md:text-sm">
          Barchasi
          <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide pb-4"
        >
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }} // Pastdan chiqish
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }} // Sekin chiqish va kechikish
              >
                <Card
                  className="min-w-[150px] md:min-w-[200px] max-w-[150px] md:max-w-[200px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
                >
                  <div className="relative w-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 z-10 bg-white/80 backdrop-blur-md rounded-full p-1 h-6 w-6 md:h-8 md:w-8"
                      onClick={() => handleLikeProduct(product.id)}
                    >
                      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                      </motion.div>
                    </Button>
                    <motion.div
                      className="relative h-[120px] md:h-[160px] w-full bg-gradient-to-br from-purple-500/20 to-purple-600/20"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={product.images?.[0] ? `http://localhost:3000/${product.images[0]}` : "/placeholder.svg"}
                        alt={product.title || "Mahsulot"}
                        className="object-contain p-5 flex justify-center items-center"
                        fill
                        unoptimized
                      />
                    </motion.div>
                  </div>
                  <div className="p-2 md:p-3 bg-white rounded-b-lg flex flex-col gap-1">
                    <h3 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex flex-col justify-start gap-1">
                      <span className="text-xs md:text-sm font-medium">{product.totalrating || "N/A"}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews?.length || 0})</span>
                    </div>
                    <div className="text-xs md:text-sm font-bold text-green-600">
                      {(product.price / 100).toLocaleString()} so'm
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 text-xs md:text-sm"
                        onClick={() => handleAddToCart(product.id)}
                        disabled={cartLoading}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {cartLoading ? "Adding..." : "Cartga qo'shish"}
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-3 md:-left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white md:flex shadow-md h-8 w-8"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 md:-right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white md:flex shadow-md h-8 w-8"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Loading holati uchun Skeleton komponenti
function LoadingState() {
  return (
    <div className="w-full px-2 py-4 md:px-4 md:py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base md:text-xl font-bold">Yoqishi mumkin</h2>
        <Button variant="ghost" className="text-primary text-xs md:text-sm">
          Barchasi <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>
      <div className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="min-w-[150px] md:min-w-[200px] max-w-[150px] md:max-w-[200px] flex-shrink-0">
            <Skeleton className="h-[120px] md:h-[160px] w-full rounded-t-lg" />
            <div className="p-2 md:p-3 bg-white rounded-b-lg space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Error holati uchun komponent
function ErrorState() {
  return (
    <div className="text-center py-4 text-red-500">Error loading products</div>
  );
}