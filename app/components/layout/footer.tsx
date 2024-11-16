import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Linkedin } from "lucide-react"
import { routes } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-[#16153A] text-white py-12">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/logos/dark.png"
                  alt="Saarathi"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white">
                Saarathi
              </span>
            </Link>
            <p className="text-gray-300">
              Connecting mentors and mentees for a brighter future.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={routes.about}
                  className="text-gray-300 hover:text-[#00F5EE] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href={routes.legal.faq}
                  className="text-gray-300 hover:text-[#00F5EE] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  href={routes.contact}
                  className="text-gray-300 hover:text-[#00F5EE] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href={routes.legal.terms}
                  className="text-gray-300 hover:text-[#00F5EE] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">For Mentors</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={routes.mentor.apply}
                  className="text-gray-300 hover:text-[#00F5EE] transition-colors"
                >
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link 
                  href={routes.mentor.resources}
                  className="text-gray-300 hover:text-[#00F5EE] transition-colors"
                >
                  Mentor Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="hover:text-[#00F5EE] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link 
                href="#" 
                className="hover:text-[#00F5EE] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link 
                href="#" 
                className="hover:text-[#00F5EE] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Saarathi. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 