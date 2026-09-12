import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-[#1C2A20] text-[#F8F6F0] border border-[#2F4235]',
    error: 'bg-[#5C1D1D] text-[#FFF5F5] border border-[#7A2B2B]',
    info: 'bg-[#2B2824] text-[#F8F6F0] border border-[#443E38]'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#86EFAC] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#FCA5A5] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#93C5FD] shrink-0" />
  };

  return (
    <div
      id="toast-notification"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 max-w-[90vw] sm:max-w-md ${bgColors[toast.type]}`}
    >
      {icons[toast.type]}
      <span className="text-sm font-medium tracking-wide">{toast.message}</span>
    </div>
  );
};
