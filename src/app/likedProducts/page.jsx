"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useViewLikesQuery, useLikeProductMutation } from "@/redux/api/allApi"; // Added useUnlikeProductMutation
import ProductsBelow from "@/components/productsBelow";

export default function LikedProductsPage() {
  const { data: likesData, isLoading, isError, refetch } = useViewLikesQuery();
  const [unlikeProduct, { isLoading: unlikeLoading }] = useLikeProductMutation(); // Mutation for unliking

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading liked products...
      </div>
    );
  }

  // Handle error state
  if (isError || !likesData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-destructive">
        Error loading liked products
      </div>
    );
  }

  const likedProducts = likesData || [];

  // Handle empty state
  if (likedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto mt-12 border-none shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">No Liked Products</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              You haven't liked any products yet. Start browsing to find items you love!
            </p>
            <Link href="/">
              <Button className="w-full sm:w-auto" size="lg">
                Browse Products
              </Button>
            </Link>
          </CardContent>
        </Card>
        <div className="pt-10"><ProductsBelow/></div>
      </div>
    );
  }

  // Function to handle unliking a product
  const handleUnlikeProduct = async (productId) => {
    try {
      console.log("Attempting to unlike product:", productId);
      await unlikeProduct({ product_id: productId }).unwrap();
      console.log(`Product ${productId} unliked successfully`);
      refetch(); // Refresh the liked products list
    } catch (error) {
      console.error("Failed to unlike product:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Liked Products</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Liked On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {likedProducts.map((like) => (
                <TableRow key={like.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Link href={`/products/${like.product_id}`} className="flex items-center">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={
                              like.product?.images?.[0]
                                ? `http://localhost:3000/${like.product.images[0]}`
                                : "/placeholder.svg"
                            }
                            alt={like.product?.title || "Product"}
                            fill
                            className="object-contain rounded-md"
                            unoptimized
                          />
                        </div>
                        <span>{like.product?.title || `Product ${like.product_id}`}</span>
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    {(like.product?.price / 100).toLocaleString()} so'm
                  </TableCell>
                  <TableCell>
                    {like.product?.category_id
                      ? `Category ${like.product.category_id}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(like.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleUnlikeProduct(like.product_id)}
                      disabled={unlikeLoading}
                    >
                      {unlikeLoading ? (
                        <span className="animate-spin">...</span>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="pt-10"><ProductsBelow/></div>
    </div>
  );
}