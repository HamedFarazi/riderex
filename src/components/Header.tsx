import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, ChevronDown, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import NotificationSystem from "./NotificationSystem";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navigation = [
    { name: "خانه", href: "/" },
    {
      name: "موتورها",
      href: "/courses",
      hasDropdown: true,
      dropdownItems: [
        { name: "موتور رانندگی (کلاسیک)", href: "/courses" },
        { name: "موتور اسپرت", href: "/courses" },
        { name: "موتور آفرود", href: "/courses" },
        { name: "موتور شهری (اسکوتر)", href: "/courses" },
      ],
    },
    {
      name: "قطعات",
      href: "/courses",
      hasDropdown: true,
      dropdownItems: [
        { name: "موتور و سیلندر", href: "/courses" },
        { name: "صندلی", href: "/courses" },
        { name: "سیستم برق", href: "/courses" },
        { name: "سیستم تعلیق", href: "/courses" },
        { name: "بدنه و پوشش", href: "/courses" },
      ],
    },
    {
      name: "لوازم جانبی",
      href: "/courses",
      hasDropdown: true,
      dropdownItems: [
        { name: "کلاه‌های ایمنی", href: "/courses" },
        { name: "لباس و دستکش", href: "/courses" },
        { name: "چراغ و نورپردازی", href: "/courses" },
        { name: "کیف و باربند", href: "/courses" },
      ],
    },

    { name: "وبلاگ", href: "/blog" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const t = setTimeout(() => setOpenDropdown(null), 180);
    setDropdownTimeout(t);
  };

  return (
    <header className="navbar-dark sticky top-0 z-50">
      {/* thin racing red accent line at very top */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #D90416 30%, #ff2030 50%, #D90416 70%, transparent 100%)',
          opacity: 0.8,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── LOGO ── */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 select-none riderex-logo"
            style={{ transition: 'transform 300ms ease' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
          >
            {/* Emblem */}
            <div className="relative shrink-0">
              {/* subtle red ambient glow behind emblem */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #D90416 0%, transparent 70%)', transform: 'scale(1.4)' }}
              />
              <img
                src="/images/logoPng.png"
                alt="Riderex Emblem"
                className="relative z-10 object-contain"
                style={{ width: '36px', height: '36px', filter: 'drop-shadow(0 0 6px rgba(217,4,22,0.55))' }}
              />
            </div>

            {/* Brand text */}
            <div className="leading-none">
              <span
                className="block text-white uppercase"
                style={{
                  fontWeight: 900,
                  fontSize: '15px',
                  letterSpacing: '1px',
                  textShadow: '0 0 20px rgba(217,4,22,0.3)',
                  lineHeight: 1.1,
                }}
              >
                RIDEREX
              </span>
              <span
                className="block uppercase"
                style={{
                  fontSize: '8.5px',
                  letterSpacing: '0.32em',
                  fontWeight: 500,
                  color: '#D90416',
                  marginTop: '3px',
                  lineHeight: 1,
                }}
              >
                RISE BEYOND LIMITS
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name,
                      )
                    }
                    className={`nav-link-moto inline-flex items-center gap-1 ${
                      item.dropdownItems?.some((d) => isActive(d.href))
                        ? "active"
                        : ""
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown === item.name && (
                    <div
                      className="absolute top-full right-0 mt-2 w-48 rounded-lg overflow-hidden"
                      style={{
                        background: "rgba(8,8,8,0.96)",
                        border: "1px solid rgba(217,4,22,0.3)",
                        backdropFilter: "blur(16px)",
                        boxShadow:
                          "0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,4,22,0.1)",
                      }}
                    >
                      {item.dropdownItems!.map((d) => (
                        <Link
                          key={d.name}
                          to={d.href}
                          className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                            isActive(d.href)
                              ? "text-[#D90416] bg-[rgba(217,4,22,0.1)]"
                              : "text-gray-400 hover:text-white hover:bg-[rgba(217,4,22,0.08)] hover:pr-6"
                          }`}
                        >
                          {d.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link-moto ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-2">
            {/* search icon desktop */}
            <button className="hidden md:flex p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D90416] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* user */}
            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === "user" ? null : "user")
                  }
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block">{user.name}</span>
                </button>
                {openDropdown === "user" && (
                  <div
                    className="absolute left-0 mt-2 w-48 rounded-lg overflow-hidden"
                    style={{
                      background: "rgba(8,8,8,0.96)",
                      border: "1px solid rgba(217,4,22,0.2)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
                    }}
                  >
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      داشبورد
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      پروفایل
                    </Link>
                    <Link
                      to="/notifications"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span>اعلان‌ها</span>
                      <NotificationSystem variant="inline" />
                    </Link>
                    <Link
                      to="/wallet"
                      className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      کیف پول
                    </Link>
                    <Link
                      to="/admin"
                      className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      پنل مدیریت
                    </Link>
                    <div className="border-t border-white/5 mt-1">
                      <button
                        onClick={logout}
                        className="block w-full text-right px-4 py-2.5 text-sm text-[#D90416] hover:bg-[rgba(217,4,22,0.08)] transition-colors"
                      >
                        خروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:block px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ورود
                </Link>
                <Link
                  to="/register"
                  className="glow-button px-4 py-1.5 text-sm font-semibold text-white"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            {/* mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {isMenuOpen && (
        <div
          className="lg:hidden"
          style={{
            background: "rgba(5,5,5,0.98)",
            borderTop: "1px solid rgba(217,4,22,0.15)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name,
                        )
                      }
                      className="w-full flex justify-between items-center px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="pr-4 mt-1 space-y-0.5">
                        {item.dropdownItems!.map((d) => (
                          <Link
                            key={d.name}
                            to={d.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-gray-500 hover:text-[#D90416] rounded-lg hover:bg-[rgba(217,4,22,0.06)] transition-colors"
                          >
                            {d.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "text-[#D90416] bg-[rgba(217,4,22,0.08)]"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
