import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bizning Do'kon</h3>
            <p className="text-sm mb-4">Sifatli mahsulotlar va ajoyib xizmat bilan xizmatingizdamiz.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Tezkor Havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories" className="hover:text-yellow-300 transition-colors">
                  Mahsulotlar
                </Link>
              </li>
              <li>
                <a href="/" className="hover:text-yellow-300 transition-colors">
                  Aksiyalar
                </a>
              </li>
              <li>
                <a href="/categories" className="hover:text-yellow-300 transition-colors">
                  Yetkazib berish
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Bog'lanish</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="ogbkiy@gmail.com" className="hover:text-yellow-300 transition-colors">
                  ogbkiy@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+998901234567" className="hover:text-yellow-300 transition-colors">
                  +998 90 567 07 33
                </a>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>Fargona sh., Bolajon ko'chasi, 1</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-400 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Bizning Do'kon. Barcha huquqlar himoyalangan.</p>
          <form className="mt-4 sm:mt-0 flex">
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-800"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded-r-md hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              Obuna bo'lish
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default Footer

