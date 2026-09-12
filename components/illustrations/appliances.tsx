import { cn } from '@/lib/utils';

interface IllustrationProps {
  className?: string;
}

/* ---------- Refrigerator ---------- */
export function RefrigeratorIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 160" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fridge-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="fridge-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(200 80% 90%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(200 60% 80%)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="20" y="10" width="80" height="140" rx="8" fill="url(#fridge-body)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
      <rect x="26" y="16" width="68" height="38" rx="4" fill="url(#fridge-glass)" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.8" />
      <rect x="26" y="66" width="68" height="78" rx="4" fill="url(#fridge-glass)" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.8" />
      <circle cx="92" cy="35" r="2.5" fill="hsl(var(--primary))" />
      <circle cx="92" cy="80" r="2.5" fill="hsl(var(--primary))" />
      <rect x="88" y="28" width="3" height="14" rx="1.5" fill="hsl(var(--primary))" opacity="0.7" />
      <rect x="88" y="73" width="3" height="14" rx="1.5" fill="hsl(var(--primary))" opacity="0.7" />
      {/* Snow flakes */}
      <g opacity="0.4" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round">
        <path d="M40 30 L48 30 M44 26 L44 34 M41 27 L47 33 M47 27 L41 33" />
        <path d="M60 85 L68 85 M64 81 L64 89 M61 82 L67 88 M67 82 L61 88" transform="scale(0.7) translate(24 28)" />
      </g>
    </svg>
  );
}

/* ---------- Washing Machine ---------- */
export function WashingMachineIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 140" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="washer-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="washer-drum" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="hsl(200 80% 95%)" stopOpacity="0.8" />
          <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <rect x="15" y="8" width="90" height="124" rx="8" fill="url(#washer-body)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="22" y="15" width="76" height="20" rx="4" fill="hsl(var(--primary))" stopOpacity="0.08" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="25" r="3" fill="hsl(var(--primary))" opacity="0.6" />
      <circle cx="40" cy="25" r="3" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="70" y="22" width="20" height="6" rx="2" fill="hsl(var(--primary))" opacity="0.4" />
      <circle cx="60" cy="78" r="30" fill="url(#washer-drum)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="60" cy="78" r="24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
      <circle cx="60" cy="78" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
      <circle cx="60" cy="78" r="4" fill="hsl(var(--primary))" opacity="0.6" />
      {/* Water drops */}
      <g fill="hsl(var(--primary))" opacity="0.3">
        <circle cx="48" cy="68" r="2" />
        <circle cx="72" cy="72" r="1.5" />
        <circle cx="55" cy="90" r="1.8" />
      </g>
    </svg>
  );
}

/* ---------- Air Conditioner ---------- */
export function AirConditionerIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 140 80" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ac-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="15" y="12" width="110" height="40" rx="8" fill="url(#ac-body)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <line x1="20" y1="32" x2="120" y2="32" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
      <rect x="22" y="18" width="96" height="6" rx="3" fill="hsl(var(--primary))" opacity="0.15" />
      <rect x="22" y="38" width="96" height="6" rx="3" fill="hsl(var(--primary))" opacity="0.15" />
      {/* Air flow lines */}
      <g stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <path d="M40 58 Q35 65 40 72" fill="none" />
        <path d="M60 58 Q55 65 60 72" fill="none" />
        <path d="M80 58 Q75 65 80 72" fill="none" />
        <path d="M100 58 Q95 65 100 72" fill="none" />
      </g>
    </svg>
  );
}

/* ---------- Stove / Cooktop ---------- */
export function StoveIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stove-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="15" y="15" width="90" height="90" rx="8" fill="url(#stove-body)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="42" cy="42" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
      <circle cx="42" cy="42" r="10" fill="hsl(var(--accent))" opacity="0.15" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <circle cx="78" cy="42" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
      <circle cx="78" cy="42" r="10" fill="hsl(var(--accent))" opacity="0.15" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <circle cx="42" cy="78" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
      <circle cx="42" cy="78" r="10" fill="hsl(var(--accent))" opacity="0.1" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <circle cx="78" cy="78" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
      <circle cx="78" cy="78" r="10" fill="hsl(var(--accent))" opacity="0.1" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      {/* Heat waves */}
      <g stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" fill="none">
        <path d="M42 20 Q40 16 42 12" />
        <path d="M78 20 Q76 16 78 12" />
      </g>
    </svg>
  );
}

