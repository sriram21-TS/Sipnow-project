export default function InStorePromotionBadge({ label }) {
  if (!label) return null;

  return (
    <div className="absolute -top-[5px] -left-[5px] z-30 pointer-events-none select-none">
      {/* Top Edge Fold Shadow (behind top border) */}
      <div
        className="absolute top-0 left-[58px] h-[5px] w-[7px] bg-[#7A4F13]"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}
      />

      {/* Left Edge Fold Shadow (behind left border) */}
      <div
        className="absolute top-[58px] left-0 h-[7px] w-[5px] bg-[#7A4F13]"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
      />

      {/* Ribbon Container (clipped to top-left corner area) */}
      <div className="relative h-[63px] w-[63px] overflow-hidden rounded-tl-lg">
        {/* Main Diagonal Gold Ribbon */}
        <div className="absolute top-[14px] -left-[28px] w-[95px] -rotate-45 bg-gradient-to-r from-[#F5C042] via-[#E2B052] to-[#D49E35] py-[3.5px] text-center font-black text-[9px] tracking-wider text-[#21170A] shadow-md border-y border-[#FBE395]/40 uppercase">
          {label}
        </div>
      </div>
    </div>
  );
}
