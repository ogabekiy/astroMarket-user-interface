"use client"
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, User, Menu, X, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Logo />
              </Link>
            </div>
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Input type="text" placeholder="Search products..." className="w-64 pr-10" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Link href="/likedProducts"><Heart className="h-5 w-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link href="/cartProducts"><ShoppingCart className="h-5 w-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Link href="/login"><User className="h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile version with search */}
          {isOpen && (
            <div className="md:hidden bg-white shadow-lg p-4">
              <div className="flex flex-col space-y-4">
                {/* Search input for mobile */}
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Navigation links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Icons */}
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon">
                    <Link href="/likedProducts"><Heart className="h-5 w-5" /></Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Link href="/login"><User className="h-5 w-5" /></Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Navbar balandligiga mos kelish uchun sahifa tarkibiga padding qo‘shamiz */}
      <div className="pt-4"></div>
    </>
  );
};

const Logo = () => (
  <svg
    width="200"
    height="60"
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="astroGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <circle
      cx="30"
      cy="30"
      r="15"
      stroke="url(#astroGradient)"
      strokeWidth="3"
      fill="none"
    />
    <ellipse
      cx="30"
      cy="30"
      rx="22"
      ry="10"
      stroke="url(#astroGradient)"
      strokeWidth="2"
      fill="none"
    />
    <path d="M10 10 L20 5 L15 15 Z" fill="url(#astroGradient)" />
    <text
      x="60"
      y="38"
      fontFamily="Arial, sans-serif"
      fontSize="22"
      fill="url(#astroGradient)"
      fontWeight="bold"
    >
      Astro Market
    </text>
  </svg>
);

const navLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/orders", label: "Orders" },
  { href: "/newProducts", label: "New Products" },
  { href: "/discounts", label: "Discounts" },
];

export default Navbar;
