import CategorySidebar from '@/components/Categories'
import CategoriesPage from '@/components/categorySidebar'
import { useGetAllCategoriesQuery, useGetAllProductsOfCategoryQuery, useGetAllProductsQuery } from '@/redux/api/allApi'
import React from 'react'

export default function page() {

  // const categories = useGetAllCategoriesQuery()

  // const categoryProducts = useGetAllProductsOfCategoryQuery(category)

  // const products = useGetAllProductsQuery()



  return (
    <div>
        <CategoriesPage/>
    </div>
  )
}
