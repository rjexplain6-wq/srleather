import React from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Shield,
  Sparkles,
  HeartHandshake,
  Compass,
  MessageCircle,
  Video,
  Share2
} from 'lucide-react';

interface AboutUsPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ setCurrentPage }) => {
  const { siteContent } = useStore();
  const footer = siteContent.footer;
  const brandName = footer?.brandName || 'SR Leather';
  const tagline = footer?.tagline || 'Carry Quality, Carry Confidence.';
  const aboutText =
    footer?.aboutText ||
    'SR Leather is a premier handcrafted leather atelier based in Dhaka, Bangladesh. Founded with a commitment to enduring artisanship, every piece is sculpted from ethically sourced full-grain cowhide and built to develop a timeless personal patina.';

  const facebookUrl = footer?.facebookUrl?.trim() || '';
  const youtubeUrl = footer?.youtubeUrl?.trim() || '';
  const instagramUrl = footer?.instagramUrl?.trim() || '';
  const whatsappNumber = footer?.whatsappNumber?.trim() || '';
  const phone = footer?.phone?.trim() || '';
  const email = footer?.email?.trim() || '';
  const address = footer?.address?.trim() || '';

  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');
  const hasSocials = !!(facebookUrl || youtubeUrl || instagramUrl || cleanWhatsApp);
  const hasConcierge = !!(phone || email);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage('home')}
          aria-label="Back to home"
          className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C2A20]">
            About {brandName}
          </h1>
          <p className="text-xs text-[#6B7280]">
            {tagline}
          </p>
        </div>
      </div>

      {/* Hero Banner Story */}
      <div className="relative rounded-3xl overflow-hidden bg-[#19231D] text-[#F8F6F0] p-8 sm:p-12 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1473188557897-f95e082c7688?auto=format&fit=crop&w=1200&q=80"
            alt="Leather Atelier"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#19231D] via-[#19231D]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C49A6C]/20 border border-[#C49A6C]/40 text-[#E5C9A6]">
            <Sparkles className="w-3.5 h-3.5" />
            Heritage & Passion
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
            Crafted for Life. Designed for Generations.
          </h2>
          <p className="text-sm sm:text-base text-[#D1D9D3] leading-relaxed">
            {aboutText}
          </p>
        </div>
      </div>

      {/* Socials Section (Only if configured) */}
      {hasSocials && (
        <div className="bg-white border border-[#ECE8E1] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#8B5E34] font-semibold">
              Connect Directly
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C2A20] mt-1">
              Official Social Media & Channels
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Follow our latest leather creations, behind-the-scenes artisan craftsmanship, and special releases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Facebook */}
            {facebookUrl && (
              <a
                href={facebookUrl.startsWith('http') ? facebookUrl : `https://${facebookUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-[#ECE8E1] bg-[#FAF8F5] hover:bg-white hover:border-[#1877F2] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center font-bold text-lg shadow-xs">
                    f
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors">
                      Facebook Page
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate max-w-[180px]">
                      {facebookUrl.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1877F2] transition-colors" />
              </a>
            )}

            {/* YouTube */}
            {youtubeUrl && (
              <a
                href={youtubeUrl.startsWith('http') ? youtubeUrl : `https://${youtubeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-[#ECE8E1] bg-[#FAF8F5] hover:bg-white hover:border-[#FF0000] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF0000] text-white flex items-center justify-center shadow-xs">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF0000] transition-colors">
                      YouTube Channel
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate max-w-[180px]">
                      {youtubeUrl.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#FF0000] transition-colors" />
              </a>
            )}

            {/* Instagram */}
            {instagramUrl && (
              <a
                href={instagramUrl.startsWith('http') ? instagramUrl : `https://${instagramUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-[#ECE8E1] bg-[#FAF8F5] hover:bg-white hover:border-[#E1306C] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    IG
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#E1306C] transition-colors">
                      Instagram
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate max-w-[180px]">
                      {instagramUrl.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#E1306C] transition-colors" />
              </a>
            )}

            {/* WhatsApp Direct */}
            {cleanWhatsApp && (
              <a
                href={`https://wa.me/${cleanWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl border border-[#ECE8E1] bg-[#FAF8F5] hover:bg-white hover:border-[#25D366] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">
                      WhatsApp Support
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {whatsappNumber}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] transition-colors" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Showroom & Contact Details (Only rendered if address or concierge exists) */}
      {(address || hasConcierge) && (
        <div className={`grid gap-4 ${address && hasConcierge ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Showroom card: ONLY shown if address is configured! */}
          {address && (
            <div className="bg-white border border-[#ECE8E1] rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-[#8B5E34] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1C2A20]">
                Showroom & Atelier
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {address}
              </p>
              <span className="inline-block text-[11px] text-gray-400">
                Open Saturday – Thursday: 10:00 AM – 8:00 PM
              </span>
            </div>
          )}

          {/* Concierge card: ONLY shown if phone or email exists */}
          {hasConcierge && (
            <div className="bg-white border border-[#ECE8E1] rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#ECE8E1] text-[#8B5E34] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-lg font-bold text-[#1C2A20]">
                Direct Concierge
              </h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                {phone && (
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <a href={`tel:${phone}`} className="hover:underline text-[#8B5E34]">{phone}</a>
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <a href={`mailto:${email}`} className="hover:underline text-[#8B5E34]">{email}</a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE8E1] text-center space-y-1.5">
          <Shield className="w-5 h-5 text-[#8B5E34] mx-auto" />
          <h5 className="font-bold text-xs text-[#1C2A20]">Full-Grain Hide</h5>
          <p className="text-[11px] text-gray-500">Uncompromised strength</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE8E1] text-center space-y-1.5">
          <Compass className="w-5 h-5 text-[#8B5E34] mx-auto" />
          <h5 className="font-bold text-xs text-[#1C2A20]">Artisan Stitching</h5>
          <p className="text-[11px] text-gray-500">Hand-burnished edges</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE8E1] text-center space-y-1.5">
          <HeartHandshake className="w-5 h-5 text-[#8B5E34] mx-auto" />
          <h5 className="font-bold text-xs text-[#1C2A20]">Ethically Made</h5>
          <p className="text-[11px] text-gray-500">Local Bangladeshi craft</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE8E1] text-center space-y-1.5">
          <Sparkles className="w-5 h-5 text-[#8B5E34] mx-auto" />
          <h5 className="font-bold text-xs text-[#1C2A20]">Living Patina</h5>
          <p className="text-[11px] text-gray-500">Ages gracefully</p>
        </div>
      </div>
    </div>
  );
};
