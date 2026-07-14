import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Star,
  Users,
  BookOpen,
  Award,
  ArrowLeft,
  Zap,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Globe,
  Sparkles,
  Rocket,
  Brain,
  Code,
  Palette,
  BarChart,
  Shield,
  Heart,
  Gift,
  Calendar,
  Eye,
  User,
  MessageCircle,
  Download,
  Share2,
  ChevronRight,
  Search,
  Filter,
  Bell,
  Mail,
  Phone,
} from "lucide-react";

import products from "../data/products";
import ProductCard from "../components/products/ProductCard";

function HomePage3() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    satisfaction: 0,
  });

  const heroFeatures = [
    {
      icon: Brain,
      title: "مشاوره فنی",
      description: "راهنمایی تخصصی برای انتخاب قطعات مناسب موتورتان",
    },
    {
      icon: Rocket,
      title: "ارسال سریع",
      description: "تحویل سریع و تضمین اصالت قطعات",
    },
    {
      icon: Award,
      title: "ضمانت کیفیت",
      description: "ضمانت بازگشت و کیفیت قطعات اورجینال",
    },
    {
      icon: Users,
      title: "مشتریان راضی",
      description: "بیش از ۲۰ هزار مشتری خوش‌اعتماد",
    },
  ];

  const recentArticles = [
    {
      id: "1",
      title: "راهنمای انتخاب شمع مناسب برای موتور شما",
      excerpt:
        "نکات کلیدی برای انتخاب و نگهداری شمع‌های موتور با طول عمر بالاتر",
      author: "فنی موتورکالا",
      date: "۱۴۰۳/۰۸/۲۵",
      readTime: "۳ دقیقه",
      views: 2340,
      category: "مراقبت موتور",
      image: "/images/pexels-photo-8386440.jpeg",
      tags: ["قطعات", "نگهداری", "شمع"],
    },
    {
      id: "2",
      title: "نکات نصب صحیح فیلتر هوا",
      excerpt: "راهنمای نصب و تعویض فیلتر هوا برای حفظ کارایی و کاهش مصرف سوخت",
      author: "تیم فنی",
      date: "۱۴۰۳/۰۸/۲۳",
      readTime: "۴ دقیقه",
      views: 1890,
      category: "نگهداری",
      image: "/images/pexels-photo-196644.jpeg",
      tags: ["فیلتر", "نگهداری", "بهینه‌سازی"],
    },
    {
      id: "3",
      title: "راهنمای تعویض روغن و بهترین مارک‌ها",
      excerpt: "مقایسه روغن‌های موتور و زمان مناسب تعویض برای افزایش عمر موتور",
      author: "تیم فنی",
      date: "۱۴۰۳/۰۸/۲۰",
      readTime: "۵ دقیقه",
      views: 3120,
      category: "مراقبت موتور",
      image: "/images/pexels-photo-265087.jpeg",
      tags: ["روغن", "نگهداری", "تعویض"],
    },
    {
      id: "4",
      title: "راهنمای خرید زنجیر و تسمه مناسب",
      excerpt:
        "چه زنجیری برای موتورسیکلت شما مناسب است و چطور آن را نگهداری کنید",
      author: "تیم فنی",
      date: "۱۴۰۳/۰۸/۱۸",
      readTime: "۶ دقیقه",
      views: 2780,
      category: "قطعات",
      image: "/images/pexels-photo-1181244.jpeg",
      tags: ["زنجیر", "قطعات", "نگهداری"],
    },
    {
      id: "5",
      title: "قطعات یدکی استاندارد و تقلبی: راه تشخیص",
      excerpt: "روش‌های تشخیص قطعات اورجینال از تقلبی برای محافظت از موتور",
      author: "فنی موتورکالا",
      date: "۱۴۰۳/۰۸/۱۵",
      readTime: "۴ دقیقه",
      views: 1650,
      category: "قطعات",
      image: "/images/pexels-photo-8386440.jpeg",
      tags: ["قطعات", "تشخیص", "کیفیت"],
    },
    {
      id: "6",
      title: "تعمیرات اساسی موتور: نکات و هزینه‌ها",
      excerpt:
        "چطور هزینه تعمیرات اساسی را برآورد کنیم و از چه خدماتی استفاده کنیم",
      author: "تیم خدمات",
      date: "۱۴۰۳/۰۸/۱۲",
      readTime: "۷ دقیقه",
      views: 2100,
      category: "خدمات",
      image: "/images/pexels-photo-196644.jpeg",
      tags: ["تعمیر", "خدمات", "هزینه"],
    },
  ];

  const testimonials = [
    {
      name: "رضا احمدی",
      role: "مشتری",
      company: "دیجی‌کالا",
      image: "/images/pexels-photo-1043471.jpeg",
      comment:
        "موتورکالا قطعاتی با کیفیت و ارسال سریع دارد؛ همیشه از خریدها راضی‌ام.",
      rating: 5,
      course: "فروش قطعات",
    },
    {
      name: "فاطمه میرزایی",
      role: "مشتری",
      company: "اسنپ",
      image: "/images/pexels-photo-1239291.jpeg",
      comment:
        "پشتیبانی سریع و قطعات اورجینال باعث شد به این فروشگاه اعتماد کنم.",
      rating: 5,
      course: "فروش قطعات",
    },
    {
      name: "محمد کریمی",
      role: "مشتری",
      company: "بامیلو",
      image: "/images/pexels-photo-1222271.jpeg",
      comment:
        "بعد از خرید لوازم یدکی از اینجا، عملکرد موتور دستگاهم بهتر شده است.",
      rating: 5,
      course: "فروش قطعات",
    },
  ];

  const newsUpdates = [
    {
      title: "آغاز فروش ویژه تابستانی",
      description: "تخفیف‌های ویژه روی قطعات پرمصرف موتور",
      date: "۱۴۰۳/۰۸/۲۵",
      type: "اخبار",
    },
    {
      title: "همکاری با تامین‌کنندگان معتبر",
      description: "افزودن قطعات اورجینال از برندهای مطرح به کاتالوگ",
      date: "۱۴۰۳/۰۸/۲۰",
      type: "همکاری",
    },
    {
      title: "حراج محصولات قدیمی",
      description: "حراج محدود با تخفیف‌های ویژه برای محصولات مشخص",
      date: "۱۴۰۳/۰۸/۱۸",
      type: "حراج",
    },
  ];

  const featuredCourses = products.slice(0, 4);

  const categories = [
    {
      name: "قطعات موتوری",
      icon: Code,
      count: 420,
      color: "from-blue-500 to-cyan-500",
      description: "قطعات و لوازم یدکی",
    },
    {
      name: "لوازم جانبی",
      icon: Palette,
      count: 230,
      color: "from-pink-500 to-rose-500",
      description: "اکسسوری و محافظ‌ها",
    },
    {
      name: "تجهیزات سرویس",
      icon: BarChart,
      count: 160,
      color: "from-green-500 to-emerald-500",
      description: "ابزار و تجهیزات تعمیر",
    },
    {
      name: "قطعات الکترونیکی",
      icon: Target,
      count: 90,
      color: "from-purple-500 to-violet-500",
      description: "قطعات و سنسورها",
    },
    {
      name: "روغن و روانکارها",
      icon: Brain,
      count: 120,
      color: "from-orange-500 to-amber-500",
      description: "روغن موتور و افزودنی‌ها",
    },
    {
      name: "تجهیزات ایمنی",
      icon: Shield,
      count: 75,
      color: "from-red-500 to-pink-500",
      description: "کلاه، دستکش و محافظ‌ها",
    },
  ];

  const stats = [
    { icon: Users, value: 25000, label: "مشتری فعال", suffix: "+" },
    { icon: BookOpen, value: 1200, label: "محصول موجود", suffix: "+" },
    { icon: Award, value: 200, label: "فروشنده معتبر", suffix: "+" },
    { icon: Star, value: 99, label: "رضایت", suffix: "%" },
  ];

  const instructors = [
    {
      id: "1",
      name: "نام برند",
      title: "حوزه برند",
      experience: "سال تاسیس",
      students: 4500,
      courses: 15,
      rating: 4.9,
      image: "./images/banner2.jpg",
      specialties: ["محصولات", "محصولات", "محصولات"],
    },
    {
      id: "2",
      name: "نام برند",
      title: "حوزه برند",
      experience: "سال تاسیس",
      students: 4500,
      courses: 15,
      rating: 4.9,
      image: "./images/banner2.jpg",
      specialties: ["محصولات", "محصولات", "محصولات"],
    },
    {
      id: "3",
      name: "نام برند",
      title: "حوزه برند",
      experience: "سال تاسیس",
      students: 4500,
      courses: 15,
      rating: 4.9,
      image: "./images/banner2.jpg",
      specialties: ["محصولات", "محصولات", "محصولات"],
    },
    {
      id: "4",
      name: "نام برند",
      title: "حوزه برند",
      experience: "سال تاسیس",
      students: 4500,
      courses: 15,
      rating: 4.9,
      image: "./images/banner2.jpg",
      specialties: ["محصولات", "محصولات", "محصولات"],
    },
  ];

  const upcomingEvents = [
    {
      title: "نصب محصولات در محل",
      date: "شنبه تا چهارشنبه",
      time: "11:00 - 18:00",
      speaker: "متخصصین نصب رادرکس",
      price: 1200,
      type: "نصب محصولات",
    },
    {
      title: "تعویض روغن در محل",
      date: "شنبه تا چهارشنبه",
      time: "11:00 - 18:00",
      speaker: "متخصصین نصب رادرکس",
      price: 1200,
      type: "تعویض روغن",
    },
    {
      title: "نصب محصولات در محل",
      date: "شنبه تا چهارشنبه",
      time: "11:00 - 18:00",
      speaker: "متخصصین نصب رادرکس",
      price: 1200,
      type: "نصب محصولات",
    },
  ];

  const partnerships = [
    { name: "دیجی‌کالا", logo: "🛒" },
    { name: "اسنپ", logo: "🚗" },
    { name: "بامیلو", logo: "🛍️" },
    { name: "تپسی", logo: "🚕" },
    { name: "دیوار", logo: "🏠" },
    { name: "هایپراستار", logo: "📱" },
  ];

  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    const interval2 = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsUpdates.length);
    }, 3000);

    const interval3 = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % partnerships.length);
    }, 2000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        let currentValue = 0;
        const increment = stat.value / steps;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= stat.value) {
            currentValue = stat.value;
            clearInterval(timer);
          }

          setAnimatedStats((prev) => ({
            ...prev,
            [index === 0
              ? "students"
              : index === 1
                ? "courses"
                : index === 2
                  ? "instructors"
                  : "satisfaction"]: Math.floor(currentValue),
          }));
        }, stepDuration);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateNumbers();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById("stats-section");
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rtl overflow-hidden">
      {/* ══════════════════════════════════════════
          HERO SECTION — Premium Motorcycle Store
      ══════════════════════════════════════════ */}
      <section className="hero-section">
        {/* Background image — user's existing image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero1.png"
            alt="موتورسیکلت اسپرت"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Diagonal dark overlay: right side fades to black for content */}
        <div className="hero-slash z-1" />

        {/* Decorative red glow bottom-left */}
        <div className="hero-red-glow" />

        {/* Decorative vertical red line */}
        <div className="hero-red-line hidden lg:block" />

        {/* Scan line animation on image area */}
        <div className="hero-scanline" />

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 h-full min-h-[92vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full py-24 lg:py-0">
            {/* LEFT — Visual spacer on desktop (image is in background) */}
            {/*<div className="hidden lg:block" />*/}

            {/* RIGHT — Content block */}
            <div className="flex flex-col justify-center space-y-8 animate-fade-in-left lg:pr+45 xl:pr+45">
              {/* Brand tag */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-[#D90416]" />
                <span
                  className="text-xs font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "#D90416" }}
                >
                  RideRex
                </span>
              </div>

              {/* Main headline */}
              <div className="space-y-2">
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] hero-title-shadow"
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #c8c8c8 60%, #888 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  فروشگاه رایدرکس
                </h1>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md">
                  بیش از ۱۲۰۰ قطعه و لوازم یدکی موتور سیکلت
                  <br />
                  <span className="text-gray-500 text-sm">
                    با ضمانت اصالت و ارسال سریع به سراسر کشور
                  </span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="glow-button inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>مشاهده محصولات</span>
                </Link>
                <Link
                  to="/courses"
                  className="btn-outline-glass inline-flex items-center gap-3 px-8 py-4 text-base font-semibold"
                >
                  <Search className="h-5 w-5 opacity-70" />
                  <span>جستجوی قطعه</span>
                </Link>
              </div>

              {/* Mini trust badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { emoji: "✓", text: "ضمانت اصالت" },
                  { emoji: "🚚", text: "ارسال سریع" },
                  { emoji: "↩", text: "۷ روز مرجوعی" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-xs text-gray-400"
                  >
                    <span className="text-[#D90416] font-bold">
                      {badge.emoji}
                    </span>
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURE ROW — bottom of hero ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            background: "rgba(5,5,5,0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(217,4,22,0.18)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { icon: "🚚", title: "ارسال سریع", sub: "ارسال به سراسر کشور" },
                { icon: "🛡", title: "ضمانت اصالت", sub: "تضمین اصالت کالا" },
                {
                  icon: "🎧",
                  title: "مشاوره تخصصی",
                  sub: "پشتیبانی قبل از خرید",
                },
                { icon: "↩", title: "ضمانت بازگشت", sub: "۷ روز ضمانت بازگشت" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="feature-card flex items-center gap-4 px-6 py-5 cursor-default"
                  style={{
                    borderRight:
                      i !== 3 ? "1px solid rgba(217,4,22,0.12)" : "none",
                  }}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white leading-none mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATISTICS BAR
      ══════════════════════════════════════════ */}
      <section id="stats-section" className="stats-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-[rgba(255,255,255,0.05)]">
            {[
              { icon: "👥", value: "25,000+", label: "مشتری فعال" },
              { icon: "📦", value: "1,200+", label: "محصول متنوع" },
              { icon: "✅", value: "99٪", label: "رضایت مشتریان" },
              { icon: "🏪", value: "200+", label: "فروشنده معتبر" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-6">
                <span
                  className="text-2xl shrink-0"
                  style={{ filter: "drop-shadow(0 0 6px rgba(217,4,22,0.6))" }}
                >
                  {stat.icon}
                </span>
                <div>
                  <p className="text-xl md:text-2xl font-black text-white leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* News Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{
            background: "rgba(10,10,10,0.8)",
            border: "1px solid rgba(217,4,22,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="bg-[#D90416] px-3 py-1 rounded-full text-white text-xs font-bold shrink-0 animate-pulse">
            جدید
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-sm text-gray-300">
              {newsUpdates[currentNews].title} —{" "}
              {newsUpdates[currentNews].description}
            </div>
          </div>
          <Bell className="h-4 w-4 text-[#D90416] shrink-0" />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            دسته‌بندی‌های <span className="text-gradient">محصولات</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
            از بین بیش از ۱۲۰۰ قطعه و لوازم یدکی، قطعه مناسب موتورتان را پیدا
            کنید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category, index) => {
            const CatIcon = category.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden glass rounded-2xl p-4 md:p-8 card-hover"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 md:mb-6`}
                  >
                    <CatIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 mb-2 text-sm md:text-base">
                    {category.description}
                  </p>
                  <p className="text-purple-400 font-semibold mb-3 md:mb-4 text-sm md:text-base">
                    {category.count} محصول موجود
                  </p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center space-x-2 space-x-reverse text-purple-400 hover:text-purple-300 font-medium group-hover:translate-x-2 transition-transform text-sm md:text-base"
                  >
                    <span>مشاهده محصولات</span>
                    <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            محصولات <span className="text-gradient">پیشنهادی</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">
            محبوب‌ترین و جدیدترین قطعات و لوازم
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            مقالات <span className="text-gradient">اخیر</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">
            آخرین مقالات و نکات فنی از تیم فنی موتورکالا
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {recentArticles.map((article, index) => (
            <article
              key={article.id}
              className="glass rounded-xl overflow-hidden card-hover"
            >
              <div className="relative">
                <img
                  src={article.image.replace("./images/", "/images/")}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-xs">
                  {article.readTime}
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse mb-2 md:mb-3 text-xs md:text-sm text-gray-400">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <User className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{article.date}</span>
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 line-clamp-2">
                  <Link
                    to={`/blog/${article.id}`}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>

                <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3 space-x-reverse text-xs text-gray-400">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Eye className="h-3 w-3" />
                      <span>{article.views.toLocaleString("fa")}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${article.id}`}
                    className="text-purple-400 hover:text-purple-300 text-xs md:text-sm font-medium flex items-center space-x-1 space-x-reverse"
                  >
                    <span>ادامه مطلب</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1 mt-2 md:mt-3">
                  {article.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 space-x-reverse glass px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </section>

      {/* Instructors Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            تامین‌کنندگان <span className="text-gradient">برتر</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">
            با بهترین تامین‌کنندگان و برندهای معتبر آشنا شوید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="glass rounded-xl overflow-hidden card-hover"
            >
              <div className="relative">
                <img
                  src={instructor.image.replace("./images/", "/images/")}
                  alt={instructor.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-500 px-2 py-1 rounded-full text-xs font-medium">
                  {instructor.experience}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-white text-xs">
                  {instructor.courses} محصول
                </div>
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {instructor.name}
                </h3>
                <p className="text-purple-400 mb-2 md:mb-3 text-xs md:text-sm">
                  {instructor.title}
                </p>

                <div className="flex items-center justify-between mb-3 md:mb-4 text-xs md:text-sm">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                    <Users className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{instructor.students.toLocaleString("fa")} نفر</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                  {instructor.specialties
                    .slice(0, 2)
                    .map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                </div>

                <Link
                  to={`/instructor/${instructor.id}`}
                  className="w-full glow-button py-2 rounded-lg text-xs md:text-sm font-medium text-center block"
                >
                  مشاهده پروفایل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            داستان‌های <span className="text-gradient">موفقیت</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">
            تجربه واقعی کسانی که با ما زندگی‌شان تغییر کرد
          </p>
        </div>

        <div className="relative">
          <div className="glass rounded-2xl p-8 text-center min-h-[300px] flex items-center justify-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-1 space-x-reverse mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ),
                )}
              </div>

              <blockquote className="text-lg md:text-2xl text-gray-300 leading-relaxed mb-6 md:mb-8 italic">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <img
                  src={testimonials[currentTestimonial].image.replace(
                    "./images/",
                    "/images/",
                  )}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-right">
                  <div className="font-bold text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-purple-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-purple-500 scale-125"
                    : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            خدمات<span className="text-gradient">رایدرکس</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">
            از خدمات تیم تخصص و غنی رادرکس استفاده کنید
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="glass rounded-xl p-4 md:p-6 card-hover">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span
                  className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === "وبینار"
                      ? "bg-blue-500/20 text-blue-400"
                      : event.type === "کارگاه"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {event.type}
                </span>
                <div className="text-gray-400 text-xs md:text-sm">
                  {event.date}
                </div>
              </div>

              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                {event.title}
              </h3>

              <div className="space-y-2 text-xs md:text-sm text-gray-400 mb-3 md:mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{event.speaker}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{event.attendees} شرکت‌کننده</span>
                </div>
              </div>

              <button className="w-full glow-button py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium">
                رزرو رایگان
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Partnerships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            شرکای <span className="text-gradient">ما</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400">
            همکاری با بهترین شرکت‌های کشور
          </p>
        </div>

        <div className="glass rounded-xl p-4 md:p-8 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center">
              <div className="text-center opacity-100 transition-all duration-500">
                <div className="text-3xl md:text-5xl mb-3 md:mb-4">
                  {partnerships[currentPartner].logo}
                </div>
                <div className="text-sm md:text-lg text-gray-300 font-medium">
                  {partnerships[currentPartner].name}
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">
                  شریک تجاری ما
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 md:mt-6 space-x-2 space-x-reverse">
              {partnerships.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPartner(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${
                    index === currentPartner
                      ? "bg-purple-500 scale-125"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="glass rounded-2xl p-6 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Mail className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              عضو خبرنامه شوید
            </h2>
            <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8">
              از آخرین اخبار، تخفیف‌ها و پیشنهادات ویژه باخبر شوید
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 py-3 md:py-4 px-4 md:px-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
              />
              <button className="glow-button px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base">
                عضویت
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8 space-x-reverse mt-6 md:mt-8 text-xs md:text-sm text-gray-400">
              <div className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span>بدون اسپم</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span>لغو آسان</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                <span>محتوای ارزشمند</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          <div className="glass rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              با ما در تماس باشید
            </h2>
            <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
              سوالی دارید؟ تیم پشتیبانی ما ۲۴ ساعته آماده پاسخگویی است
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">
                    تلفن پشتیبانی
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">
                    ایمیل
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    info@motorkala.ir
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 md:space-x-4 space-x-reverse">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">
                    چت آنلاین
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    پاسخگویی فوری
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              پیام سریع
            </h3>
            <form className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <input
                  type="text"
                  placeholder="نام شما"
                  className="py-2 md:py-3 px-3 md:px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="py-2 md:py-3 px-3 md:px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                />
              </div>
              <textarea
                rows={4}
                placeholder="پیام شما..."
                className="w-full py-2 md:py-3 px-3 md:px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm md:text-base"
              ></textarea>
              <button className="w-full glow-button py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base">
                ارسال پیام
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="relative overflow-hidden glass rounded-3xl p-6 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-purple-500 to-pink-500 px-4 md:px-6 py-2 md:py-3 rounded-full text-white font-medium mb-6 md:mb-8 text-sm md:text-base">
              <Gift className="h-4 w-4 md:h-5 md:w-5" />
              <span>پیشنهاد ویژه امروز</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              آماده ارتقاء و نگهداری موتورتان هستید؟
            </h2>

            <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-10 max-w-3xl mx-auto">
              با بیش از ۲۵ هزار مشتری راضی همراه شوید
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link
                to="/courses"
                className="group relative overflow-hidden glow-button px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-base md:text-xl flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <Zap className="h-5 w-5 md:h-6 md:w-6" />
                  <span>مشاهده تخفیف‌ها</span>
                </span>
              </Link>

              <Link
                to="/about"
                className="glass px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-base md:text-xl hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Heart className="h-5 w-5 md:h-6 md:w-6" />
                <span>درباره ما</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage3;
