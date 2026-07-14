import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Users,
  Package,
  Award,
  Calendar,
  MapPin,
  Globe,
  Mail,
  ArrowLeft,
  Send,
  ShieldCheck,
  Truck,
  Phone,
} from "lucide-react";

function InstructorProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState([
    {
      id: "1",
      customerName: "علی محمدی",
      rating: 5,
      date: "۱۴۰۳/۰۸/۱۰",
      comment:
        "قطعات کاملاً اورجینال بودن و بسته‌بندی عالی. ارسال هم سریع بود.",
      productName: "صندلی هوندا CBR",
    },
    {
      id: "2",
      customerName: "مریم صادقی",
      rating: 5,
      date: "۱۴۰۳/۰۸/۰۵",
      comment:
        "چند بار از این فروشنده خرید کردم. همیشه راضی بودم. پشتیبانی هم عالیه.",
      productName: "فیلتر روغن یاماها",
    },
    {
      id: "3",
      customerName: "حسین کریمی",
      rating: 4,
      date: "۱۴۰۳/۰۷/۲۸",
      comment: "محصول خوب بود ولی ارسال یه روز تاخیر داشت. در کل راضیم.",
      productName: "شمع NGK موتور",
    },
  ]);

  // اطلاعات فروشنده (نمونه)
  const sellers: Record<
    string,
    {
      id: string;
      name: string;
      title: string;
      bio: string;
      image: string;
      rating: number;
      totalCustomers: number;
      totalProducts: number;
      experience: string;
      location: string;
      joinDate: string;
      website: string;
      email: string;
      phone: string;
      specialties: string[];
      achievements: string[];
    }
  > = {
    "1": {
      id: "1",
      name: "نمایندگی هوندا ایران",
      title: "فروشنده رسمی و تامین‌کننده قطعات هوندا",
      bio: "نمایندگی رسمی Honda در ایران با بیش از ۱۵ سال سابقه در تامین قطعات اورجینال. تمامی محصولات دارای ضمانت کارخانه و فاکتور رسمی هستند. تخصص ما در قطعات موتوری، صندلی، سیستم برق و بدنه است.",
      image: "./images/banner2.jpg",
      rating: 4.9,
      totalCustomers: 8500,
      totalProducts: 320,
      experience: "۱۵ سال",
      location: "تهران، ایران",
      joinDate: "۱۳۸۸",
      website: "https://honda-iran.com",
      email: "info@honda-iran.com",
      phone: "۰۲۱-۱۲۳۴-۵۶۷۸",
      specialties: [
        "قطعات موتوری",
        "صندلی",
        "سیستم برق",
        "بدنه",
        "فیلتر",
        "روغن",
      ],
      achievements: [
        "نمایندگی رسمی Honda برای بیش از ۱۵ سال",
        "دریافت جایزه فروشنده سال ۱۴۰۲ از رایدرکس",
        "بیش از ۸,۵۰۰ مشتری راضی در سراسر ایران",
        "تنها تامین‌کننده دارای گارانتی رسمی کارخانه",
      ],
    },
    "2": {
      id: "2",
      name: "فروشگاه MT Helmets",
      title: "نمایندگی رسمی کلاه‌های MT",
      bio: "نماینده انحصاری MT Helmets در ایران، عرضه‌کننده کلاه‌های ایمنی با استاندارد ECE 22.06 اروپا. تمامی کلاه‌ها دارای گواهینامه معتبر و ضمانت اصالت هستند.",
      image: "./images/banner2.jpg",
      rating: 4.8,
      totalCustomers: 4200,
      totalProducts: 95,
      experience: "۸ سال",
      location: "تهران، ایران",
      joinDate: "۱۳۹۵",
      website: "https://mt-iran.com",
      email: "info@mt-iran.com",
      phone: "۰۲۱-۸۸۸۸-۱۱۱۱",
      specialties: ["کلاه ایمنی", "ویزور", "پد داخلی", "اکسسوری کلاه"],
      achievements: [
        "نماینده انحصاری MT Helmets در ایران",
        "استاندارد ECE 22.06 اروپا",
        "بیش از ۴,۲۰۰ مشتری راضی",
        "گارانتی ۲ ساله روی تمامی محصولات",
      ],
    },
  };

  const seller = sellers[id || "1"] || sellers["1"];

  const featuredProducts = [
    {
      id: "1",
      title: "صندلی اصل Honda CBR",
      customers: 1250,
      rating: 4.9,
      price: 480000,
      image: "./images/banner2.jpg",
      badge: "پرفروش",
    },
    {
      id: "5",
      title: "فیلتر هوا Honda CB125",
      customers: 890,
      rating: 4.8,
      price: 195000,
      image: "./images/banner2.jpg",
      badge: "اورجینال",
    },
    {
      id: "8",
      title: "شمع موتور NGK اصل",
      customers: 650,
      rating: 4.7,
      price: 145000,
      image: "./images/banner2.jpg",
      badge: "تخفیف",
    },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      setReviews([
        {
          id: Date.now().toString(),
          customerName: "مشتری جدید",
          rating: newReview.rating,
          date: new Date().toLocaleDateString("fa-IR"),
          comment: newReview.comment,
          productName: "محصول",
        },
        ...reviews,
      ]);
      setNewReview({ rating: 5, comment: "" });
    }
  };

  const tabs = [
    { id: "about", name: "درباره فروشنده" },
    { id: "specialties", name: "تخصص‌ها" },
    { id: "certificates", name: "گواهینامه‌ها" },
    { id: "products", name: "محصولات" },
    { id: "contact", name: "تماس و پشتیبانی" },
    { id: "reviews", name: "نظر مشتریان" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-[#D90416] transition-colors">
          خانه
        </Link>
        <span>/</span>
        <Link
          to="/instructors"
          className="hover:text-[#D90416] transition-colors"
        >
          فروشندگان
        </Link>
        <span>/</span>
        <span className="text-white">{seller.name}</span>
      </nav>

      {/* ── Seller Header ── */}
      <div className="glass rounded-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <img
            src={seller.image}
            alt={seller.name}
            className="w-32 h-32 rounded-xl object-cover mx-auto lg:mx-0 border-2 border-[rgba(217,4,22,0.4)]"
          />

          <div className="flex-1 text-center lg:text-right">
            {/* verified badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(217,4,22,0.12)] border border-[rgba(217,4,22,0.3)] px-3 py-1 rounded-full text-xs text-[#D90416] font-semibold mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              فروشنده تأیید‌شده رایدرکس
            </div>

            <h1 className="text-3xl font-bold mb-1">{seller.name}</h1>
            <p className="text-[#D90416] text-lg mb-5">{seller.title}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  value: seller.rating,
                  label: "امتیاز",
                  color: "text-yellow-400",
                },
                {
                  value: seller.totalCustomers.toLocaleString("fa"),
                  label: "مشتری راضی",
                  color: "text-green-400",
                },
                {
                  value: seller.totalProducts.toLocaleString("fa"),
                  label: "محصول موجود",
                  color: "text-blue-400",
                },
                {
                  value: seller.experience,
                  label: "سابقه فعالیت",
                  color: "text-[#D90416]",
                },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-bold ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{seller.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>عضو از {seller.joinDate}</span>
              </div>
              <a
                href={seller.website}
                className="flex items-center gap-1.5 hover:text-[#D90416] transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>وب‌سایت رسمی</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="glass rounded-xl overflow-hidden mb-8">
        <div className="border-b border-white/10">
          <nav className="flex flex-wrap">
            {tabs.map((tab) => (
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

        <div className="p-6">
          {/* ── ABOUT ── */}
          {activeTab === "about" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">معرفی فروشنده</h3>
                <p className="text-gray-300 leading-relaxed">{seller.bio}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">حوزه‌های تخصصی</h3>
                <div className="flex flex-wrap gap-3">
                  {seller.specialties.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{
                        background: "rgba(217,4,22,0.12)",
                        color: "#ff4d5e",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  دستاوردها و افتخارات
                </h3>
                <ul className="space-y-3">
                  {seller.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
                      <span className="text-gray-300">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ── SPECIALTIES ── */}
          {activeTab === "specialties" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">تخصص‌های فروشنده</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {seller.specialties.map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5 text-center"
                    style={{
                      background: "rgba(217,4,22,0.08)",
                      border: "1px solid rgba(217,4,22,0.2)",
                    }}
                  >
                    <div className="text-3xl mb-3">🔧</div>
                    <div className="font-semibold text-white">{spec}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      اورجینال و تضمینی
                    </div>
                  </div>
                ))}
              </div>

              {/* response time */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.25)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shrink-0" />
                  <div>
                    <div className="font-semibold text-green-400">
                      پاسخگویی سریع
                    </div>
                    <div className="text-sm text-gray-400">
                      پاسخ استعلام‌ها در کمتر از ۲ ساعت
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CERTIFICATES ── */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                گواهینامه‌ها و مجوزها
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    color: "bg-yellow-500",
                    icon: "🏆",
                    title: "فروشنده برتر ۱۴۰۲",
                    desc: "برترین فروشنده سال از نظر رایدرکس",
                  },
                  {
                    color: "bg-blue-600",
                    icon: "📜",
                    title: "مجوز نمایندگی رسمی",
                    desc: "مجوز رسمی از کارخانه سازنده",
                  },
                  {
                    color: "bg-green-600",
                    icon: "✅",
                    title: "تأییدیه اصالت کالا",
                    desc: "تمامی محصولات دارای برچسب اصالت",
                  },
                  {
                    color: "bg-[#D90416]",
                    icon: "⭐",
                    title: `${seller.experience} سابقه`,
                    desc: "سابقه فعالیت معتبر در بازار",
                  },
                ].map((cert, i) => (
                  <div
                    key={i}
                    className={`${cert.color} p-6 rounded-xl text-white`}
                  >
                    <div className="text-3xl mb-3">{cert.icon}</div>
                    <div className="font-bold text-lg mb-1">{cert.title}</div>
                    <div className="text-sm opacity-90">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === "products" && (
            <div>
              <h3 className="text-xl font-semibold mb-6">محصولات برگزیده</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="glass rounded-xl overflow-hidden card-hover"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <span
                        className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background: "rgba(217,4,22,0.85)",
                          color: "#fff",
                        }}
                      >
                        {product.badge}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="font-semibold mb-3 line-clamp-2">
                        {product.title}
                      </h4>

                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users className="h-4 w-4" />
                          <span>
                            {product.customers.toLocaleString("fa")} خریدار
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#D90416]">
                          {product.price.toLocaleString("fa")} تومان
                        </span>
                        <Link
                          to={`/product/${product.id}`}
                          className="glow-button px-4 py-2 rounded-lg text-sm font-medium text-white"
                        >
                          خرید
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  to="/courses"
                  className="btn-outline-glass inline-flex items-center gap-2 px-6 py-3 font-semibold"
                >
                  <Package className="h-5 w-5" />
                  مشاهده همه محصولات این فروشنده
                </Link>
              </div>
            </div>
          )}

          {/* ── CONTACT ── */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">
                اطلاعات تماس و پشتیبانی
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Mail className="h-6 w-6" />,
                    label: "ایمیل",
                    value: seller.email,
                    href: `mailto:${seller.email}`,
                  },
                  {
                    icon: <Phone className="h-6 w-6" />,
                    label: "تلفن",
                    value: seller.phone,
                    href: `tel:${seller.phone}`,
                  },
                  {
                    icon: <Globe className="h-6 w-6" />,
                    label: "وب‌سایت",
                    value: "وب‌سایت رسمی",
                    href: seller.website,
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-5 rounded-xl transition-all hover:border-[rgba(217,4,22,0.5)] cursor-pointer"
                    style={{
                      background: "rgba(10,10,10,0.6)",
                      border: "1px solid rgba(217,4,22,0.2)",
                    }}
                  >
                    <div className="text-[#D90416]">{item.icon}</div>
                    <div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                      <div className="text-sm text-white font-medium">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* shipping info */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(217,4,22,0.06)",
                  border: "1px solid rgba(217,4,22,0.2)",
                }}
              >
                <div className="flex items-start gap-4">
                  <Truck className="h-6 w-6 text-[#D90416] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-2">اطلاعات ارسال</h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      <li>• ارسال سریع پستی به سراسر کشور</li>
                      <li>• بسته‌بندی مخصوص قطعات حساس</li>
                      <li>• امکان پیگیری آنلاین مرسوله</li>
                      <li>• ضمانت سلامت کالا تا تحویل</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── REVIEWS ── */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="text-center mb-8">
                <div className="text-5xl font-black text-yellow-400 mb-2">
                  {seller.rating}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-400">
                  بر اساس نظر {seller.totalCustomers.toLocaleString("fa")} مشتری
                </p>
              </div>

              {/* Add Review */}
              <div className="glass-light rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  نظر خود را بنویسید
                </h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      امتیاز شما:
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setNewReview({ ...newReview, rating: star })
                          }
                        >
                          <Star
                            className={`h-6 w-6 ${star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      نظر شما:
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      rows={4}
                      className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D90416] resize-none"
                      placeholder="تجربه خرید خود از این فروشنده را بنویسید..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="glow-button px-6 py-3 rounded-lg font-semibold flex items-center gap-2 text-white"
                  >
                    <Send className="h-4 w-4" />
                    <span>ارسال نظر</span>
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl p-6"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                          style={{ background: "#D90416" }}
                        >
                          {review.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">
                            {review.customerName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {review.productName}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <Link
          to="/instructors"
          className="text-gray-400 hover:text-[#D90416] transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>بازگشت به لیست فروشندگان</span>
        </Link>
      </div>
    </div>
  );
}

export default InstructorProfilePage;
