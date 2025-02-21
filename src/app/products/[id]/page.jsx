"use client";

import React, { useState } from "react";
import { useAddProductToCartMutation, useGetOneProductQuery, useLikeProductMutation } from "@/redux/api/allApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Framer Motion qo'shildi
import ProductsBelow from "@/components/productsBelow";

export default function ProductPage() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const { data: product, isLoading, error } = useGetOneProductQuery(id);

  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Rasmlar slayderi uchun holat

  const [addToCart, { isLoading: cartLoading }] = useAddProductToCartMutation();
  const [likeProduct] = useLikeProductMutation();

  const handleLikeProduct = async (productId) => {
    try {
      await likeProduct({ product_id: productId }).unwrap();
      setIsLiked((prev) => !prev);
      console.log(`Product ${productId} is liked`);
    } catch (error) {
      console.error("Failed to add to Like:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart({ product_id: productId }).unwrap();
      console.log(`Product ${productId} added to cart successfully`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  // Rasmlar slayderi uchun navigatsiya
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-[400px] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">
          {error ? "Error loading product" : "Product not found"}
        </h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="overflow-hidden relative">
          <motion.div
            key={currentImageIndex} // Har bir rasm o'zgarishida animatsiya qo'llaniladi
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-[400px]"
          >
            <Image
              src={
                product.images?.[currentImageIndex]
                  ? `http://localhost:3000/${product.images[currentImageIndex]}`
                  : "/placeholder.svg"
              }
              alt={product.title || "Mahsulot"}
              className="object-contain p-5 flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105"
              fill
              unoptimized
            />
          </motion.div>

          {/* Slayder tugmalari */}
          {product.images?.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Kichik rasmlar galereyasi */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-2 justify-center">
              {product.images.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`relative w-16 h-16 cursor-pointer rounded-md overflow-hidden ${
                    currentImageIndex === index ? "border-2 border-purple-500" : "border"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={`http://localhost:3000/${img}`}
                    alt={`Thumbnail ${index}`}
                    className="object-cover"
                    fill
                    unoptimized
                  />
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <div>
            <div className="flex gap-4 items-center">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={() => handleLikeProduct(product.id)}
              >
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Heart
                    className={`w-6 h-6 ${isLiked ? "text-red-500" : "text-gray-500"}`}
                    fill={isLiked ? "red" : "none"}
                    stroke={isLiked ? "red" : "currentColor"}
                  />
                </motion.div>
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary">{product.category.title}</Badge>
              {product.approved && <Badge variant="success">Approved</Badge>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">
              ${(product.price / 100).toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              ({product.quantity} in stock)
            </span>
          </div>
          <div className="flex items-center gap-1">
            {product.totalrating === 0 ? (
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                    fill={index < 5 ? "yellow" : "none"}
                  />
                ))}
                <span>(5 / 5) (0 reviews)</span>
              </div>
            ) : (
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                    fill={index < product.totalrating ? "yellow" : "none"}
                  />
                ))}
                <span>({product.totalrating} / 5) (0 reviews)</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full"
              size="lg"
              onClick={() => handleAddToCart(product.id)}
              disabled={cartLoading}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {cartLoading ? "Adding..." : "Add to Cart"}
            </Button>
          </motion.div>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium">
                {product.seller.firstname} {product.seller.surname}
              </p>
              <p className="text-muted-foreground">
                Email: {product.seller.email}
              </p>
              <p className="text-muted-foreground">
                Phone: {product.seller.phone}
              </p>
              <p className="text-sm text-muted-foreground">
                Seller since:{" "}
                {new Date(product.seller.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {product.reviews.length === 0 ? (
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            <div>Reviews will be displayed here</div>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pt-10"
      >
        <ProductsBelow />
      </motion.div>
    </motion.div>
  );
}