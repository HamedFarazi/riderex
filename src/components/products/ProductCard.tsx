import React from "react";
import { Link } from "react-router-dom";
import { Star, Users, Package, ShieldCheck } from "lucide-react";
import type { Product } from "../../data/products";

type Props = { product: Product };

const badgeStyle: Record<string, string> = {
  "پرفروش":  "bg-green-600",
  "جدید":    "bg-blue-600",
  "محبوب":   "bg-amber-600",
  "ترند":    "bg-sky-600",
  "پیشنهاد": "bg-teal-600",
};

export default function ProductCard({ product }: Props) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="rounded-2xl overflow-hidden card-hover flex flex-col"
      style={{
        background: "rgba(10,10,10,0.82)",
        border: "1px solid rgba(217,4,22,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={product.image.replace("./images/", "/images/")}
          alt={product.title}
          className="w-full h-48 object-cover"
        />

        {/* overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* badge */}
        {product.badge && (
          <span
            className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${badgeStyle[product.badge] ?? "bg-[#D90416]"}`}
          >
            {product.badge}
          </span>
        )}

        {/* discount */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
            style={{ background: "#D90416" }}>
            {discount}٪
          </span>
        )}

        {/* bottom meta */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          <span className="text-xs text-white/80 px-2 py-0.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.6)" }}>
            {product.level}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* brand */}
        <p className="text-xs font-semibold mb-1.5 flex items-center gap-1.5"
          style={{ color: "#D90416" }}>
          <ShieldCheck className="h-3.5 w-3.5" />
          {product.instructor}
        </p>

        {/* title */}
        <h3 className="text-base font-bold mb-3 line-clamp-2 text-white leading-snug flex-1">
          {product.title}
        </h3>

        {/* rating + buyers */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-white">{product.rating}</span>
            <span className="text-gray-500 text-xs">
              ({product.students.toLocaleString("fa")})
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Users className="h-3.5 w-3.5" />
            <span>{product.students.toLocaleString("fa")} خریدار</span>
          </div>
        </div>

        {/* price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-lg font-black text-white leading-none">
              {product.price.toLocaleString("fa")}
              <span className="text-sm font-normal text-gray-400 mr-1">تومان</span>
            </p>
            {product.originalPrice > product.price && (
              <p className="text-xs text-gray-600 line-through mt-0.5">
                {product.originalPrice.toLocaleString("fa")} تومان
              </p>
            )}
          </div>
          {product.duration && product.duration !== "—" && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Package className="h-3.5 w-3.5" />
              {product.duration}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          to={`/product/${product.id}`}
          className="w-full glow-button py-2.5 rounded-xl font-bold text-center text-sm text-white"
        >
          مشاهده و خرید
        </Link>
      </div>
    </div>
  );
}