/* ---------- Dishwasher ---------- */
export function DishwasherIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 140" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dish-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="15" y="8" width="90" height="124" rx="8" fill="url(#dish-body)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="22" y="15" width="76" height="20" rx="4" fill="hsl(var(--primary))" stopOpacity="0.08" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="25" r="3" fill="hsl(var(--primary))" opacity="0.6" />
      <rect x="60" y="22" width="28" height="6" rx="2" fill="hsl(var(--primary))" opacity="0.4" />
      {/* Door panel with dish rack lines */}
      <rect x="22" y="42" width="76" height="82" rx="4" fill="hsl(var(--primary))" stopOpacity="0.06" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
      <g stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.4" strokeLinecap="round">
        <line x1="30" y1="55" x2="90" y2="55" />
        <line x1="30" y1="68" x2="90" y2="68" />
        <line x1="30" y1="81" x2="90" y2="81" />
        <line x1="30" y1="94" x2="90" y2="94" />
        <line x1="30" y1="107" x2="90" y2="107" />
      </g>
      {/* Plates */}
      <g fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="1">
        <ellipse cx="45" cy="55" rx="10" ry="3" />
        <ellipse cx="75" cy="68" rx="10" ry="3" />
        <ellipse cx="50" cy="94" rx="10" ry="3" />
      </g>
      {/* Water spray */}
      <g fill="hsl(var(--primary))" opacity="0.3">
        <circle cx="60" cy="78" r="2" />
        <circle cx="50" cy="82" r="1.5" />
        <circle cx="70" cy="76" r="1.2" />
      </g>
    </svg>
  );
}

/* ---------- Oven ---------- */
export function OvenIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 140" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oven-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="oven-heat" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      <rect x="15" y="8" width="90" height="124" rx="8" fill="url(#oven-body)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="22" y="15" width="76" height="16" rx="3" fill="hsl(var(--primary))" stopOpacity="0.08" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="23" r="3" fill="hsl(var(--primary))" opacity="0.5" />
      <circle cx="40" cy="23" r="2" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="75" y="20" width="16" height="6" rx="2" fill="hsl(var(--primary))" opacity="0.4" />
      {/* Oven door with glass */}
      <rect x="22" y="40" width="76" height="84" rx="6" fill="url(#oven-heat)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <rect x="28" y="48" width="64" height="68" rx="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
      {/* Heat lines inside */}
      <g stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" opacity="0.4" fill="none">
        <path d="M40 65 Q42 60 44 65 Q46 70 48 65" />
        <path d="M55 80 Q57 75 59 80 Q61 85 63 80" />
        <path d="M70 65 Q72 60 74 65 Q76 70 78 65" />
        <path d="M45 100 Q47 95 49 100 Q51 105 53 100" />
        <path d="M70 100 Q72 95 74 100 Q76 105 78 100" />
      </g>
      {/* Handle */}
      <rect x="35" y="36" width="50" height="5" rx="2.5" fill="hsl(var(--primary))" opacity="0.7" />
    </svg>
  );
}

/* ---------- Generic / Other ---------- */
export function GenericApplianceIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gen-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="80" height="80" rx="12" fill="url(#gen-body)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="60" cy="60" r="24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5" />
      <path d="M50 50 L70 70 M70 50 L50 70" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      {/* Gear decorations */}
      <g opacity="0.3" fill="hsl(var(--primary))">
        <circle cx="35" cy="35" r="4" />
        <circle cx="85" cy="85" r="4" />
      </g>
    </svg>
  );
}

