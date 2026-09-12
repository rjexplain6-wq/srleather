import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] border border-[#ECE8E1] rounded-2xl p-3 flex flex-col gap-3 animate-pulse">
      <div className="w-full aspect-square bg-[#EFECE6] rounded-xl" />
      <div className="h-4 bg-[#EFECE6] rounded w-3/4" />
      <div className="h-3 bg-[#EFECE6] rounded w-1/2" />
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2EEE9]">
        <div className="h-5 bg-[#EFECE6] rounded w-1/3" />
        <div className="w-8 h-8 rounded-full bg-[#EFECE6]" />
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full h-80 sm:h-96 md:h-[450px] bg-[#223326]/20 rounded-2xl animate-pulse" />
  );
};

export const CategoryRowSkeleton: React.FC = () => {
  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2 shrink-0 animate-pulse">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EFECE6]" />
          <div className="w-12 h-3 bg-[#EFECE6] rounded" />
        </div>
      ))}
    </div>
  );
};
