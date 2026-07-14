import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, RotateCcw, ZoomIn, ZoomOut,
  Maximize2, Info, Box,
} from 'lucide-react';
import '@google/model-viewer';
import products from '../data/products';

export default function Product3DViewer() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading]   = useState(true);
  const [hasError, setHasError]     = useState(false);
  const [showInfo, setShowInfo]     = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress]     = useState(0);
  const viewerRef = useRef<HTMLElement>(null);

  const product = products.find(p => p.id === id) ?? products[0];
  const modelSrc = (product as typeof product & { model3d?: string }).model3d;

  /* ── handle model-viewer events via ref ── */
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    const onLoad = () => { setIsLoading(false); setHasError(false); };
    const onError = () => { setIsLoading(false); setHasError(true); };
    const onProgress = (e: Event) => {
      const ev = e as CustomEvent<{ totalProgress: number }>;
      setProgress(Math.round((ev.detail?.totalProgress ?? 0) * 100));
    };

    el.addEventListener('load', onLoad);
    el.addEventListener('error', onError);
    el.addEventListener('progress', onProgress);
    return () => {
      el.removeEventListener('load', onLoad);
      el.removeEventListener('error', onError);
      el.removeEventListener('progress', onProgress);
    };
  }, [modelSrc]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetCamera = () => {
    const mv = viewerRef.current as HTMLElement & {
      cameraOrbit: string; cameraTarget: string; fieldOfView: string;
    };
    if (!mv) return;
    mv.cameraOrbit  = '0deg 75deg 105%';
    mv.cameraTarget = '0m 0m 0m';
    mv.fieldOfView  = 'auto';
  };

  return (
    <div
      className="fixed inset-0 flex flex-col rtl"
      style={{ background: '#050505', zIndex: 100 }}
    >
      {/* ── HEADER ── */}
      <header
        className="shrink-0 flex items-center justify-between px-4 sm:px-6 h-14 z-20"
        style={{
          background: 'rgba(5,5,5,0.9)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(217,4,22,0.2)',
        }}
      >
        {/* back */}
        <Link
          to={`/product/${product.id}`}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:block">بازگشت به محصول</span>
        </Link>

        {/* title */}
        <div className="flex items-center gap-2">
          <Box className="h-5 w-5" style={{ color: '#D90416' }} />
          <span className="text-sm font-bold text-white truncate max-w-[180px] sm:max-w-xs">
            مشاهده سه‌بعدی — {product.title}
          </span>
        </div>

        {/* controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowInfo(v => !v)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="راهنما"
          >
            <Info className="h-5 w-5" />
          </button>
          <button
            onClick={resetCamera}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="ریست دوربین"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="تمام صفحه"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ── VIEWER AREA ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* no model */}
        {!modelSrc && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-4">
            <Box className="h-16 w-16 opacity-20" style={{ color: '#D90416' }} />
            <p className="text-xl font-bold text-gray-400">
              مدل سه‌بعدی برای این محصول موجود نیست
            </p>
            <Link
              to={`/product/${product.id}`}
              className="glow-button px-6 py-3 rounded-xl font-semibold text-white mt-2"
            >
              بازگشت به محصول
            </Link>
          </div>
        )}

        {/* model-viewer */}
        {modelSrc && (
          <>
            {/* loading overlay */}
            {isLoading && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10"
                style={{ background: 'rgba(5,5,5,0.92)' }}
              >
                {/* spinner */}
                <div
                  className="w-14 h-14 rounded-full border-4 animate-spin"
                  style={{
                    borderColor: 'rgba(217,4,22,0.2)',
                    borderTopColor: '#D90416',
                  }}
                />
                <div className="text-center">
                  <p className="text-white font-semibold mb-1">در حال بارگذاری مدل</p>
                  <p className="text-gray-500 text-sm">{progress}٪</p>
                </div>
                {/* progress bar */}
                <div
                  className="w-48 h-1 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, background: '#D90416' }}
                  />
                </div>
              </div>
            )}

            {/* error overlay */}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <Box className="h-14 w-14 opacity-20" style={{ color: '#D90416' }} />
                <p className="text-gray-400 font-semibold">خطا در بارگذاری مدل</p>
                <button
                  onClick={() => { setHasError(false); setIsLoading(true); }}
                  className="glow-button px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                >
                  تلاش مجدد
                </button>
              </div>
            )}

            {/* model-viewer element */}
            <model-viewer
              ref={viewerRef as React.RefObject<HTMLElement>}
              src={modelSrc}
              alt={product.title}
              camera-controls
              auto-rotate
              touch-action="pan-y"
              shadow-intensity="1"
              exposure="1"
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                '--progress-bar-color': '#D90416',
                '--progress-bar-height': '3px',
              } as React.CSSProperties}
            />
          </>
        )}

        {/* ── Info panel ── */}
        {showInfo && (
          <div
            className="absolute bottom-20 right-4 w-60 rounded-xl p-4 z-20"
            style={{
              background: 'rgba(8,8,8,0.92)',
              border: '1px solid rgba(217,4,22,0.25)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" style={{ color: '#D90416' }} />
              راهنمای کنترل
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2"><span className="text-[#D90416]">🖱</span> کلیک + کشیدن — چرخش</li>
              <li className="flex items-center gap-2"><span className="text-[#D90416]">🔍</span> اسکرول — زوم</li>
              <li className="flex items-center gap-2"><span className="text-[#D90416]">👆</span> دو انگشت — پن</li>
              <li className="flex items-center gap-2"><span className="text-[#D90416]">↺</span> دکمه ریست — بازگشت</li>
            </ul>
          </div>
        )}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="shrink-0 flex items-center justify-between px-4 sm:px-6 h-12"
        style={{
          background: 'rgba(5,5,5,0.9)',
          borderTop: '1px solid rgba(217,4,22,0.12)',
        }}
      >
        <p className="text-xs text-gray-600">
          {product.title}
        </p>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: isLoading ? '#888' : hasError ? '#D90416' : '#22c55e' }}
          />
          <span className="text-xs text-gray-500">
            {isLoading ? 'در حال بارگذاری...' : hasError ? 'خطا' : 'آماده'}
          </span>
        </div>
      </div>
    </div>
  );
}
