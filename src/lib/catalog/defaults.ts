import type { RateItem, Trade, TradeGroup } from "@/lib/ai/schemas";

/** Parent categories that group related trades for quoting. */
export const defaultTradeGroups: TradeGroup[] = [
  {
    id: "g-interior",
    name: "Interior finishes",
    nameKo: "실내 마감",
  },
  {
    id: "g-joinery",
    name: "Building & joinery",
    nameKo: "건축·목공",
  },
  {
    id: "g-licensed",
    name: "Licensed trades",
    nameKo: "자격 직종",
  },
  {
    id: "g-exterior",
    name: "Exterior & grounds",
    nameKo: "외부·조경",
  },
  {
    id: "g-property",
    name: "Property services",
    nameKo: "시설·관리",
  },
];

/** Seed trades under each group — companies can still add their own. */
export const defaultTrades: Trade[] = [
  // Interior finishes
  { id: "t-paint", groupId: "g-interior", name: "Painting", nameKo: "페인트" },
  { id: "t-floor", groupId: "g-interior", name: "Flooring", nameKo: "바닥" },
  { id: "t-tile", groupId: "g-interior", name: "Tiling", nameKo: "타일" },
  { id: "t-plaster", groupId: "g-interior", name: "Plaster / gyprock", nameKo: "석고보드·미장" },
  { id: "t-wallcov", groupId: "g-interior", name: "Wallpaper / feature walls", nameKo: "벽지·포인트벽" },
  // Building & joinery
  { id: "t-carp", groupId: "g-joinery", name: "Carpentry", nameKo: "목공" },
  { id: "t-cabin", groupId: "g-joinery", name: "Cabinetry / joinery", nameKo: "붙박이·캐비닛" },
  { id: "t-build", groupId: "g-joinery", name: "Building / renovation", nameKo: "건축·리모델링" },
  { id: "t-waterp", groupId: "g-joinery", name: "Waterproofing", nameKo: "방수" },
  // Licensed trades
  { id: "t-plumb", groupId: "g-licensed", name: "Plumbing", nameKo: "배관" },
  { id: "t-elec", groupId: "g-licensed", name: "Electrical", nameKo: "전기" },
  { id: "t-gas", groupId: "g-licensed", name: "Gas fitting", nameKo: "가스" },
  { id: "t-hvac", groupId: "g-licensed", name: "HVAC / air-con", nameKo: "냉난방" },
  // Exterior & grounds
  { id: "t-roof", groupId: "g-exterior", name: "Roofing", nameKo: "지붕" },
  { id: "t-land", groupId: "g-exterior", name: "Landscaping", nameKo: "조경" },
  { id: "t-fence", groupId: "g-exterior", name: "Fencing", nameKo: "펜스" },
  { id: "t-concrete", groupId: "g-exterior", name: "Concrete / paving", nameKo: "콘크리트·포장" },
  // Property services
  { id: "t-clean", groupId: "g-property", name: "Cleaning", nameKo: "청소" },
  { id: "t-pest", groupId: "g-property", name: "Pest control", nameKo: "방충·방제" },
  { id: "t-hand", groupId: "g-property", name: "Handyman / general", nameKo: "종합 수리" },
  { id: "t-waste", groupId: "g-property", name: "Waste / skip", nameKo: "폐기물·스키프" },
];

type SeedRate = Omit<RateItem, "id">;

function ratesFor(tradeId: string, items: Omit<SeedRate, "tradeId">[]): RateItem[] {
  return items.map((item, index) => ({
    id: `${tradeId}-${index + 1}`,
    tradeId,
    ...item,
  }));
}

/**
 * Granular starter rate cards (demo defaults).
 * Painting figures are mid-market AU 2026 guides (ex tax) — hipages / Brushworks /
 * What’s The Damage style ranges: interior ~$15–$45/m², exterior ~$15–$60/m²,
 * painter labour ~$40–$120/hr (metro typical ~$50–$70).
 */
