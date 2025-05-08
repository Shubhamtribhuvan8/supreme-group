import Image from "next/image"
import Link from "next/link"
import Supreme_logo from '../assests/Supreme_logo .png'

export default function Footer() {
  return (
    <footer className="bg-[#F5F2F2] text-gray-700 py-12 relative overflow-hidden">
      {/* Background watermark */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
        <div className="w-96 h-96 rounded-full border-[40px] border-gray-500 absolute -right-20 -top-20"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Logo */}
        <div className="flex justify-start mb-12">
          <div className="relative h-16 w-64">
            <Image src={Supreme_logo} alt="Supreme Group Logo" width={180} height={64} className="object-contain" />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Applications Column */}
          <div>
            <h3 className="font-bold text-sm mb-4">APPLICATIONS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Apparel
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Automotive
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Filtration
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Customised Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-sm mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Innovation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Global Competency
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* More Column */}
          <div>
            <h3 className="font-bold text-sm mb-4">MORE</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="font-bold text-sm mb-4">FOLLOW US</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-600 transition-colors">
                  Medium
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between pt-6 border-t border-gray-200 text-sm">
          <div className="mb-4 md:mb-0">©{new Date().getFullYear()}. All Rights Reserved.</div>
          <div>Supreme house, 110, 16th Road, Chembur, Mumbai - 400071</div>
        </div>
      </div>
    </footer>
  )
}
