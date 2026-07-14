import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, Users, Package, Heart, Share2, Box, Wrench,
  CheckCircle, Award, Truck, ShieldCheck, RotateCcw,
  ChevronLeft, ChevronRight, ZoomIn,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { MotorcycleSelectorModal } from "../components/installation-viewer/MotorcycleSelectorModal";

/* ── Review Form Component ── */
function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && text.trim()) {
      setSubmitted(true);
      setText("");
      setRating(0);
      setTimeout(() => setSubmitted(false), 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 mb-6">
      <h4 className="text-lg font-semibold mb-4">نظر خود را بنویسید</h4>
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-400">امتیاز شما:</label>
        <div className="flex flex-row-reverse justify-end gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`h-7 w-7 transition-all ${(hover || rating) >= star ? "fill-yellow-400 text-yellow-400 scale-110" : "fill-white/10 text-white/30"}`}
              />
            </button>
          ))}
        </div>
      </div>
      <textarea
        className="w-full rounded-lg p-3 bg-white/5 text-white border border-white/10 focus:border-[#D90416] focus:ring-1 focus:ring-[#D90416] outline-none resize-none min-h-[80px] mb-4"
        placeholder="تجربه خرید و استفاده از این محصول را بنویسید..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
      />
      <button
        type="submit"
        className="glow-button px-6 py-3 rounded-lg font-semibold text-white disabled:opacity-50"
        disabled={rating === 0 || !text.trim()}
      >
        ارسال نظر
      </button>
      {submitted && (
        <p className="text-green-400 mt-3 text-sm">نظر شما با موفقیت ثبت شد!</p>
      )}
    </form>
  );
}

