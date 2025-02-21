"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import {
  useGetCartProductsQuery,
  useResetCartMutation,
  useAddProductToCartMutation,
  useDecreaseProductFromCartMutation,
  useGetOneProductQuery,
} from "@/redux/api/allApi";
import Link from "next/link";
import ProductsBelow from "@/components/productsBelow";

function CartItem({ item, onIncrease, onDecrease, isAddLoading, isDecreaseLoading }) {
  const { data: product, isLoading: productLoading, error: productError } = useGetOneProductQuery(item.product_id);

  // Calculate subtotal for this item
  const subtotal = product?.price && item.quantity ? (product.price * item.quantity) / 100 : 0;

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4">
          {productLoading ? (
            "Loading..."
          ) : productError ? (
            "Erroras"
          ) : (
            <>
              <Link href={`/products/${product.id}`} className="flex items-center">
                <div className="relative flex w-12 h-12 flex-shrink-0">
                  <Image
                    src={product?.images?.[0] ? `http://localhost:3000/${product.images[0]}` : "/placeholder.svg"}
                    alt={product?.title || "Product"}
                    fill
                    className="object-contain rounded-md"
                    unoptimized 
                  />
                </div>
                <span>{product?.title || `Product ${item.product_id}`}</span>
              </Link>
            </>
          )}
        </div>
      </TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>
        {productLoading ? "..." : product?.price ? `${(product.price / 100).toLocaleString()} so'm` : "N/A"}
      </TableCell>
      <TableCell>{subtotal ? `${subtotal.toLocaleString()} so'm` : "N/A"}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onIncrease(item.product_id)}
            disabled={isAddLoading || isDecreaseLoading}
          >
            {isAddLoading && item.product_id === item.product_id ? (
              <span className="animate-spin">...</span>
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDecrease(item.product_id)}
            disabled={isAddLoading || isDecreaseLoading || item.quantity <= 1}
          >
            {isDecreaseLoading && item.product_id === item.product_id ? (
              <span className="animate-spin">...</span>
            ) : (
              <Minus className="h-4 w-4" />
            )}
          </Button>
        </div>
      </TableCell>
      <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}

export default function CartPage() {
  const { data: cartData, isLoading: cartLoading, isError: cartError, refetch } = useGetCartProductsQuery();
  const [resetCart, { isLoading: resetLoading }] = useResetCartMutation();
  const [addToCart, { isLoading: addLoading }] = useAddProductToCartMutation();
  const [decreaseQuantity, { isLoading: decreaseLoading }] = useDecreaseProductFromCartMutation();

  const cart = cartData || {};
  const cartProducts = cart.cart_products || [];

  const handleResetCart = async () => {
    try {
      await resetCart().unwrap();
      console.log("Cart reset successfully");
    } catch (error) {
      console.error("Failed to reset cart:", error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      await addToCart({ product_id: productId }).unwrap();
      console.log(`Increased quantity for product ${productId}`);
      refetch();
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      refetch();
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      await decreaseQuantity(productId).unwrap();
      console.log(`Decreased quantity for product ${productId}`);
      refetch();
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      refetch();
    }
  };

  if (cartLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading cart...</div>;
  }

  if (cartError || !cartData) {
    return (
      <div className="container mx-auto px-4 py-8">
  <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto mt-12 border-none shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Your Cart is Empty</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            It seems you haven't added any items yet. Explore our products and start shopping!
          </p>
          <Link href="/">
            <Button 
              className="w-full sm:w-auto"
              size="lg"
            >
              Start Shopping
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="pt-10"><ProductsBelow/></div>
    </div>
  
</div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <Card>
        <CardHeader>
          <CardTitle>Cart Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Added On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartProducts.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  isAddLoading={addLoading}
                  isDecreaseLoading={decreaseLoading}
                />
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">
                Total Price: {(cart.total_price / 100).toLocaleString()} so'm
              </p>
              <p className="text-sm text-muted-foreground">
                Status: {cart.status}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleResetCart}
              disabled={resetLoading || addLoading || decreaseLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {resetLoading ? "Resetting..." : "Reset Cart"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="pt-10"><ProductsBelow/></div>
    </div>
  );
}