"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton" // Skeleton qo'shildi
import { useAddProductToCartMutation, useGetAllProductsQuery, useLikeProductMutation } from "@/redux/api/allApi"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductSlider() {
  const scrollContainerRef = useRef(null)
  
  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = window.innerWidth < 768 ? 200 : 300
    const targetScroll = direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }

  const [likeProduct] = useLikeProductMutation()
  const [addToCart, { isLoading: cartLoading }] = useAddProductToCartMutation()
  const { data: productsData, isLoading, isError } = useGetAllProductsQuery()

  const handleLikeProduct = async (productId) => {
    try {
      await likeProduct({ product_id: productId }).unwrap()
      console.log(`Product ${productId} is liked`)
    } catch (error) {
      console.error("Failed to like product:", error)
    }
  }

  const handleAddToCart = async (productId) => {
    try {
      await addToCart({ product_id: productId }).unwrap()
      console.log(`Product ${productId} added to cart`)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState />
  const products = productsData || []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-bold">Fevral chekirmalari</h2>
        <Button variant="ghost" className="text-primary text-sm md:text-base">
          Barchasi
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="min-w-[220px] md:min-w-[280px] overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-md rounded-full p-1 hover:bg-white"
                      onClick={() => handleLikeProduct(product.id)}
                    >
                      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <Heart className="h-5 w-5 text-red-500" />
                      </motion.div>
                    </Button>
                    <Link href={`/products/${product.id}`}>
                      <motion.div
                        className="relative h-[220px] md:h-[280px] w-full bg-gradient-to-br from-purple-500/20 to-purple-600/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={product.images?.[0] ? `http://localhost:3000/${product.images[0]}` : "/placeholder.svg"}
                          alt={product.title || "Mahsulot"}
                          className="object-contain p-5"
                          fill
                          unoptimized
                        />
                      </motion.div>
                    </Link>
                  </div>
                  <div className="p-4 bg-white rounded-b-xl">
                    <div className="mb-2 flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">
                          {(product.totalrating / (product.reviews?.length || 1)).toFixed(1) || 5.0}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews?.length || 0} sharh)</span>
                    </div>
                    <h3 className="line-clamp-2 text-xs md:text-sm min-h-[40px] md:min-h-[48px] font-semibold text-gray-800">
                      {product.title || "Noma'lum mahsulot"}
                    </h3>
                    <div className="text-sm md:text-lg font-bold text-green-600">
                      {product.price ? `${product.price} so'm` : "Noma'lum"}
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full mt-2 text-xs md:text-sm"
                        disabled={cartLoading}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cartga qo'shish
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
          className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white md:flex shadow-md"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white md:flex shadow-md"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// Loading holati uchun Skeleton bilan komponent
function LoadingState() {
  return (
    <div className="w-full px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-bold">Fevral chekirmalari</h2>
        <Button variant="ghost" className="text-primary text-sm md:text-base">
          Barchasi <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="min-w-[220px] md:min-w-[280px] flex-shrink-0">
            <Skeleton className="h-[220px] md:h-[280px] w-full rounded-t-xl" />
            <div className="p-4 bg-white rounded-b-xl space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Error holati uchun komponent
function ErrorState() {
  return (
    <div className="w-full px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-bold">Fevral chekirmalari</h2>
        <Button variant="ghost" className="text-primary text-sm md:text-base">
          Barchasi <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="text-center py-4 text-red-500">Xatolik yuz berdi</div>
    </div>
  )
}