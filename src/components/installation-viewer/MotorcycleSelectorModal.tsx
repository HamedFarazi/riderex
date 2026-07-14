import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft } from 'lucide-react';

interface MotorcycleOption {
  id:        string;
  name:      string;
  nameEn:    string;
  emoji:     string;
  available: boolean;
  route?:    string;
}

const MOTORCYCLE_OPTIONS: MotorcycleOption[] = [
  { id: 'scooter', name: 'اسکوتر',   nameEn: 'Scooter',  emoji: '🛵', available: true,  route: '/installation-viewer/scooter' },
  { id: 'honda',   name: 'هوندا ۱۲۵', nameEn: 'Honda 125',emoji: '🏍', available: false },
  { id: 'click',   name: 'کلیک',      nameEn: 'Click',    emoji: '🛵', available: false },
  { id: 'pcx',     name: 'PCX',        nameEn: 'PCX',      emoji: '🏍', available: false },
  { id: 'nmax',    name: 'NMAX',       nameEn: 'NMAX',     emoji: '🏍', available: false },
  { id: 'adv',     name: 'ADV',        nameEn: 'ADV',      emoji: '🏍', available: false },
];

interface Props {
  isOpen:   boolean;
  onClose:  () => void;
}

export function MotorcycleSelectorModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelect = (option: MotorcycleOption) => {
    if (!option.available || !option.route) return;
    onClose();
    navigate(option.route);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10,10,10,0.97)',
          border: '1px solid rgba(217,4,22,0.3)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(217,4,22,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div>
            <h2 className="text-lg font-black text-white">انتخاب مدل موتور</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              مدل موتوری که قصد نصب قطعه روی آن را دارید انتخاب کنید
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-5">
          {MOTORCYCLE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              disabled={!option.available}
              className="relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200"
              style={{
                background: option.available
                  ? 'rgba(217,4,22,0.08)'
                  : 'rgba(255,255,255,0.02)',
                border: option.available
                  ? '1px solid rgba(217,4,22,0.35)'
                  : '1px solid rgba(255,255,255,0.06)',
                cursor: option.available ? 'pointer' : 'not-allowed',
                opacity: option.available ? 1 : 0.45,
              }}
              onMouseEnter={(e) => {
                if (!option.available) return;
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(217,4,22,0.18)';
                (e.currentTarget as HTMLButtonElement).style.transform   = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow   = '0 8px 24px rgba(217,4,22,0.2)';
              }}
              onMouseLeave={(e) => {
                if (!option.available) return;
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(217,4,22,0.08)';
                (e.currentTarget as HTMLButtonElement).style.transform   = '';
                (e.currentTarget as HTMLButtonElement).style.boxShadow   = '';
              }}
            >
              <span className="text-3xl">{option.emoji}</span>
              <span className="text-sm font-bold text-white">{option.name}</span>
              <span className="text-[10px] text-gray-600">{option.nameEn}</span>

              {/* Available badge */}
              {option.available && (
                <span
                  className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: '#D90416', color: '#fff' }}
                >
                  موجود
                </span>
              )}

              {/* Arrow for available */}
              {option.available && (
                <ChevronLeft className="h-4 w-4 absolute bottom-2 left-2 text-[#D90416]" />
              )}

              {/* Coming soon */}
              {!option.available && (
                <span className="text-[9px] text-gray-600 mt-0.5">به‌زودی</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 flex justify-end"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
