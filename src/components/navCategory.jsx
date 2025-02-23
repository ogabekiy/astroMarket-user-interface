"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/allApi";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; 
import { motion, AnimatePresence } from "framer-motion";

const CategoryNav = () => {
  const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="w-full bg-white py-3 text-center text-red-500">
        Xatolik yuz berdi
      </div>
    );
  }

  const categories = categoriesData?.map((category) => category.title) || [];
  categories.push("Yana >");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full border-b border-gray-200 bg-white"
    >
      <div className="max-w-8xl mx-auto">
        <ul className="flex items-center space-x-6 gap-11 overflow-x-auto py-3 scrollbar-hide">
          <AnimatePresence>
            {categories.map((category, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/categories`}
                  className="text-gray-600 hover:text-gray-900 whitespace-nowrap text-sm"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md text-sm font-semibold tracking-wide"
                  >
                    {category}
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </motion.nav>
  );
};

function LoadingState() {
  return (
    <div className="w-full bg-white py-3">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center space-x-6 gap-11 overflow-x-auto py-3 scrollbar-hide">
          {Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-10 w-24 rounded-full" /> 
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryNav;