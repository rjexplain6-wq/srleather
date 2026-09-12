import React from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import { ShieldCheck, Truck, RefreshCw, Award, Phone, Mail, MapPin, Video, MessageCircle } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  onSelectCategory?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onSelectCategory }) => {
  const { siteContent } = useStore();
  const footer = siteContent.footer;
  const facebookUrl = footer?.facebookUrl?.trim() || '';
  const youtubeUrl = footer?.youtubeUrl?.trim() || '';
  const instagramUrl = footer?.instagramUrl?.trim() || '';
  const whatsappNumber = footer?.whatsappNumber?.trim() || '';
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');
  const phone = footer?.phone?.trim() || '';
  const email = footer?.email?.trim() || '';
  const address = footer?.address?.trim() || '';
  const hasContactInfo = !!(phone || email || address);
  const hasSocials = !!(facebookUrl || youtubeUrl || instagramUrl || cleanWhatsApp);

  return (
    <footer className="bg-[#19231D] text-[#ECE7DF] mt-16 pb-24 lg:pb-12 border-t border-[#29362E]">
      {/* Brand value pillars */}
      <div className="border-b border-[#29362E] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#233328] text-[#C49A6C] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#F8F6F0]">100% Genuine Leather</h4>
                <p className="text-xs text-[#9FA8A1] mt-0.5">Ethical full-grain cowhide only</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#233328] text-[#C49A6C] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#F8F6F0]">Fast Nationwide Delivery</h4>
                <p className="text-xs text-[#9FA8A1] mt-0.5">Dhaka & all 64 districts</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#233328] text-[#C49A6C] shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#F8F6F0]">7-Day Easy Exchange</h4>
                <p className="text-xs text-[#9FA8A1] mt-0.5">Hassle-free guarantee</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#233328] text-[#C49A6C] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#F8F6F0]">1-Year Craft Warranty</h4>
                <p className="text-xs text-[#9FA8A1] mt-0.5">Built to endure for years</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full p-0.5 bg-[#233328] border border-[#C49A6C]/50 shadow-xs shrink-0 overflow-hidden">
                <img
                  src="https://i.ibb.co.com/VWPSZgVT/1000244284.jpg"
                  alt="SR Leather Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold text-[#F8F6F0]">
                  SR LEATHER
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-[#C49A6C] mt-0.5">
                  {footer?.tagline || 'Carry Quality, Carry Confidence.'}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#9FA8A1] leading-relaxed max-w-sm">
              {footer?.aboutText ||
                'SR Leather is a premier handcrafted leather atelier based in Dhaka. We create functional luxury accessories engineered to age with an exquisite personal patina.'}
            </p>
            {hasContactInfo && (
              <div className="pt-2 flex flex-col gap-2 text-xs text-[#B2BAB4]">
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C49A6C] shrink-0" />
                    <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C49A6C] shrink-0" />
                    <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C49A6C] shrink-0" />
                    <span>{address}</span>
                  </div>
                )}
              </div>
            )}

            {/* Social Media Channels */}
            {hasSocials && (
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#C49A6C] font-semibold block mb-2">
                  Official Channels
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {facebookUrl && (
                    <a
                      href={facebookUrl.startsWith('http') ? facebookUrl : `https://${facebookUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook Page"
                      className="w-8 h-8 rounded-lg bg-[#233328] text-white hover:bg-[#1877F2] flex items-center justify-center text-xs font-bold transition-colors"
                    >
                      f
                    </a>
                  )}
                  {youtubeUrl && (
                    <a
                      href={youtubeUrl.startsWith('http') ? youtubeUrl : `https://${youtubeUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="YouTube Channel"
                      className="w-8 h-8 rounded-lg bg-[#233328] text-white hover:bg-[#FF0000] flex items-center justify-center transition-colors"
                    >
                      <Video className="w-4 h-4" />
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl.startsWith('http') ? instagramUrl : `https://${instagramUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      className="w-8 h-8 rounded-lg bg-[#233328] text-white hover:bg-[#E1306C] flex items-center justify-center text-[10px] font-bold transition-colors"
                    >
                      IG
                    </a>
                  )}
                  {cleanWhatsApp && (
                    <a
                      href={`https://wa.me/${cleanWhatsApp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp"
                      className="w-8 h-8 rounded-lg bg-[#233328] text-white hover:bg-[#25D366] flex items-center justify-center transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#F8F6F0] tracking-wide uppercase">Shop</h4>
            <ul className="space-y-2 text-sm text-[#9FA8A1]">
              <li>
                <button
                  onClick={() => setCurrentPage('collections')}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  All Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('wallets');
                    setCurrentPage('category');
                  }}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  Wallets & Slim Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('belts');
                    setCurrentPage('category');
                  }}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  Leather Belts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('bags');
                    setCurrentPage('category');
                  }}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  Travel & Daily Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('gift-sets');
                    setCurrentPage('category');
                  }}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  Executive Gift Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#F8F6F0] tracking-wide uppercase">Customer Care</h4>
            <ul className="space-y-2 text-sm text-[#9FA8A1]">
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  About SR Leather
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('account')}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  Track My Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('wishlist')}
                  className="hover:text-[#F8F6F0] transition-colors"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <span className="text-[#9FA8A1]">Shipping Policy (৳60 Dhaka / ৳120 Out of Dhaka)</span>
              </li>
              <li>
                <span className="text-[#9FA8A1]">Returns & Warranty Policy</span>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#F8F6F0] tracking-wide uppercase">Accepted Payments</h4>
            <p className="text-xs text-[#9FA8A1]">
              Secure Cash on Delivery, bKash, Nagad, and Major Credit & Debit Cards across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 bg-[#233328] rounded-md text-[11px] font-medium text-[#C49A6C]">
                Cash on Delivery
              </span>
              <span className="px-2.5 py-1 bg-[#233328] rounded-md text-[11px] font-medium text-[#F8F6F0]">
                bKash
              </span>
              <span className="px-2.5 py-1 bg-[#233328] rounded-md text-[11px] font-medium text-[#F8F6F0]">
                Nagad
              </span>
              <span className="px-2.5 py-1 bg-[#233328] rounded-md text-[11px] font-medium text-[#F8F6F0]">
                Visa / MC
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#29362E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7F8981] gap-4">
          <p>© {new Date().getFullYear()} SR Leather Bangladesh. All rights reserved.</p>
          <p className="text-[11px] text-[#7F8981]">
            Handcrafted with passion in Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
};
