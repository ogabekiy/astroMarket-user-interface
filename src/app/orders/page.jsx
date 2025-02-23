"use client";

import React, { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import {
  useGetOrdersQuery,
  useCreatePaymentMutation,
  useAcceptOrderMutation,
  useCancelOrderMutation,
} from "@/redux/api/allApi";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, AlertCircle, CheckCircle, XCircle, CreditCard, User } from "lucide-react";

export default function OrdersPage() {
  const { data: ordersData, isLoading, isError } = useGetOrdersQuery();
  const [createPayment, { isLoading: paymentLoading }] = useCreatePaymentMutation();
  const [acceptOrder, { isLoading: acceptLoading }] = useAcceptOrderMutation();
  const [cancelOrder, { isLoading: cancelLoading }] = useCancelOrderMutation();

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const fullName = `${userData.firstname || "Unknown"} ${userData.surname || "User"}`;


  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sort orders by date (newest first)
  const orders = ordersData ? [...ordersData].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ) : [];

  const handlePayClick = (order) => {
    setSelectedOrder(order);
    setShowPaymentAlert(true);
  };

  const handleCancelClick = (order) => {
    setSelectedOrder(order);
    setShowCancelAlert(true);
  };

  const handlePay = async () => {
    if (!selectedOrder) return;
    
    try {
      const body = {
        order_id: selectedOrder.id,
        amount: selectedOrder.total_price,
      };
      await createPayment(body).unwrap();
      console.log(`Payment successful for order ${selectedOrder.id}`);
      setShowPaymentAlert(false);
      setSelectedOrder(null);
    } catch (error) {
      if (error.status === 'PARSING_ERROR') {
        console.log(`Payment successful for order ${selectedOrder.id}`);
      } else {
        console.error("Failed to process payment:", error);
      }
      setShowPaymentAlert(false);
      setSelectedOrder(null);
    }
  };

  const handleCancel = async () => {
    if (!selectedOrder) return;
    
    try {
      await cancelOrder(selectedOrder.id).unwrap();
      console.log(`Order ${selectedOrder.id} canceled`);
      setShowCancelAlert(false);
      setSelectedOrder(null);
    } catch (error) {
      if (error.status === 'PARSING_ERROR') {
        console.log(`Order ${selectedOrder.id} canceled`);
      } else {
        console.error("Failed to cancel order:", error);
      }
      setShowCancelAlert(false);
      setSelectedOrder(null);
    }
  };

  const handleAccept = async (order) => {
    try {
      await acceptOrder(order.id).unwrap();
      console.log(`Order ${order.id} accepted`);
    } catch (error) {
      if (error.status === 'PARSING_ERROR') {
        console.log(`Order ${order.id} accepted: ${error.data}`);
      } else {
        console.error("Failed to accept order:", error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pendin: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      processin: { color: "bg-blue-100 text-blue-800", icon: Package },
      delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle }
    };

    const config = statusConfig[status] || { color: "bg-gray-100 text-gray-800", icon: AlertCircle };
    const Icon = config.icon;

    return (
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <Badge variant="secondary" className={`${config.color} capitalize`}>
          {status}
        </Badge>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-12 h-12 animate-spin mx-auto mb-4 text-gray-400" />
        <p className="text-lg text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (isError || !ordersData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">Error loading orders</h1>
        <p className="mt-2 text-gray-600">Please try again later</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-900">No orders found</h1>
        <p className="mt-2 text-gray-600">Start shopping to create your first order</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AlertDialog open={showCancelAlert} onOpenChange={setShowCancelAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel order #{selectedOrder?.id}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCancelAlert(false)}>
              No, Keep Order
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancel} 
              disabled={cancelLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancelLoading ? "Canceling..." : "Yes, Cancel Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPaymentAlert} onOpenChange={setShowPaymentAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Payment Details</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="my-6 space-y-4">
          <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <div className="text-sm">
                <p className="font-medium">Customer Details</p>
                <p className="text-gray-600">{fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div className="text-sm">
                <p className="font-medium">Payment Amount</p>
                <p className="text-gray-600">
                  {(selectedOrder?.total_price / 100).toLocaleString()} so'm
                </p>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowPaymentAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handlePay} disabled={paymentLoading}>
              {paymentLoading ? "Processing..." : "Confirm Payment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <Badge variant="outline" className="text-sm">
          Total Orders: {orders.length}
        </Badge>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl text-gray-800">Order History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Products</TableHead>
                <TableHead className="font-semibold">Total Price</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Payment Method</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {order.cart?.cart_products?.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={
                                item.product?.images?.[0]
                                  ? `${process.env.NEXT_PUBLIC_API_URL}/${item.product.images[0]}`
                                  : "/placeholder.svg"
                              }
                              alt={item.product?.title || "Product"}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {item.product?.title || "Unknown Product"}
                            </span>
                            <span className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </span>
                          </div>
                        </div>
                      )) || "No products"}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {(order.total_price / 100).toLocaleString()} so'm
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {order.payment_method || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {order.status === "pendin" && (
                        <Button
                          variant="secondary"
                          onClick={() => handlePayClick(order)}
                          disabled={paymentLoading || acceptLoading}
                          className="w-24"
                        >
                          {paymentLoading ? "Processing..." : "Pay"}
                        </Button>
                      )}
                      {order.status === "processin" && (
                        <Button
                          variant="outline"
                          onClick={() => handleAccept(order)}
                          disabled={acceptLoading}
                          className="w-24"
                        >
                          {acceptLoading ? "Accepting..." : "Accept"}
                        </Button>
                      )}
                      {(order.status !== "delivered" && order.status !== "cancelled") && (
                        <Button 
                          variant="destructive" 
                          onClick={() => handleCancelClick(order)} 
                          disabled={cancelLoading}
                          className="w-24"
                        >
                          {cancelLoading ? "Canceling..." : "Cancel"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}