"use client"
import { motion } from "framer-motion";
import { ShoppingBag, Car, Baby, Shirt } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Sizning go'zalligingiz",
    icon: ShoppingBag,
    color: "bg-pink-100",
    textColor: "text-pink-800",
    shadow: "shadow-pink-200",
  },
  {
    id: 2,
    title: "Hammasi avto uchun",
    icon: Car,
    color: "bg-blue-100",
    textColor: "text-blue-800",
    shadow: "shadow-blue-200",
  },
  {
    id: 3,
    title: "Bolalar uchun tovarlar",
    icon: Baby,
    color: "bg-green-100",
    textColor: "text-green-800",
    shadow: "shadow-green-200",
  },
  {
    id: 4,
    title: "Garderob uchun",
    icon: Shirt,
    color: "bg-purple-100",
    textColor: "text-purple-800",
    shadow: "shadow-purple-200",
  },
];

const FeatureCards = () => {
  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">Xizmatlarimiz</h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="transition-transform"
            >
              <div
                className={`relative flex flex-col items-center text-center gap-3 sm:gap-4 p-4 sm:p-8 rounded-xl sm:rounded-2xl ${feature.color} ${feature.shadow} shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-full shadow-md">
                  <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.textColor}`} />
                </div>
                <span className={`text-sm sm:text-xl font-semibold ${feature.textColor}`}>{feature.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
