import React from "react";
import {
  Users,
  Award,
  BookOpen,
  Globe,
  Target,
  Heart,
  Zap,
} from "lucide-react";

function AboutPage() {
  const team = [
    {
      name: "دکتر محمد احمدی",
      role: "مدیرعامل و بنیان‌گذار",
      image: "/images/pexels-photo-1043471.jpeg",
      description: "بیش از ۱۵ سال تجربه در حوزه قطعات موتور و فروش لوازم یدکی",
    },
    {
      name: "سارا میرزایی",
      role: "مدیر فروش",
      image: "/images/pexels-photo-1239291.jpeg",
      description: "متخصص تامین قطعات اورجینال و مدیریت تامین‌کننده‌ها",
    },
    {
      name: "علی رضایی",
      role: "مدیر فنی",
      image: "/images/pexels-photo-1222271.jpeg",
      description: "تکنسین ارشد با تجربه در تعمیر و نگهداری موتور",
    },
    {
      name: "مریم حسینی",
      role: "مدیر محتوا",
      image: "/images/pexels-photo-1181519.jpeg",
      description: "کارشناس تولید محتوا برای راهنماهای فنی و محصولات",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "کیفیت بالا",
      description: "تعهد به ارائه قطعات با کیفیت و اورجینال",
    },
    {
      icon: Heart,
      title: "مشتری‌مداری",
      description: "پشتیبانی مشتریان و ارائه خدمات پس از فروش",
    },
    {
      icon: Zap,
      title: "نوآوری",
      description: "استفاده از روش‌های نوین تامین و کنترل کیفیت",
    },
    {
      icon: Users,
      title: "شبکه تامین",
      description: "همکاری با تامین‌کنندگان معتبر و شناخته‌شده",
    },
  ];

  const stats = [
    { icon: Users, value: "۱۰,۰۰۰+", label: "مشتری فعال" },
    { icon: BookOpen, value: "۵۰۰+", label: "محصول" },
    { icon: Award, value: "۱۰۰+", label: "فروشنده معتبر" },
    { icon: Globe, value: "۵۰+", label: "شهر" },
  ];

  return (
    <div className="rtl">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            داستان <span className="text-gradient">موتورکالا</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            ما با هدف دسترسی آسان به قطعات اورجینال و خدمات فنی قابل اعتماد،
            موتورکالا را تاسیس کردیم.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 text-center card-hover"
            >
              <stat.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">ماموریت ما</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              هدف ما فراهم کردن قطعات اورجینال، خدمات پس از فروش و مشاوره فنی به
              مشتریان است.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              تیم ما متشکل از تامین‌کنندگان و تکنسین‌های باتجربه است که در
              انتخاب و تعمیر قطعات همراه شما خواهند بود.
            </p>
          </div>
          <div className="relative">
            <img
              src="/images/banner2.jpg"
              alt="تیم موتورکالا"
              className="w-full h-80 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ارزش‌های ما</h2>
          <p className="text-xl text-gray-400">
            اصولی که کار ما را هدایت می‌کند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="glass rounded-xl p-6 text-center card-hover"
            >
              <value.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">تیم ما</h2>
          <p className="text-xl text-gray-400">
            با افرادی که موتورکالا را می‌سازند آشنا شوید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="glass rounded-xl overflow-hidden card-hover"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-purple-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">آماده خرید قطعات هستید؟</h2>
          <p className="text-xl text-gray-400 mb-8">
            امروز به جمع هزاران مشتری راضی ما بپیوندید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="glow-button px-8 py-4 rounded-lg font-semibold"
            >
              مشاهده محصولات
            </a>
            <a
              href="/contact"
              className="glass px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              تماس با ما
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
