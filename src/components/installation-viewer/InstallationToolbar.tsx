import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, RotateCcw, Maximize2 } from 'lucide-react';

interface Props {
  productAdded:     boolean;
  onToggleProduct:  () => void;
  onResetCamera:    () => void;
  onToggleFullscreen: () => void;
  productName?:     string;
}

export function InstallationToolbar({
  productAdded,
  onToggleProduct,
  onResetCamera,
  onToggleFullscreen,
  productName = 'محصول',
}: Props) {
  return (
    <>
      {/* ── Top Header ── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 h-14"
        style={{
          background: 'rgba(5,5,5,0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(217,4,22,0.2)',
        }}
      >
        <Link
          to="/courses"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:block">بازگشت</span>
        </Link>

        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#D90416' }}
          />
          <span className="text-sm font-bold text-white">
            نمای نصب روی اسکوتر
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onResetCamera}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="ریست دوربین"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="تمام‌صفحه"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Bottom-left Add/Remove Button ── */}
      <div className="absolute bottom-8 left-4 sm:left-6 z-20">
        <button
          onClick={onToggleProduct}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-1"
          style={{
            background: productAdded
              ? 'rgba(239,68,68,0.15)'
              : 'rgba(217,4,22,0.9)',
            border: productAdded
              ? '1px solid rgba(239,68,68,0.5)'
              : '1px solid rgba(255,100,100,0.4)',
            boxShadow: productAdded
              ? '0 0 20px rgba(239,68,68,0.2)'
              : '0 0 24px rgba(217,4,22,0.5)',
          }}
        >
          {productAdded ? (
            <>
              <Trash2 className="h-4 w-4" />
              حذف محصول
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              افزودن محصول
            </>
          )}
        </button>
      </div>

      {/* ── Bottom-right hint ── */}
      <div className="absolute bottom-8 right-4 sm:right-6 z-20">
        <div
          className="text-xs text-gray-500 text-right leading-relaxed"
          style={{ maxWidth: '160px' }}
        >
          <p>🖱 کلیک + کشیدن — چرخش</p>
          <p>🔍 اسکرول — زوم</p>
          <p>👆 راست‌کلیک — پن</p>
        </div>
      </div>
    </>
  );
}
