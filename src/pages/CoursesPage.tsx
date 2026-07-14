import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Users, Package, Filter, Search, SlidersHorizontal } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/products/ProductCard";

function CoursesPage() {
  const [searchTerm, setSearchTerm]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange]           = useState("all");
  const [sortBy, setSortBy]                   = useState("popular");

  const categories = [
    { id: "all",         name: "همه محصولات" },
    { id: "parts",       name: "قطعات موتوری" },
    { id: "accessories", name: "لوازم جانبی" },
    { id: "service",     name: "تجهیزات سرویس" },
    { id: "lubricants",  name: "روغن و روانکار" },
  ];

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat    = selectedCategory === "all" || p.category === selectedCategory;
    const matchPrice  = priceRange === "all" ||
      (priceRange === "under200" && p.price < 200000) ||
      (priceRange === "200to400" && p.price >= 200000 && p.price < 400000) ||
      (priceRange === "over400"  && p.price >= 400000);
    return matchSearch && matchCat && matchPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular")   return b.students - a.students;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc")return b.price - a.price;
    if (sortBy === "rating")    return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-3">فروشگاه محصولات</h1>
        <p className="text-lg text-gray-400">
          بیش از ۱۲۰۰ قطعه و لوازم موتورسیکلت — اورجینال، با ضمانت
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: '📦', value: `${products.length}+`, label: 'محصول موجود' },
          { icon: '🏪', value: '۲۰+',  label: 'برند معتبر' },
          { icon: '🚚', value: '۲۴h',  label: 'ارسال سریع' },
          { icon: '✅', value: '۹۹٪',  label: 'رضایت مشتری' },
        ].map((s, i) => (
          <div key={i} className="feature-card rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-lg font-black text-white">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-5 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D90416]"
            />
          </div>

          {/* Category */}
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D90416]">
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#111]">{c.name}</option>
            ))}
          </select>

          {/* Price */}
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
            className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D90416]">
            <option value="all"        className="bg-[#111]">همه قیمت‌ها</option>
            <option value="under200"   className="bg-[#111]">زیر ۲۰۰ هزار</option>
            <option value="200to400"   className="bg-[#111]">۲۰۰ تا ۴۰۰ هزار</option>
            <option value="over400"    className="bg-[#111]">بالای ۴۰۰ هزار</option>
          </select>

          {/* Sort */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D90416]">
            <option value="popular"    className="bg-[#111]">پرفروش‌ترین</option>
            <option value="rating"     className="bg-[#111]">بالاترین امتیاز</option>
            <option value="price-asc"  className="bg-[#111]">ارزان‌ترین</option>
            <option value="price-desc" className="bg-[#111]">گران‌ترین</option>
          </select>
        </div>

        {/* Active filters */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-gray-500">{sorted.length} محصول یافت شد</span>
          {selectedCategory !== "all" && (
            <button onClick={() => setSelectedCategory("all")}
              className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: 'rgba(217,4,22,0.15)', color: '#ff4d5e', border: '1px solid rgba(217,4,22,0.3)' }}>
              {categories.find(c => c.id === selectedCategory)?.name} ×
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold mb-2">محصولی یافت نشد</h3>
          <p className="text-gray-400 mb-6">فیلترهای جستجو را تغییر دهید</p>
          <button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); setPriceRange("all"); }}
            className="glow-button px-6 py-3 rounded-xl font-semibold text-white">
            پاک کردن فیلترها
          </button>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