export const defaultRates: RateItem[] = [
  ...ratesFor("t-paint", [
    { code: "PT-CALL", label: "Paint quote / measure", unit: "job", unitPriceExGst: 90 },
    { code: "PT-HR", label: "Painter labour", unit: "hour", unitPriceExGst: 65 },
    { code: "PT-DAY", label: "Painter day rate", unit: "day", unitPriceExGst: 480 },
    { code: "PT-WALL-BASIC", label: "Interior walls — basic (2 coats)", unit: "m²", unitPriceExGst: 20 },
    { code: "PT-WALL", label: "Interior walls — standard (2 coats)", unit: "m²", unitPriceExGst: 25 },
    { code: "PT-WALL-PREM", label: "Interior walls — premium finish", unit: "m²", unitPriceExGst: 35 },
    { code: "PT-CEIL", label: "Ceiling painting (2 coats)", unit: "m²", unitPriceExGst: 11 },
    { code: "PT-PREP", label: "Surface prep / fill & sand", unit: "m²", unitPriceExGst: 9 },
    { code: "PT-TRIM", label: "Skirting / trim paint", unit: "lm", unitPriceExGst: 8 },
    { code: "PT-DOOR", label: "Door paint (both sides)", unit: "each", unitPriceExGst: 90 },
    { code: "PT-EXT", label: "Exterior walls — masonry / render", unit: "m²", unitPriceExGst: 35 },
    { code: "PT-EXT-TIMB", label: "Exterior walls — timber / weatherboard", unit: "m²", unitPriceExGst: 48 },
    { code: "PT-FENCE", label: "Fence paint / stain (both sides)", unit: "lm", unitPriceExGst: 30 },
    { code: "PT-ROOM", label: "Single room package (walls + ceiling)", unit: "job", unitPriceExGst: 500 },
  ]),
  ...ratesFor("t-floor", [
    { code: "FL-CALL", label: "Flooring measure", unit: "job", unitPriceExGst: 80 },
    { code: "FL-HR", label: "Flooring labour", unit: "hour", unitPriceExGst: 75 },
    { code: "FL-LAM", label: "Laminate supply & install", unit: "m²", unitPriceExGst: 55 },
    { code: "FL-VIN", label: "Vinyl plank supply & install", unit: "m²", unitPriceExGst: 65 },
    { code: "FL-ENG", label: "Engineered timber install", unit: "m²", unitPriceExGst: 95 },
    { code: "FL-CARP", label: "Carpet supply & install", unit: "m²", unitPriceExGst: 48 },
    { code: "FL-REM", label: "Old floor uplift & dispose", unit: "m²", unitPriceExGst: 18 },
    { code: "FL-SKIRT", label: "Skirting supply & fix", unit: "lm", unitPriceExGst: 22 },
  ]),
  ...ratesFor("t-tile", [
    { code: "TI-CALL", label: "Tiling measure", unit: "job", unitPriceExGst: 85 },
    { code: "TI-HR", label: "Tiler labour", unit: "hour", unitPriceExGst: 85 },
    { code: "TI-FLOOR", label: "Floor tiling (labour)", unit: "m²", unitPriceExGst: 75 },
    { code: "TI-WALL", label: "Wall tiling (labour)", unit: "m²", unitPriceExGst: 85 },
    { code: "TI-MOS", label: "Mosaic / feature tiling", unit: "m²", unitPriceExGst: 120 },
    { code: "TI-WATER", label: "Wet area waterproofing", unit: "m²", unitPriceExGst: 55 },
    { code: "TI-GROUT", label: "Regrout / silicone", unit: "lm", unitPriceExGst: 12 },
  ]),
  ...ratesFor("t-plaster", [
    { code: "PLAS-CALL", label: "Plaster quote / measure", unit: "job", unitPriceExGst: 90 },
    { code: "PLAS-HR", label: "Plasterer labour", unit: "hour", unitPriceExGst: 80 },
    { code: "PLAS-SHEET", label: "Gyprock sheet & set", unit: "m²", unitPriceExGst: 55 },
    { code: "PLAS-PATCH", label: "Patch & sand (minor)", unit: "each", unitPriceExGst: 85 },
    { code: "PLAS-CORN", label: "Cornice supply & fix", unit: "lm", unitPriceExGst: 28 },
    { code: "PLAS-SKIM", label: "Full skim coat", unit: "m²", unitPriceExGst: 35 },
  ]),
  ...ratesFor("t-wallcov", [
    { code: "WP-CALL", label: "Wallpaper measure", unit: "job", unitPriceExGst: 75 },
    { code: "WP-HR", label: "Wallpaper / feature-wall labour", unit: "hour", unitPriceExGst: 75 },
    { code: "WP-STD", label: "Wallpaper hang (labour)", unit: "m²", unitPriceExGst: 42 },
    { code: "WP-STRIP", label: "Old wallpaper strip", unit: "m²", unitPriceExGst: 18 },
    { code: "WP-FEAT", label: "Feature wall install", unit: "m²", unitPriceExGst: 65 },
  ]),
  ...ratesFor("t-carp", [
    { code: "CA-CALL", label: "Carpentry call-out", unit: "job", unitPriceExGst: 90 },
    { code: "CA-HR", label: "Carpenter labour", unit: "hour", unitPriceExGst: 95 },
    { code: "CA-DOOR", label: "Internal door hang & fit", unit: "each", unitPriceExGst: 280 },
    { code: "CA-SHELF", label: "Custom shelving", unit: "lm", unitPriceExGst: 95 },
    { code: "CA-DECK", label: "Deck board supply & fix", unit: "m²", unitPriceExGst: 145 },
    { code: "CA-FRAME", label: "Stud wall framing", unit: "m²", unitPriceExGst: 85 },
  ]),
  ...ratesFor("t-cabin", [
    { code: "CB-CALL", label: "Cabinetry measure", unit: "job", unitPriceExGst: 100 },
    { code: "CB-HR", label: "Cabinetmaker labour", unit: "hour", unitPriceExGst: 95 },
    { code: "CB-BASE", label: "Base cupboard install", unit: "each", unitPriceExGst: 180 },
    { code: "CB-WALL", label: "Wall cupboard install", unit: "each", unitPriceExGst: 160 },
    { code: "CB-BENCH", label: "Benchtop fit (labour)", unit: "lm", unitPriceExGst: 120 },
    { code: "CB-HANDLE", label: "Handle / hardware fit", unit: "each", unitPriceExGst: 18 },
  ]),
  ...ratesFor("t-build", [
    { code: "BD-CALL", label: "Site measure / quote", unit: "job", unitPriceExGst: 120 },
    { code: "BD-HR", label: "Builder labour", unit: "hour", unitPriceExGst: 105 },
    { code: "BD-DEMO", label: "Soft strip-out", unit: "m²", unitPriceExGst: 45 },
    { code: "BD-PLAST", label: "Plasterboard supply & fix", unit: "m²", unitPriceExGst: 55 },
    { code: "BD-SITE", label: "Site prep / protection", unit: "job", unitPriceExGst: 250 },
  ]),
  ...ratesFor("t-waterp", [
    { code: "WPX-CALL", label: "Waterproofing inspect", unit: "job", unitPriceExGst: 110 },
    { code: "WPX-HR", label: "Waterproofing labour", unit: "hour", unitPriceExGst: 100 },
    { code: "WPX-BATH", label: "Bathroom wet area membrane", unit: "m²", unitPriceExGst: 75 },
    { code: "WPX-BALC", label: "Balcony membrane", unit: "m²", unitPriceExGst: 95 },
    { code: "WPX-FLASH", label: "Flashing detail", unit: "lm", unitPriceExGst: 45 },
  ]),
  ...ratesFor("t-plumb", [
    { code: "PL-CALL", label: "Plumbing call-out", unit: "job", unitPriceExGst: 95 },
    { code: "PL-HR", label: "Licensed plumber labour", unit: "hour", unitPriceExGst: 120 },
    { code: "PL-TAP", label: "Tap / mixer replace (supply & fit)", unit: "each", unitPriceExGst: 185 },
    { code: "PL-BLOCK", label: "Blocked drain clear", unit: "job", unitPriceExGst: 220 },
    { code: "PL-HW", label: "Hot water system service", unit: "job", unitPriceExGst: 165 },
    { code: "PL-TOIL", label: "Toilet suite replace (labour)", unit: "each", unitPriceExGst: 320 },
    { code: "PL-CIS", label: "Cistern repair", unit: "job", unitPriceExGst: 145 },
  ]),
  ...ratesFor("t-elec", [
    { code: "EL-CALL", label: "Electrical call-out", unit: "job", unitPriceExGst: 110 },
    { code: "EL-HR", label: "Licensed electrician labour", unit: "hour", unitPriceExGst: 130 },
    { code: "EL-PPT", label: "Power point install", unit: "each", unitPriceExGst: 145 },
    { code: "EL-LIGHT", label: "Light fitting install", unit: "each", unitPriceExGst: 120 },
    { code: "EL-SMOKE", label: "Smoke alarm replace", unit: "each", unitPriceExGst: 95 },
    { code: "EL-SWITCH", label: "Switchboard circuit add", unit: "each", unitPriceExGst: 280 },
    { code: "EL-LED", label: "Downlight LED convert", unit: "each", unitPriceExGst: 85 },
  ]),
  ...ratesFor("t-gas", [
    { code: "GS-CALL", label: "Gas fitting call-out", unit: "job", unitPriceExGst: 115 },
    { code: "GS-HR", label: "Licensed gasfitter labour", unit: "hour", unitPriceExGst: 135 },
    { code: "GS-COOK", label: "Cooktop connect", unit: "each", unitPriceExGst: 220 },
    { code: "GS-HEAT", label: "Gas heater service", unit: "each", unitPriceExGst: 175 },
    { code: "GS-TEST", label: "Gas leak test / certify", unit: "job", unitPriceExGst: 190 },
  ]),
  ...ratesFor("t-hvac", [
    { code: "HV-CALL", label: "Air-con call-out", unit: "job", unitPriceExGst: 120 },
    { code: "HV-HR", label: "HVAC tech labour", unit: "hour", unitPriceExGst: 140 },
    { code: "HV-SERV", label: "Split system service", unit: "each", unitPriceExGst: 165 },
    { code: "HV-GAS", label: "Gas top-up (per kg)", unit: "kg", unitPriceExGst: 45 },
    { code: "HV-INST", label: "Split install labour only", unit: "each", unitPriceExGst: 650 },
    { code: "HV-DUCT", label: "Ducted filter clean", unit: "job", unitPriceExGst: 220 },
  ]),
  ...ratesFor("t-roof", [
    { code: "RF-CALL", label: "Roof inspection", unit: "job", unitPriceExGst: 150 },
    { code: "RF-HR", label: "Roofing labour", unit: "hour", unitPriceExGst: 110 },
    { code: "RF-TILE", label: "Tile replace", unit: "each", unitPriceExGst: 35 },
    { code: "RF-GUT", label: "Gutter clean", unit: "lm", unitPriceExGst: 8 },
    { code: "RF-LEAK", label: "Leak repair (minor)", unit: "job", unitPriceExGst: 280 },
    { code: "RF-POINT", label: "Ridge capping re-point", unit: "lm", unitPriceExGst: 45 },
  ]),
  ...ratesFor("t-land", [
    { code: "LA-CALL", label: "Garden visit / quote", unit: "job", unitPriceExGst: 75 },
    { code: "LA-HR", label: "Landscaping labour", unit: "hour", unitPriceExGst: 70 },
    { code: "LA-MOW", label: "Lawn mow & edge", unit: "job", unitPriceExGst: 65 },
    { code: "LA-MULCH", label: "Mulch supply & spread", unit: "m²", unitPriceExGst: 18 },
    { code: "LA-TREE", label: "Small tree prune", unit: "each", unitPriceExGst: 120 },
    { code: "LA-TURF", label: "Turf supply & lay", unit: "m²", unitPriceExGst: 28 },
  ]),
  ...ratesFor("t-fence", [
    { code: "FN-CALL", label: "Fence quote / measure", unit: "job", unitPriceExGst: 85 },
    { code: "FN-HR", label: "Fencing labour", unit: "hour", unitPriceExGst: 80 },
    { code: "FN-COLO", label: "Colorbond fence (labour)", unit: "lm", unitPriceExGst: 95 },
    { code: "FN-TIMB", label: "Timber paling fence", unit: "lm", unitPriceExGst: 110 },
    { code: "FN-GATE", label: "Gate supply & hang", unit: "each", unitPriceExGst: 320 },
    { code: "FN-POST", label: "Post replace", unit: "each", unitPriceExGst: 145 },
  ]),
  ...ratesFor("t-concrete", [
    { code: "CN-CALL", label: "Concrete quote", unit: "job", unitPriceExGst: 100 },
    { code: "CN-HR", label: "Concreting labour", unit: "hour", unitPriceExGst: 90 },
    { code: "CN-SLAB", label: "Slab pour (labour + place)", unit: "m²", unitPriceExGst: 85 },
    { code: "CN-PATH", label: "Pathway pour", unit: "m²", unitPriceExGst: 95 },
    { code: "CN-PAVE", label: "Paver supply & lay", unit: "m²", unitPriceExGst: 75 },
    { code: "CN-CUT", label: "Concrete cut / core", unit: "each", unitPriceExGst: 180 },
  ]),
  ...ratesFor("t-clean", [
    { code: "CL-CALL", label: "Cleaning call-out", unit: "job", unitPriceExGst: 60 },
    { code: "CL-HR", label: "General cleaning labour", unit: "hour", unitPriceExGst: 55 },
    { code: "CL-BOND", label: "End-of-lease clean (2bed)", unit: "job", unitPriceExGst: 380 },
    { code: "CL-CARP", label: "Carpet steam clean", unit: "m²", unitPriceExGst: 8 },
    { code: "CL-WIN", label: "Window clean (interior)", unit: "each", unitPriceExGst: 12 },
    { code: "CL-BUILD", label: "Builder's clean", unit: "m²", unitPriceExGst: 6 },
  ]),
  ...ratesFor("t-pest", [
    { code: "PE-CALL", label: "Pest inspection", unit: "job", unitPriceExGst: 95 },
    { code: "PE-HR", label: "Pest tech labour", unit: "hour", unitPriceExGst: 85 },
    { code: "PE-GEN", label: "General pest spray", unit: "job", unitPriceExGst: 165 },
    { code: "PE-TERM", label: "Termite inspection", unit: "job", unitPriceExGst: 220 },
    { code: "PE-ROD", label: "Rodent treatment", unit: "job", unitPriceExGst: 145 },
  ]),
  ...ratesFor("t-hand", [
    { code: "HN-CALL", label: "Handyman call-out", unit: "job", unitPriceExGst: 80 },
    { code: "HN-HR", label: "Handyman labour", unit: "hour", unitPriceExGst: 75 },
    { code: "HN-FLAT", label: "Flat-pack assemble", unit: "each", unitPriceExGst: 95 },
    { code: "HN-TV", label: "TV wall mount", unit: "each", unitPriceExGst: 120 },
    { code: "HN-PIC", label: "Picture / mirror hang", unit: "each", unitPriceExGst: 35 },
    { code: "HN-LOCK", label: "Lock replace", unit: "each", unitPriceExGst: 95 },
  ]),
  ...ratesFor("t-waste", [
    { code: "WS-SKIP", label: "Skip bin hire (allowance)", unit: "each", unitPriceExGst: 420 },
    { code: "WS-LOAD", label: "Load & dispose (labour)", unit: "hour", unitPriceExGst: 70 },
    { code: "WS-RUBB", label: "Rubbish removal run", unit: "job", unitPriceExGst: 180 },
    { code: "WS-HAZ", label: "Hazardous disposal allowance", unit: "each", unitPriceExGst: 95 },
  ]),
];

export function tradeDisplayName(trade: Trade, locale: string): string {
  if (locale.startsWith("ko") && trade.nameKo) return trade.nameKo;
  return trade.name;
}

export function groupDisplayName(group: TradeGroup, locale: string): string {
  if (locale.startsWith("ko") && group.nameKo) return group.nameKo;
  return group.name;
}

/** Map legacy flat trade ids (no group) into the new grouped catalog. */
export const legacyTradeGroupMap: Record<string, string> = {
  "t-plumb": "g-licensed",
  "t-elec": "g-licensed",
  "t-hvac": "g-licensed",
  "t-paint": "g-interior",
  "t-floor": "g-interior",
  "t-tile": "g-interior",
  "t-carp": "g-joinery",
  "t-build": "g-joinery",
  "t-roof": "g-exterior",
  "t-land": "g-exterior",
  "t-clean": "g-property",
  "t-hand": "g-property",
};
