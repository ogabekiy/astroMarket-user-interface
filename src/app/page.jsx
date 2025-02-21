import BannerCarousel, { CarouselDemo } from '@/components/banner'
import FeatureCards from '@/components/featureCards'
import Footer from '@/components/footer'
import Products from '@/components/justProducts'
import CategoryNav from '@/components/navCategory'
import ProductSlider from '@/components/products'
import ProductsBelow from '@/components/productsBelow'
import { Ramazon } from '@/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className=''>
      <div className='container mx-auto'>
      <div className=''><CategoryNav/></div>
     <div className='pt-7 flex justify-center'> <BannerCarousel/></div>
     <div className='pt-7'><FeatureCards/></div>
     <div><ProductSlider/></div>
     <div><ProductSlider/></div>
     <Link href={"/categories"}>
     <div className=''><Image className='flex rounded-lg justify-center mx-auto transition-transform duration-300 ease-in-out hover:scale-[101%]' src={Ramazon} alt='xa'/></div>
     </Link>

     <div><ProductSlider/></div>
     <div><ProductsBelow/></div>
     {/* <div><Products/></div> */}
      </div>
     <Footer/>
    </div>
  )
}
