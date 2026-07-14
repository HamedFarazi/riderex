import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Bike } from "lucide-react";

function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Bike className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-gradient">رایدرکس</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              بهترین فروشگاه آنلاین موتورسیکلت، قطعات یدکی و لوازم جانبی در
              ایران. ما با بیش از ۵۰۰ محصول اصل، خرید مطمئن و پشتیبانی کامل رو
              در اختیارتون میذاریم.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              دسترسی سریع
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  موتورها
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  قطعات یدکی
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  لوازم جانبی
                </Link>
              </li>
              <li>
                <Link
                  to="/special-sale-1"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  فروش ویژه
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  بلاگ
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">پشتیبانی</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help-center"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  راهنمای خرید
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <a
                  href="tel:+989123456789"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  ۰۹۱۲-۳۴۵-۶۷۸۹
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">© ۱۴۰۳ رایدرکس تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
