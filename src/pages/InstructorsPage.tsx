import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Users,
  Package,
  Search,
  MapPin,
  Award,
  ShieldCheck,
} from "lucide-react";

function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "همه فروشندگان" },
    { id: "parts", name: "قطعات یدکی" },
    { id: "safety", name: "تجهیزات ایمنی" },
    { id: "accessories", name: "لوازم جانبی" },
    { id: "oil", name: "روغن و مواد" },
  ];

  const sellers = [
    {
      id: "1",
      name: "نمایندگی هوندا ایران",
      title: "فروشنده رسمی قطعات هوندا",
      category: "parts",
      experience: "۱۵ سال سابقه",
      customers: 8500,
      products: 320,
      rating: 4.9,
      image: "./images/pexels-photo-1043471.jpeg",
      bio: "نمایندگی رسمی هوندا در ایران، ارائه‌دهنده قطعات اورجینال با ضمانت کارخانه",
      location: "تهران",
      specialties: ["قطعات موتوری", "صندلی", "سیستم برق", "بدنه"],
    },
    {
      id: "2",
      name: "فروشگاه MT Helmets",
      title: "نمایندگی رسمی کلاه‌های MT",
      category: "safety",
      experience: "۸ سال سابقه",
      customers: 4200,
      products: 95,
      rating: 4.8,
      image: "./images/pexels-photo-1239291.jpeg",
      bio: "نماینده انحصاری برند MT Helmets در ایران، ارائه کلاه‌های ایمنی استاندارد اروپا",
      location: "تهران",
      specialties: ["کلاه ایمنی", "ویزور", "پد داخلی", "اکسسوری کلاه"],
    },
    {
      id: "3",
      name: "یاماها پارتس شاپ",
      title: "تامین‌کننده قطعات یاماها",
      category: "parts",
      experience: "۱۲ سال سابقه",
      customers: 6100,
      products: 280,
      rating: 4.7,
      image: "./images/pexels-photo-1222271.jpeg",
      bio: "تامین‌کننده معتبر قطعات اصل یاماها با بیش از ۱۲ سال تجربه در بازار ایران",
      location: "اصفهان",
      specialties: ["قطعات یاماها", " صندلی", "فیلتر", "روغن‌کاری"],
    },
    {
      id: "4",
      name: "پوشاک موتورسوار کاوه",
      title: "فروشنده تجهیزات ایمنی راکب",
      category: "safety",
      experience: "۶ سال سابقه",
      customers: 2800,
      products: 140,
      rating: 4.6,
      image: "./images/pexels-photo-1181519.jpeg",
      bio: "ارائه‌دهنده لباس‌های راکب، دستکش و پوشش‌های محافظ با استاندارد CE",
      location: "تهران",
      specialties: ["لباس راکب", "دستکش", "کفش موتورسواری", "محافظ بدن"],
    },
    {
      id: "5",
      name: "روان‌کارهای صنعتی پارس",
      title: "تامین‌کننده روغن و مواد",
      category: "oil",
      experience: "۱۸ سال سابقه",
      customers: 9200,
      products: 75,
      rating: 4.5,
      image: "./images/pexels-photo-1043474.jpeg",
      bio: "نماینده برندهای معتبر روغن موتور در ایران؛ Castrol، Motul و Shell",
      location: "مشهد",
      specialties: ["روغن موتور", "گریس", "مایع ترمز", "روغن زنجیر"],
    },
    {
      id: "6",
      name: "اکسسوری موتور رضا",
      title: "فروشنده لوازم جانبی موتور",
      category: "accessories",
      experience: "۵ سال سابقه",
      customers: 3100,
      products: 210,
      rating: 4.4,
      image: "./images/pexels-photo-1181686.jpeg",
      bio: "عرضه انواع لوازم جانبی و اکسسوری موتورسیکلت از برندهای معتبر جهانی",
      location: "شیراز",
      specialties: ["کیف باربند", "GPS موتور", "نورپردازی LED", "آینه"],
    },
    {
      id: "7",
      name: "KTM پارتس سنتر",
      title: "مرکز قطعات KTM و آفرود",
      category: "parts",
      experience: "۱۰ سال سابقه",
      customers: 3900,
      products: 185,
      rating: 4.8,
      image: "./images/pexels-photo-1043473.jpeg",
      bio: "تخصص در قطعات آفرود و KTM؛ سوسپانسیون، تایر، زنجیر و قطعات بدنه",
      location: "تبریز",
      specialties: ["قطعات KTM", "سوسپانسیون", "تایر آفرود", "زنجیر"],
    },
    {
      id: "8",
      name: "برق‌کالای موتور ملی",
      title: "تامین‌کننده قطعات برقی",
      category: "parts",
      experience: "۷ سال سابقه",
      customers: 2600,
      products: 160,
      rating: 4.6,
      image: "./images/pexels-photo-1181690.jpeg",
      bio: "متخصص در قطعات برقی و الکترونیکی موتور: باتری، استارت، چراغ و سنسور",
      location: "کرج",
      specialties: ["باتری", "استارت موتور", "چراغ LED", "سنسور"],
    },
  ];

  const filtered = sellers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat =
      selectedCategory === "all" || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* ── Header ── */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">فروشندگان معتبر</h1>
        <p className="text-xl text-gray-400">
          با تامین‌کنندگان و فروشندگان رسمی موتوشاپ آشنا شوید
        </p>
      </div>

      {/* ── Search & Filter ── */}
      <div className="glass rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در فروشندگان..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D90416]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D90416]"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#111]">
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          {
            value: sellers.length,
            label: "فروشنده معتبر",
            color: "text-[#D90416]",
          },
          {
            value: sellers
              .reduce((s, i) => s + i.customers, 0)
              .toLocaleString("fa"),
            label: "مشتری راضی",
            color: "text-green-400",
          },
          {
            value: sellers
              .reduce((s, i) => s + i.products, 0)
              .toLocaleString("fa"),
            label: "محصول موجود",
            color: "text-blue-400",
          },
          {
            value: (
              sellers.reduce((s, i) => s + i.rating, 0) / sellers.length
            ).toFixed(1),
            label: "میانگین امتیاز",
            color: "text-yellow-400",
          },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-xl p-6 text-center">
            <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Sellers Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((seller) => (
          <div
            key={seller.id}
            className="glass rounded-xl overflow-hidden card-hover"
          >
            <div className="relative">
              <img
                src={seller.image}
                alt={seller.name}
                className="w-full h-48 object-cover"
              />
              <div
                className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(217,4,22,0.85)", color: "#fff" }}
              >
                {seller.experience}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">{seller.name}</h3>
              <p className="text-[#D90416] text-sm mb-3">{seller.title}</p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {seller.bio}
              </p>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{seller.location}</span>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-4">
                {seller.specialties.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      background: "rgba(217,4,22,0.12)",
                      color: "#ff4d5e",
                    }}
                  >
                    {s}
                  </span>
                ))}
                {seller.specialties.length > 3 && (
                  <span className="text-gray-500 text-xs self-center">
                    +{seller.specialties.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{seller.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{seller.customers.toLocaleString("fa")} مشتری</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Package className="h-4 w-4" />
                  <span>{seller.products} محصول</span>
                </div>
              </div>

              <Link
                to={`/instructor/${seller.id}`}
                className="w-full glow-button py-2 rounded-lg text-sm font-semibold text-center block text-white"
              >
                مشاهده فروشنده
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-2xl font-semibold mb-2">فروشنده‌ای یافت نشد</h3>
          <p className="text-gray-400">
            لطفاً کلمات جستجو یا فیلترها را تغییر دهید
          </p>
        </div>
      )}

      {/* ── Join as Seller CTA ── */}
      <div
        className="mt-16 rounded-xl p-8 text-center"
        style={{
          background: "rgba(10,10,10,0.8)",
          border: "1px solid rgba(217,4,22,0.25)",
          backdropFilter: "blur(12px)",
        }}
      >
        <ShieldCheck className="h-12 w-12 text-[#D90416] mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">
          فروشنده یا تامین‌کننده هستید؟
        </h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          به شبکه فروشندگان معتبر موتوشاپ بپیوندید و محصولاتتان را به هزاران
          موتورسوار در سراسر کشور عرضه کنید
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="glow-button px-8 py-4 rounded-lg font-semibold text-white"
          >
            درخواست همکاری
          </Link>
          <Link
            to="/about"
            className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            اطلاعات بیشتر
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InstructorsPage;
