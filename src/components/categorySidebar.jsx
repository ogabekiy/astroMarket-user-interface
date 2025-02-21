"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton qo'shildi
import Image from "next/image";
import { useGetAllCategoriesQuery, useGetAllProductsOfCategoryQuery, useGetAllProductsQuery } from "@/redux/api/allApi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion qo'shildi
import ProductsBelow from "./productsBelow";

export default function CategoriesPage() {
  const { data: categories, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categoryData, isLoading: isCategoryLoading } = useGetAllProductsOfCategoryQuery(selectedCategory, { skip: !selectedCategory });
  const { data: allProductsData, isLoading: isProductsLoading } = useGetAllProductsQuery();
  const products = selectedCategory ? categoryData?.products || [] : allProductsData || [];

  if (isCategoriesLoading || isCategoryLoading || isProductsLoading) {
    return <LoadingState />;
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto p-4"
      >
        <h1 className="text-2xl font-bold mb-4">Kategoriyalar</h1>
        <div className="flex gap-2 overflow-auto pb-4">
          <Button variant={!selectedCategory ? "default" : "outline"} onClick={() => setSelectedCategory(null)}>
            Barcha Mahsulotlar
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.title}
            </Button>
          ))}
        </div>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto mt-12 border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground opacity-70 animate-pulse" />
              </div>
              <CardTitle className="text-2xl font-bold">Bu kategoriyada mahsulot yo‘q</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Afsuski, bu kategoriyada hozircha mahsulotlar mavjud emas. Boshqa kategoriyalarni ko‘rib chiqing!
              </p>
              <Link href="/">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  Boshqa mahsulotlarni ko‘rish
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <ProductsBelow />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Kategoriyalar</h1>
      <div className="flex gap-2 overflow-auto pb-4">
        <Button variant={!selectedCategory ? "default" : "outline"} onClick={() => setSelectedCategory(null)}>
          Barcha Mahsulotlar
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.title}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        <AnimatePresence>
          {products.map((product, index) => {
            const rating = product.totalrating || 5;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }} // Pastdan chiqish
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }} // Sekin chiqish va kechikish
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
        </AnimatePresence>
      </div>
      <ProductsBelow />
    </motion.div>
  );
}

// Loading holati uchun Skeleton bilan komponent
function LoadingState() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-8 w-1/4 mb-4" /> {/* Sarlavha uchun */}
      <div className="flex gap-2 overflow-auto pb-4">
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-10 w-24" /> // Kategoriya tugmalari uchun
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <Skeleton className="h-40 w-full" /> {/* Rasm uchun */}
            <div className="p-4 bg-white space-y-2">
              <Skeleton className="h-4 w-3/4" /> {/* Sarlavha uchun */}
              <Skeleton className="h-4 w-1/2" /> {/* Reyting uchun */}
              <Skeleton className="h-4 w-1/3" /> {/* Narx uchun */}
              <Skeleton className="h-8 w-full" /> {/* Tugma uchun */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}