/* ── Product Image Gallery Component ── */
function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="mb-8">
      {/* Main image */}
      <div
        className="relative rounded-2xl overflow-hidden mb-3 cursor-zoom-in"
        style={{
          background: "#0b0b0b",
          border: "1px solid rgba(217,4,22,0.2)",
        }}
        onClick={() => setZoomed(!zoomed)}
      >
        <img
          src={images[active]}
          alt={title}
          className={`w-full object-contain transition-all duration-500 ${zoomed ? "scale-125" : "scale-100"}`}
          style={{ height: "360px", objectPosition: "center" }}
        />
        {/* overlay bar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(8,8,8,0.75)",
                border: "1px solid rgba(217,4,22,0.35)",
              }}
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(8,8,8,0.75)",
                border: "1px solid rgba(217,4,22,0.35)",
              }}
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
          </>
        )}

        {/* zoom hint */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-gray-300"
          style={{
            background: "rgba(0,0,0,0.6)",
            padding: "4px 10px",
            borderRadius: "999px",
          }}
        >
          <ZoomIn className="h-3.5 w-3.5" />
          {zoomed ? "کلیک برای کوچک‌نمایی" : "کلیک برای بزرگ‌نمایی"}
        </div>

        {/* image counter */}
        <div
          className="absolute bottom-3 right-3 text-xs text-gray-300"
          style={{
            background: "rgba(0,0,0,0.6)",
            padding: "4px 10px",
            borderRadius: "999px",
          }}
        >
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all ${active === i ? "ring-2 ring-[#D90416] opacity-100" : "opacity-50 hover:opacity-80"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
function CourseDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const product = {
    id: id || "1",
    title: "صندلی اصل Honda CBR600RR",
    brand: "Honda",
    sku: "HND-BRK-CBR6-OEM",
    rating: 4.9,
    reviewCount: 186,
    buyers: 1250,
    price: 480000,
    originalPrice: 620000,
    images: [
      "./images/products/product1.jpg",
      "./images/pexels-photo-11035380.jpeg",
      "./images/pexels-photo-196644.jpeg",
    ],
    badge: "اورجینال",
    category: "صندلی و قطعات موتورسیکلت",
    compatibility: "Honda CBR600RR — مدل‌های ۲۰۰۷ تا ۲۰۱۹",
    warranty: "۱۲ ماه ضمانت اصالت",
    stock: 23,
    description:
      "صندلی اصل هوندا مخصوص CBR600RR با استاندارد OEM کارخانه. بالاترین قدرت ترمزگیری در تمام شرایط آب‌وهوایی با کمترین سایش. مناسب برای استفاده در جاده و پیست.",
    highlights: [
      "قطعه ۱۰۰٪ اورجینال Honda با شناسه OEM",
      "استاندارد ECE R90 اروپا",
      "مقاوم در برابر حرارت بالا تا ۶۵۰ درجه",
      "سازگار با سیستم ABS",
      "عمر ۲ برابر بیشتر نسبت به قطعات تقلبی",
      "فاکتور رسمی و برچسب اصالت",
    ],
    specs: [
      { label: "برند", value: "Honda (OEM)" },
      { label: "شماره قطعه", value: "45105-MFJ-006" },
      { label: "دسته‌بندی", value: "صندلی و قطعات موتورسیکلت" },
      { label: "جنس", value: "سرامیک مرکب" },
      { label: "سازگاری", value: "CBR600RR 2007-2019" },
      { label: "موقعیت", value: "جلو" },
      { label: "استاندارد", value: "ECE R90" },
      { label: "وزن", value: "۱۸۰ گرم" },
    ],
    seller: { name: "نمایندگی هوندا ایران", rating: 4.9, since: "۱۳۸۸" },
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      instructor: product.brand,
    });
  };

  const _isPurchased = user?.purchasedCourses?.includes(product.id);
  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ══ LEFT / MAIN ══ */}
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-5 flex items-center gap-2">
            <Link to="/" className="hover:text-[#D90416] transition-colors">
              خانه
            </Link>
            <span>/</span>
            <Link
              to="/courses"
              className="hover:text-[#D90416] transition-colors"
            >
              فروشگاه
            </Link>
            <span>/</span>
            <span className="text-gray-300">{product.title}</span>
          </nav>

          {/* Product Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{ background: "#D90416", color: "#fff" }}
              >
                {product.badge}
              </span>
              <span className="text-xs text-gray-500">{product.category}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black mb-2 text-white">
              {product.title}
            </h1>
            <p className="text-sm text-gray-400 mb-3">
              {product.compatibility}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviewCount} نظر)
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Users className="h-4 w-4" />
                <span>{product.buyers.toLocaleString("fa")} خریدار</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Package className="h-4 w-4" />
                <span>SKU: {product.sku}</span>
              </div>
            </div>
          </div>

          {/* ── PRODUCT IMAGE GALLERY ── */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Discount Timer */}
          <CountdownTimer />

          {/* ── TABS ── */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="border-b border-white/10">
              <nav className="flex flex-wrap">
                {[
                  { id: "overview", name: "توضیحات" },
                  { id: "specs", name: "مشخصات فنی" },
                  { id: "seller", name: "فروشنده" },
                  { id: "reviews", name: "نظرات خریداران" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-4 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? "text-[#D90416] border-[#D90416] bg-[rgba(217,4,22,0.05)]"
                        : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-5">
              {/* OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      درباره این محصول
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      ویژگی‌های کلیدی
                    </h3>
                    <ul className="space-y-2">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#D90416] mt-0.5 shrink-0" />
                          <span className="text-gray-300 text-sm">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(217,4,22,0.06)",
                      border: "1px solid rgba(217,4,22,0.2)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-6 w-6 text-[#D90416] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white mb-1">
                          {product.warranty}
                        </p>
                        <p className="text-sm text-gray-400">
                          در صورت دریافت قطعه غیراصل، کالا بدون هیچ سوالی مرجوع
                          می‌شود.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SPECS */}
              {activeTab === "specs" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">مشخصات فنی</h3>
                  <div
                    className="divide-y divide-white/5 rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {product.specs.map((s, i) => (
                      <div
                        key={i}
                        className={`flex items-center px-4 py-3 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                      >
                        <span className="w-40 text-sm text-gray-500 shrink-0">
                          {s.label}
                        </span>
                        <span className="text-sm text-white font-medium">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SELLER */}
              {activeTab === "seller" && (
                <div className="space-y-5">
                  <div
                    className="flex items-center gap-4 p-5 rounded-xl"
                    style={{
                      background: "rgba(217,4,22,0.06)",
                      border: "1px solid rgba(217,4,22,0.2)",
                    }}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[rgba(217,4,22,0.3)]">
                      <img
                        src="./images/pexels-photo-1043471.jpeg"
                        alt={product.seller.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white">
                          {product.seller.name}
                        </span>
                        <ShieldCheck className="h-4 w-4 text-[#D90416]" />
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {product.seller.rating}
                        </span>
                        <span>عضو از {product.seller.since}</span>
                      </div>
                    </div>
                    <Link
                      to="/instructor/1"
                      className="mr-auto glow-button px-4 py-2 rounded-lg text-sm font-semibold text-white shrink-0"
                    >
                      پروفایل
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        icon: <Truck className="h-5 w-5 text-[#D90416]" />,
                        title: "ارسال سریع",
                        desc: "تحویل ۲۴ تا ۷۲ ساعته",
                      },
                      {
                        icon: (
                          <ShieldCheck className="h-5 w-5 text-[#D90416]" />
                        ),
                        title: "ضمانت اصالت",
                        desc: "قطعه ۱۰۰٪ اورجینال",
                      },
                      {
                        icon: <RotateCcw className="h-5 w-5 text-[#D90416]" />,
                        title: "۷ روز مرجوعی",
                        desc: "بدون هیچ سوالی",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{
                          background: "rgba(10,10,10,0.6)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {item.icon}
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REVIEWS */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-black text-yellow-400 mb-2">
                      {product.rating}
                    </div>
                    <div className="flex justify-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      {product.reviewCount} نظر از{" "}
                      {product.buyers.toLocaleString("fa")} خریدار
                    </p>
                  </div>

                  {user ? (
                    <ReviewForm />
                  ) : (
                    <div className="glass rounded-xl p-5 text-center text-gray-400 text-sm mb-4">
                      برای ثبت نظر ابتدا{" "}
                      <Link
                        to="/login"
                        className="text-[#D90416] font-bold mx-1"
                      >
                        وارد شوید
                      </Link>
                    </div>
                  )}

                  <div className="space-y-4">
                    {[
                      {
                        name: "علی محمدی",
                        rating: 5,
                        date: "۱۴۰۳/۰۸/۱۰",
                        comment:
                          "قطعه کاملاً اصله. روی موتورم نصب کردم، ترمزگیری خیلی بهتر شد. بسته‌بندی هم عالی بود.",
                      },
                      {
                        name: "سارا احمدی",
                        rating: 5,
                        date: "۱۴۰۳/۰۸/۰۵",
                        comment:
                          "از این فروشنده چند بار خرید کردم، همیشه اورجینال و سریع ارسال میشه.",
                      },
                      {
                        name: "محمد حسینی",
                        rating: 4,
                        date: "۱۴۰۳/۰۷/۲۸",
                        comment:
                          "محصول خوب بود، فقط ارسال یک روز تاخیر داشت. در کل راضیم.",
                      },
                    ].map((r, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-5"
                        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
                              style={{ background: "#D90416" }}
                            >
                              {r.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{r.name}</p>
                              <p className="text-xs text-gray-500">{r.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(r.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══ RIGHT / SIDEBAR ══ */}
        <div className="lg:col-span-1">
          <div className="glass rounded-xl p-6 sticky top-24 z-10">
            {/* Price */}
            <div className="mb-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-black text-white">
                  {product.price.toLocaleString("fa")}
                </span>
                <span className="text-base text-gray-400">تومان</span>
                {discount > 0 && (
                  <span
                    className="mr-auto text-sm font-bold px-2 py-0.5 rounded"
                    style={{ background: "#D90416", color: "#fff" }}
                  >
                    {discount}٪ تخفیف
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toLocaleString("fa")} تومان
                </p>
              )}
              <p className="text-xs text-green-400 mt-1">
                ✓ {product.stock} عدد در انبار
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="w-full glow-button py-3.5 rounded-xl font-bold text-white text-base"
              >
                افزودن به سبد خرید
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/checkout");
                }}
                className="w-full btn-outline-glass py-3.5 rounded-xl font-semibold text-base"
              >
                خرید فوری
              </button>
            </div>

            {/* Trust badges */}
            <div className="space-y-2.5 mb-5 pb-5 border-b border-white/10">
              {[
                {
                  icon: <ShieldCheck className="h-4 w-4 text-[#D90416]" />,
                  text: "ضمانت اصالت کالا",
                },
                {
                  icon: <Truck className="h-4 w-4 text-[#D90416]" />,
                  text: "ارسال سریع سراسری",
                },
                {
                  icon: <RotateCcw className="h-4 w-4 text-[#D90416]" />,
                  text: "۷ روز ضمانت بازگشت",
                },
                {
                  icon: <Award className="h-4 w-4 text-[#D90416]" />,
                  text: product.warranty,
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-gray-300"
                >
                  {b.icon}
                  <span>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Quick specs */}
            <div className="space-y-2 text-sm">
              {[
                { label: "برند", value: product.brand },
                { label: "دسته", value: product.category },
                { label: "شناسه", value: product.sku },
                { label: "سازگاری", value: "CBR600RR 07-19" },
              ].map((s, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-500">{s.label}:</span>
                  <span className="text-gray-200 font-medium">{s.value}</span>
                </div>
              ))}
            </div>

            {/* actions */}
            <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-white/10">

              {/* ── Installation Viewer Button — most prominent ── */}
              <button
                onClick={() => setModalOpen(true)}
                className="installation-btn w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-black text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(217,4,22,0.25), rgba(140,0,10,0.35))',
                  border: '1px solid rgba(217,4,22,0.55)',
                  boxShadow: '0 0 18px rgba(217,4,22,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
                  animation: 'installPulse 3s ease-in-out infinite',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform  = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow  = '0 0 32px rgba(217,4,22,0.5), inset 0 1px 0 rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,80,80,0.75)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform  = '';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow  = '0 0 18px rgba(217,4,22,0.25), inset 0 1px 0 rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(217,4,22,0.55)';
                }}
              >
                <Wrench className="h-4 w-4" />
                مشاهده نصب
              </button>

              {/* ── Icon row ── */}
              <div className="flex items-center justify-center gap-3">
                <button
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="افزودن به علاقه‌مندی"
                >
                  <Heart className="h-5 w-5 text-gray-400" />
                </button>
                <button
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  title="اشتراک‌گذاری"
                >
                  <Share2 className="h-5 w-5 text-gray-400" />
                </button>
                {/* 3D Viewer Button */}
                <Link
                  to={`/product/${product.id}/view3d`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(217,4,22,0.12)",
                    border: "1px solid rgba(217,4,22,0.4)",
                    color: "#ff4d5e",
                  }}
                  title="مشاهده سه‌بعدی محصول"
                >
                  <Box className="h-4 w-4" />
                  <span>سه‌بعدی</span>
                </Link>
              </div>
            </div>

            {/* ── Motorcycle Selector Modal ── */}
            <MotorcycleSelectorModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Countdown Timer ── */
function CountdownTimer() {
  const [time, setTime] = React.useState({ h: 2, m: 45, s: 32 });

  React.useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) =>
    String(n)
      .padStart(2, "۰")
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

  return (
    <div
      className="rounded-xl p-5 mb-8 flex items-center gap-5"
      style={{
        background: "rgba(217,4,22,0.08)",
        border: "1px solid rgba(217,4,22,0.3)",
      }}
    >
      <div className="text-2xl shrink-0">⏰</div>
      <div className="flex-1">
        <p className="text-sm font-bold text-[#D90416] mb-1">
          تخفیف ویژه — فقط تا پایان امروز
        </p>
        <div className="flex items-center gap-2">
          {[
            { v: time.h, l: "ساعت" },
            { v: time.m, l: "دقیقه" },
            { v: time.s, l: "ثانیه" },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span className="text-[#D90416] font-black text-lg">:</span>
              )}
              <div className="text-center">
                <div
                  className="text-xl font-black text-white w-10 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "#D90416" }}
                >
                  {pad(item.v)}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">{item.l}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage;
