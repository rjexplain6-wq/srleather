import React from 'react';
import { PageView } from '../types';
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Truck, Phone } from 'lucide-react';

interface OrderSuccessPageProps {
  orderId: string;
  setCurrentPage: (page: PageView) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  orderId,
  setCurrentPage
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-16 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#E8F0EA] text-[#22502F] flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B5E34]">
          Order Confirmed
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1C2A20]">
          Thank You For Your Order!
        </h1>
        <p className="text-sm text-[#4A5568] max-w-md mx-auto leading-relaxed">
          Your order has been recorded in our system. Our artisans are carefully preparing your handcrafted leather pieces.
        </p>
      </div>

      {/* Order ID Box */}
      <div className="p-4 rounded-2xl bg-white border border-[#ECE8E1] inline-block shadow-xs">
        <span className="text-xs text-[#6B7280]">Your Order Reference ID:</span>
        <p className="font-mono font-bold text-base sm:text-lg text-[#1C2A20] select-all mt-0.5">
          {orderId || 'SRL-' + Math.floor(100000 + Math.random() * 900000)}
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#ECE8E1] text-left space-y-3.5 max-w-md mx-auto shadow-xs text-xs">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-full bg-[#E8F0EA] text-[#22502F] shrink-0 mt-0.5">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1C2A20]">Quality Inspection & Packaging</h4>
            <p className="text-[#6B7280]">Each item is conditioned with beeswax cream before dispatch.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-full bg-[#E8F0EA] text-[#22502F] shrink-0 mt-0.5">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1C2A20]">Courier Dispatch</h4>
            <p className="text-[#6B7280]">You will receive an SMS update once your parcel is on the way.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-full bg-[#E8F0EA] text-[#22502F] shrink-0 mt-0.5">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1C2A20]">Assistance / Modifications</h4>
            <p className="text-[#6B7280]">Call our team at +880 1712-345678 for quick assistance.</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage('account')}
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#1C2A20] text-[#1C2A20] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold transition-all"
        >
          View Order History
        </button>

        <button
          onClick={() => setCurrentPage('home')}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C2A20] text-white hover:bg-[#2B3E30] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
