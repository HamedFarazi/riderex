import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, Rocket } from "lucide-react";

function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 rtl bg-[#050505]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 space-x-reverse text-2xl font-bold text-gradient mb-8"
          >
            <span>موتوشاپ</span>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>

        <div className="glass rounded-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-[rgba(217,4,22,0.15)] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-[#D90416]" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">
              ثبت‌نام با موفقیت انجام شد!
            </h2>
            <p className="text-gray-400">
              به رایدرکس خوش آمدید. حالا می‌توانید محصولات ما را مشاهده و
              خریداری کنید.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/courses"
              className="w-full glow-button py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Rocket className="h-5 w-5" />
              <span>مشاهده محصولات</span>
            </Link>

            <Link
              to="/dashboard"
              className="w-full glass py-3 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-300 block"
            >
              ورود به داشبورد
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">
              سوالی دارید؟{" "}
              <Link
                to="/contact"
                className="text-[#D90416] hover:text-red-400 font-medium"
              >
                با ما تماس بگیرید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccessPage;
