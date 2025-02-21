// "use client"

// import { useRef } from "react"
// import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"

// export default function Products() {
//   const scrollContainerRef = useRef(null)

//   const scroll = (direction) => {
//     const container = scrollContainerRef.current
//     if (!container) return

//     const scrollAmount = window.innerWidth < 768 ? 150 : 200
//     const targetScroll =
//       direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

//     container.scrollTo({
//       left: targetScroll,
//       behavior: "smooth",
//     })
//   }

//   const products = [
//     {
//       id: 1,
//       title: "iPhone 16 Pro/Pro Max, 128/256 DualSim/SIM g'ilof sovg'a",
//       rating: 5.0,
//       reviews: 15,
//       pricePerMonth: "942 012",
//       oldPrice: "14 499 000",
//       price: "13 299 000",
//       image: "/placeholder.svg",
//       badge: "Original",
//       badgeColor: "bg-purple-600",
//     },
//     {
//       id: 29,
//       title: "Avtomobil g'ilofi Cardinar Alfa Gentra, Cobalt, Spark, Nexia, Onix",
//       rating: 4.9,
//       reviews: 334,
//       pricePerMonth: "81 458",
//       oldPrice: "2 500 000",
//       price: "1 150 000",
//       image: "/placeholder.svg",
//     },
//     {
//         id: 10,
//         title: "iPhone 16 Pro/Pro Max, 128/256 DualSim/SIM g'ilof sovg'a",
//         rating: 5.0,
//         reviews: 15,
//         pricePerMonth: "942 012",
//         oldPrice: "14 499 000",
//         price: "13 299 000",
//         image: "/placeholder.svg",
//         badge: "Original",
//         badgeColor: "bg-purple-600",
//       },
//       {
//         id: 222,
//         title: "Avtomobil g'ilofi Cardinar Alfa Gentra, Cobalt, Spark, Nexia, Onix",
//         rating: 4.9,
//         reviews: 334,
//         pricePerMonth: "81 458",
//         oldPrice: "2 500 000",
//         price: "1 150 000",
//         image: "/placeholder.svg",
//       },
//       {
//         id: 12,
//         title: "iPhone 16 Pro/Pro Max, 128/256 DualSim/SIM g'ilof sovg'a",
//         rating: 5.0,
//         reviews: 15,
//         pricePerMonth: "942 012",
//         oldPrice: "14 499 000",
//         price: "13 299 000",
//         image: "/placeholder.svg",
//         badge: "Original",
//         badgeColor: "bg-purple-600",
//       },
//       {
//         id: 2112,
//         title: "Avtomobil g'ilofi Cardinar Alfa Gentra, Cobalt, Spark, Nexia, Onix",
//         rating: 4.9,
//         reviews: 334,
//         pricePerMonth: "81 458",
//         oldPrice: "2 500 000",
//         price: "1 150 000",
//         image: "/placeholder.svg",
//       },
//       {
//         id: 2129,
//         title: "Avtomobil g'ilofi Cardinar Alfa Gentra, Cobalt, Spark, Nexia, Onix",
//         rating: 4.9,
//         reviews: 334,
//         pricePerMonth: "81 458",
//         oldPrice: "2 500 000",
//         price: "1 150 000",
//         image: "/placeholder.svg",
//       },
//       {
//           id: 1120,
//           title: "iPhone 16 Pro/Pro Max, 128/256 DualSim/SIM g'ilof sovg'a",
//           rating: 5.0,
//           reviews: 15,
//           pricePerMonth: "942 012",
//           oldPrice: "14 499 000",
//           price: "13 299 000",
//           image: "/placeholder.svg",
//           badge: "Original",
//           badgeColor: "bg-purple-600",
//         },
//         {
//           id: 22122,
//           title: "Avtomobil g'ilofi Cardinar Alfa Gentra, Cobalt, Spark, Nexia, Onix",
//           rating: 4.9,
//           reviews: 334,
//           pricePerMonth: "81 458",
//           oldPrice: "2 500 000",
//           price: "1 150 000",
//           image: "/placeholder.svg",
//         },
//         {
//           id: 92,
//           title: "iPhone 16 Pro/Pro Max, 128/256 DualSim/SIM g'ilof sovg'a",
//           rating: 5.0,
//           reviews: 15,
//           pricePerMonth: "942 012",
//           oldPrice: "14 499 000",
//           price: "13 299 000",
//           image: "/placeholder.svg",
//           badge: "Original",
//           badgeColor: "bg-purple-600",
//         },
//         {
//           id: 91,
//           title: "Avtomobil g'ilofi Cardinar Alfa Gentra, Cobalt, Spark, Nexia, Onix",
//           rating: 4.9,
//           reviews: 334,
//           pricePerMonth: "81 458",
//           oldPrice: "2 500 000",
//           price: "1 150 000",
//           image: "/placeholder.svg",
//         },
//   ]


//   return (
//     <div className="w-full px-2 py-4 md:px-4 md:py-6">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-base md:text-xl font-bold">Fevrall chegirmalari</h2>
//         <Button variant="ghost" className="text-primary text-xs md:text-sm">
//           Barchasi
//           <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
//         </Button>
//       </div>

//       <div className="relative">
//         <div
//           ref={scrollContainerRef}
//           className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide pb-4"
//         >
//           {products.map((product) => (
//             <Card 
//               key={product.id} 
//               className="min-w-[140px] md:min-w-[180px] max-w-[140px] md:max-w-[180px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
//             >
//               <div className="relative w-full">
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className="absolute right-1 top-1 z-10 bg-white/80 backdrop-blur-md rounded-full p-1 h-6 w-6 md:h-8 md:w-8"
//                 >
//                   <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
//                 </Button>
//                 <div className="relative h-[120px] md:h-[160px] w-full bg-gradient-to-br from-purple-500/20 to-purple-600/20">
//                   <Image
//                     src={product.image || "/placeholder.svg"}
//                     alt={product.title}
//                     fill
//                     className="object-contain p-2 md:p-4"
//                   />
//                 </div>
//               </div>
//               <div className="p-2 md:p-3 bg-white rounded-b-lg flex flex-col gap-1">
//                 <h3 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2">
//                   {product.title}
//                 </h3>
//                 <div className="flex items-center gap-1">
//                   <span className="text-xs md:text-sm font-medium">{product.rating}</span>
//                   <span className="text-xs text-muted-foreground">({product.reviews})</span>
//                 </div>
//                 <div className="text-xs text-muted-foreground line-through">
//                   {product.oldPrice} so'm
//                 </div>
//                 <div className="text-xs md:text-sm font-bold text-green-600">
//                   {product.price} so'm
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="absolute bottom-2 right-2 z-10 rounded-full h-6 w-6 md:h-8 md:w-8 bg-white shadow-md"
//                 >
//                   <ChevronRight className="h-4 w-4 text-gray-600" />
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute -left-3 md:-left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white md:flex shadow-md h-8 w-8"
//           onClick={() => scroll("left")}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="icon"
//           className="absolute -right-3 md:-right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white md:flex shadow-md h-8 w-8"
//           onClick={() => scroll("right")}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   )
// }