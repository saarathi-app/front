"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Mentors', href: '/mentors' },
  { name: 'How it Works', href: '/how-it-works' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent",
        pathname.startsWith("/auth") ? "bg-white shadow-sm" : ""
      )}
    >
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className={cn(
              "text-2xl font-bold transition-colors duration-300",
              isScrolled || pathname.startsWith("/auth") ? "text-[#16153A]" : "text-white"
            )}
          >
            Saarathi
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isScrolled || pathname.startsWith("/auth")
                    ? "text-gray-600 hover:text-[#16153A]" 
                    : "text-gray-200 hover:text-white",
                  pathname === item.href && "text-[#16153A] font-semibold"
                )}
              >
                {item.name}
              </Link>
            ))}
            {pathname.startsWith("/auth") ? null : (
              <>
                <Link href="/auth/login">
                  <Button 
                    variant={isScrolled ? "ghost" : "outline"}
                    className={cn(
                      "transition-all duration-300",
                      isScrolled 
                        ? "text-[#16153A] hover:bg-[#16153A] hover:text-white border border-[#16153A]" 
                        : "text-white border-2 border-white hover:bg-white hover:text-[#16153A]"
                    )}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button 
                    className="bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden",
              isScrolled || pathname.startsWith("/auth") ? "text-[#16153A]" : "text-white"
            )}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 p-4 mt-2 bg-white shadow-lg md:hidden rounded-b-lg">
            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md",
                    pathname === item.href
                      ? "text-[#16153A] bg-gray-50"
                      : "text-gray-600 hover:text-[#16153A] hover:bg-gray-50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!pathname.startsWith("/auth") && (
                <div className="space-y-2 pt-2 border-t">
                  <Link
                    href="/auth/login"
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full text-[#16153A] border-[#16153A]"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-[#00F5EE] text-[#16153A]">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 