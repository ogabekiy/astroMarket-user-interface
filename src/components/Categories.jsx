'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGetAllCategoriesQuery, useGetAllProductsOfCategoryQuery } from '@/redux/api/allApi';



export default function CategorySidebar() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery();

  if (isLoading) {
    return <div className="w-full bg-white py-3">Yuklanmoqda...</div>;
  }

  if (isError) {
    return <div className="w-full bg-white py-3">Xatolik yuz berdi</div>;
  }

  const { data: categoryProduct, refetch } = useGetAllProductsOfCategoryQuery("kiyimlar")

const getAllProductsOfCategory = () => {
  refetch(); 
}
console.log(data);


  

  const categories = categoriesData?.map((category) => category.title) || [];

  categories.push("Yana >");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-4">
      <motion.div 
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="md:w-1/4 w-full bg-white shadow-lg rounded-lg p-6 mb-4 md:mb-0"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Kategoriyalar</h2>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`p-3 cursor-pointer rounded-lg transition-all duration-300 font-medium text-gray-700 hover:bg-indigo-500 hover:text-white ${
                selectedCategory === category.title ? 'bg-indigo-600 text-white' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="md:w-3/4 w-full p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {selectedCategory ? `${selectedCategory} mahsulotlari` : 'Mahsulot tanlang'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCategory &&
            categories
              .find((cat) => cat.name === selectedCategory)
              ?.products.map((product, index) => (
                <motion.div 
                  key={index} 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-5 border rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {product}
                </motion.div>
              ))}
        </div>
      </motion.div>
    </div>
  );
}