/* ---------- Tool / Screwdriver ---------- */
export function ScrewdriverIcon({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 120" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sd-handle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect x="22" y="8" width="16" height="40" rx="6" fill="url(#sd-handle)" />
      <g stroke="hsl(var(--accent))" strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
        <line x1="26" y1="16" x2="34" y2="16" />
        <line x1="26" y1="24" x2="34" y2="24" />
        <line x1="26" y1="32" x2="34" y2="32" />
        <line x1="26" y1="40" x2="34" y2="40" />
      </g>
      <rect x="28" y="48" width="4" height="50" fill="hsl(200 20% 40%)" />
      <path d="M26 98 L34 98 L30 112 Z" fill="hsl(200 20% 50%)" />
    </svg>
  );
}

/* ---------- Wrench Icon ---------- */
export function WrenchIcon({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 120" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wr-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(200 30% 55%)" />
          <stop offset="100%" stopColor="hsl(200 30% 40%)" />
        </linearGradient>
      </defs>
      <path d="M30 10 L30 20 L20 30 L20 40 L30 50 L30 60 L40 70 L40 110 L48 110 L48 70 L58 60 L58 50 L68 40 L68 30 L58 20 L58 10 Z" fill="url(#wr-body)" opacity="0.8" />
      <path d="M30 10 L30 20 L20 30 L20 40 L30 50 L30 60 L40 70 L40 110 L48 110 L48 70 L58 60 L58 50 L68 40 L68 30 L58 20 L58 10 Z" fill="none" stroke="hsl(200 30% 30%)" strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- Gear Icon (decorative) ---------- */
export function GearIcon({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="hsl(var(--primary))" strokeWidth="3" fill="hsl(var(--primary))" fillOpacity="0.1">
        <path d="M50 10 L55 10 L57 22 L63 24 L70 16 L74 19 L68 28 L72 33 L82 31 L82 36 L72 38 L72 44 L82 46 L82 51 L72 49 L68 54 L74 63 L70 66 L63 58 L57 60 L55 72 L50 72 L48 60 L42 58 L36 66 L32 63 L38 54 L34 49 L24 51 L24 46 L34 44 L34 38 L24 36 L24 31 L34 33 L38 28 L32 19 L36 16 L42 24 L48 22 Z" />
        <circle cx="50" cy="42" r="12" fill="hsl(var(--background))" />
      </g>
    </svg>
  );
}

/* ---------- Spark/Bolt (decorative) ---------- */
export function SparkBolt({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 40 60" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 5 L10 32 L18 32 L16 55 L30 25 L22 25 Z" fill="hsl(var(--accent))" opacity="0.7" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Floating tool badge (small circle with icon) ---------- */
export function ToolBadge({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 60" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <circle cx="30" cy="30" r="28" fill="hsl(var(--primary))" fillOpacity="0.05" />
      <g stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M20 20 L40 40" />
        <path d="M40 20 L20 40" />
      </g>
      <circle cx="30" cy="30" r="6" fill="hsl(var(--accent))" opacity="0.8" />
    </svg>
  );
}

/* ---------- Shield check (for trust badge) ---------- */
export function ShieldCheckIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 70" className={cn('w-full h-full', className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 5 L52 15 L52 35 Q52 55 30 65 Q8 55 8 35 L8 15 Z" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />
      <path d="M20 35 L27 42 L42 25" stroke="hsl(var(--success))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* Map appliance key to illustration component */
import type { ApplianceKey } from '@/lib/constants';

export function getApplianceIllustration(key: ApplianceKey) {
  const map: Record<ApplianceKey, React.FC<IllustrationProps>> = {
    refrigerator: RefrigeratorIllustration,
    washing_machine: WashingMachineIllustration,
    dishwasher: DishwasherIllustration,
    stove: StoveIllustration,
    oven: OvenIllustration,
    air_conditioner: AirConditionerIllustration,
    other: GenericApplianceIllustration,
  };
  return map[key];
}
