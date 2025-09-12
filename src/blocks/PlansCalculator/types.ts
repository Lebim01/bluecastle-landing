export type Plans = "growth" | "capitalization" | "retirement";

export type GrowthProducts = "bridgewater" | "bridgewaterPlus" | "bridgewaterBusiness";
export type CapitalizationProducts = "regent" | "stJames" | "lindenwood";
export type RetirementProducts =
  | "fortgarryPlatinum"
  | "fortgarryGold"
  | "fortgarrySilver"
  | "fortgarryLimited";

export type Products = GrowthProducts | CapitalizationProducts | RetirementProducts;
