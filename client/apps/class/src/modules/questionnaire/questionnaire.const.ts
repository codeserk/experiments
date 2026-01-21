import {
  DebtLevel,
  HealthInsurance,
  HouseProperty,
  HousePropertyCost,
  MonthlyIncome,
  PassiveIncome,
  QuestionnaireStep,
  SavingsLevel,
  WorkingArea,
  type CostOfLiving,
  type QuestionnaireField,
} from './questionnaire.types'

export const MONTHLY_INCOME_MAP: Record<MonthlyIncome, number> = {
  [MonthlyIncome.Nothing]: 0,
  [MonthlyIncome.Under500]: 250,
  [MonthlyIncome.Income500To1000]: 750,
  [MonthlyIncome.Income1000To2000]: 1_500,
  [MonthlyIncome.Income2000To3000]: 2_500,
  [MonthlyIncome.Income3000To5000]: 4_000,
  [MonthlyIncome.Income5000To7500]: 6_250,
  [MonthlyIncome.Income7500To10000]: 8_750,
  [MonthlyIncome.Income10000To15000]: 12_500,
  [MonthlyIncome.Income15000To20000]: 17_500,
  [MonthlyIncome.Income20000Plus]: 25_000,
}

export const SAVINGS_LEVEL_MAP: Record<SavingsLevel, number> = {
  [SavingsLevel.NoSavings]: 0,
  [SavingsLevel.Under1000]: 500,
  [SavingsLevel.Savings1000To5000]: 3_000,
  [SavingsLevel.Savings5000To10000]: 7_500,
  [SavingsLevel.Savings10000To25000]: 17_500,
  [SavingsLevel.Savings25000To50000]: 37_500,
  [SavingsLevel.Savings50000To100000]: 75_000,
  [SavingsLevel.Savings100000To250000]: 175_000,
  [SavingsLevel.Savings250000To500000]: 375_000,
  [SavingsLevel.Savings500000Plus]: 750_000,
}

export const DEBT_LEVEL_MAP: Record<DebtLevel, number> = {
  [DebtLevel.NoDebt]: 0,
  [DebtLevel.Under5000]: 2500,
  [DebtLevel.Debt5000To10000]: 7500,
  [DebtLevel.Debt10000To25000]: 17500,
  [DebtLevel.Debt25000To50000]: 37500,
  [DebtLevel.Debt50000To100000]: 75000,
  [DebtLevel.Debt100000Plus]: 150000,
}

export const PASSIVE_INCOME_MAP: Record<PassiveIncome, number> = {
  [PassiveIncome.None]: 0,
  [PassiveIncome.Under500]: 250,
  [PassiveIncome.Income500To1000]: 750,
  [PassiveIncome.Income1000To2500]: 1750,
  [PassiveIncome.Income2500To5000]: 3750,
  [PassiveIncome.Income5000Plus]: 7500,
  [PassiveIncome.Income10000Plus]: 15000,
}

export const JOB_DISPLACEMENT_RISK: Record<WorkingArea, number> = {
  [WorkingArea.Administrative]: 0.7,
  [WorkingArea.Agriculture]: 0.28,
  [WorkingArea.Arts]: 0.2,
  [WorkingArea.Construction]: 0.08,
  [WorkingArea.CustomerService]: 0.6,
  [WorkingArea.Education]: 0.15,
  [WorkingArea.Engineering]: 0.25,
  [WorkingArea.Finance]: 0.5,
  [WorkingArea.FoodService]: 0.2,
  [WorkingArea.Government]: 0.35,
  [WorkingArea.Healthcare]: 0.1,
  [WorkingArea.HumanResources]: 0.5,
  [WorkingArea.InformationTechnology]: 0.33,
  [WorkingArea.Legal]: 0.65,
  [WorkingArea.Manufacturing]: 0.5,
  [WorkingArea.Marketing]: 0.4,
  [WorkingArea.Military]: 0.25,
  [WorkingArea.NonProfit]: 0.2,
  [WorkingArea.RealEstate]: 0.25,
  [WorkingArea.Research]: 0.2,
  [WorkingArea.Sales]: 0.59,
  [WorkingArea.Security]: 0.3,
  [WorkingArea.SocialWork]: 0.08,
  [WorkingArea.Transportation]: 0.38,
  [WorkingArea.Utilities]: 0.3,
  [WorkingArea.Warehouse]: 0.4,
  [WorkingArea.Writing]: 0.4,
  [WorkingArea.SelfEmployed]: 0.3,
  [WorkingArea.Freelance]: 0.43,
  [WorkingArea.Student]: 0,
  [WorkingArea.Retired]: 0,
  [WorkingArea.Unemployed]: 0,
  [WorkingArea.IDoNotWork]: 0,
}

export const COST_OF_LIVING_BY_COUNTRY: Record<string, CostOfLiving> = {
  // Europe - Western/Nordic
  CH: { monthlyRent: 2000, monthlyExpenses: 1200 },
  IS: { monthlyRent: 1700, monthlyExpenses: 1100 },
  NO: { monthlyRent: 1600, monthlyExpenses: 1000 },
  DK: { monthlyRent: 1500, monthlyExpenses: 900 },
  LU: { monthlyRent: 1600, monthlyExpenses: 700 },
  IE: { monthlyRent: 1500, monthlyExpenses: 700 },
  UK: { monthlyRent: 1400, monthlyExpenses: 700 },
  NL: { monthlyRent: 1300, monthlyExpenses: 700 },
  SE: { monthlyRent: 1200, monthlyExpenses: 700 },
  FI: { monthlyRent: 1100, monthlyExpenses: 700 },
  AT: { monthlyRent: 1100, monthlyExpenses: 700 },
  BE: { monthlyRent: 1100, monthlyExpenses: 700 },
  DE: { monthlyRent: 1000, monthlyExpenses: 700 },
  FR: { monthlyRent: 1000, monthlyExpenses: 700 },

  // Europe - Southern
  IT: { monthlyRent: 900, monthlyExpenses: 600 },
  ES: { monthlyRent: 850, monthlyExpenses: 550 },
  GR: { monthlyRent: 650, monthlyExpenses: 550 },
  PT: { monthlyRent: 700, monthlyExpenses: 500 },
  MT: { monthlyRent: 800, monthlyExpenses: 500 },
  CY: { monthlyRent: 850, monthlyExpenses: 550 },

  // Europe - Eastern/Central
  CZ: { monthlyRent: 650, monthlyExpenses: 450 },
  PL: { monthlyRent: 600, monthlyExpenses: 400 },
  EE: { monthlyRent: 650, monthlyExpenses: 450 },
  LT: { monthlyRent: 600, monthlyExpenses: 400 },
  LV: { monthlyRent: 600, monthlyExpenses: 400 },
  SK: { monthlyRent: 600, monthlyExpenses: 400 },
  SI: { monthlyRent: 750, monthlyExpenses: 550 },
  HR: { monthlyRent: 650, monthlyExpenses: 450 },
  HU: { monthlyRent: 550, monthlyExpenses: 350 },
  RO: { monthlyRent: 450, monthlyExpenses: 350 },
  BG: { monthlyRent: 400, monthlyExpenses: 300 },
  RS: { monthlyRent: 400, monthlyExpenses: 300 },
  ME: { monthlyRent: 500, monthlyExpenses: 400 },
  MK: { monthlyRent: 400, monthlyExpenses: 300 },
  AL: { monthlyRent: 400, monthlyExpenses: 300 },
  BA: { monthlyRent: 400, monthlyExpenses: 300 },

  // North America
  US: { monthlyRent: 1500, monthlyExpenses: 1000 },
  CA: { monthlyRent: 1400, monthlyExpenses: 800 },

  // Latin America
  MX: { monthlyRent: 550, monthlyExpenses: 450 },
  BR: { monthlyRent: 500, monthlyExpenses: 400 },
  AR: { monthlyRent: 450, monthlyExpenses: 350 },
  CL: { monthlyRent: 650, monthlyExpenses: 450 },
  CO: { monthlyRent: 450, monthlyExpenses: 350 },
  PE: { monthlyRent: 400, monthlyExpenses: 300 },

  // Asia - Developed
  JP: { monthlyRent: 1200, monthlyExpenses: 800 },
  SG: { monthlyRent: 1800, monthlyExpenses: 1000 },
  HK: { monthlyRent: 1800, monthlyExpenses: 800 },
  KR: { monthlyRent: 1100, monthlyExpenses: 700 },
  TW: { monthlyRent: 850, monthlyExpenses: 550 },

  // Asia - Emerging
  CN: { monthlyRent: 700, monthlyExpenses: 500 },
  TH: { monthlyRent: 500, monthlyExpenses: 400 },
  MY: { monthlyRent: 500, monthlyExpenses: 400 },
  VN: { monthlyRent: 400, monthlyExpenses: 300 },
  PH: { monthlyRent: 400, monthlyExpenses: 300 },
  ID: { monthlyRent: 400, monthlyExpenses: 300 },
  IN: { monthlyRent: 250, monthlyExpenses: 250 },
  PK: { monthlyRent: 200, monthlyExpenses: 200 },
  BD: { monthlyRent: 200, monthlyExpenses: 200 },

  // Middle East
  AE: { monthlyRent: 1400, monthlyExpenses: 800 },
  SA: { monthlyRent: 900, monthlyExpenses: 600 },
  IL: { monthlyRent: 1500, monthlyExpenses: 800 },
  TR: { monthlyRent: 500, monthlyExpenses: 400 },

  // Africa
  ZA: { monthlyRent: 500, monthlyExpenses: 400 },
  EG: { monthlyRent: 300, monthlyExpenses: 300 },
  KE: { monthlyRent: 400, monthlyExpenses: 300 },
  NG: { monthlyRent: 350, monthlyExpenses: 250 },

  // Oceania
  AU: { monthlyRent: 1500, monthlyExpenses: 900 },
  NZ: { monthlyRent: 1400, monthlyExpenses: 800 },
}

export const DEFAULT_COST_OF_LIVING = { monthlyRent: 600, monthlyExpenses: 400 }

export const HOUSE_COST_MULTIPLIER: Record<HousePropertyCost, number> = {
  [HousePropertyCost.None]: 0,
  [HousePropertyCost.Cheap]: 0.75,
  [HousePropertyCost.Normal]: 1,
  [HousePropertyCost.Expensive]: 2,
  [HousePropertyCost.VeryExpensive]: 4,
}

export const HOUSE_PROPERTY_NO_COST = [HouseProperty.Free, HouseProperty.Owned, HouseProperty.Nothing]

export const MEDICAL_DEBT_RISK_BY_COUNTRY: Record<string, number> = {
  // Universal healthcare countries - virtually 0 risk
  ES: 0.0,
  FR: 0.0,
  UK: 0.0,
  IT: 0.0,
  PT: 0.0,
  SE: 0.0,
  NO: 0.0,
  DK: 0.0,
  FI: 0.0,
  DE: 0.0,
  AT: 0.0,
  BE: 0.0,
  NL: 0.0,
  IE: 0.0,
  CH: 0.0,
  IS: 0.0,
  CA: 0.02, // Has universal but some gaps
  AU: 0.03, // Medicare + gaps
  JP: 0.01,
  KR: 0.02,
  TW: 0.01,

  // HIGH RISK - USA is the outlier
  US: 0.62, // <-- 62% of bankruptcies

  // Developing countries - variable systems
  MX: 0.15,
  BR: 0.2,
  AR: 0.18,
  IN: 0.25,
  CN: 0.15,
  ID: 0.12,
}

export const US_MEDICAL_DEBT_RISK: Record<HealthInsurance, number> = {
  [HealthInsurance.EmployerProvided]: 0.2, // Still some risk
  [HealthInsurance.SelfPurchased]: 0.4, // Higher risk
  [HealthInsurance.GovernmentProvided]: 0.3, // Medicare gaps
  [HealthInsurance.NoInsurance]: 0.8, // Catastrophic risk
}

export const UNIVERSAL_HEALTHCARE_COUNTRIES = [
  'ES',
  'FR',
  'UK',
  'IT',
  'PT',
  'SE',
  'NO',
  'DK',
  'FI',
  'DE',
  'AT',
  'BE',
  'NL',
  'IE',
  'CH',
  'IS',
]

export const DEFAULT_MEDICAL_DEBT_RISK = 0.2

export const QUESTIONNAIRE_STEPS: QuestionnaireStep[] = [
  // Profile
  QuestionnaireStep.Age,
  QuestionnaireStep.Gender,
  QuestionnaireStep.Ethnicity,
  QuestionnaireStep.Religion,
  QuestionnaireStep.ImmigrationStatus,
  QuestionnaireStep.Education,
  QuestionnaireStep.PoliticalEconomicView,
  QuestionnaireStep.PoliticalAuthorityView,
  // Answers
  QuestionnaireStep.WorkingArea,
  QuestionnaireStep.MonthlyIncome,
  QuestionnaireStep.SavingsLevel,
  QuestionnaireStep.HouseProperty,
  QuestionnaireStep.HouseCost,
  QuestionnaireStep.DebtLevel,
  QuestionnaireStep.HealthInsurance,
  QuestionnaireStep.InvestmentAreas,
  QuestionnaireStep.PassiveIncome,
]

export const QUESTIONNAIRE_MANDATORY_STEPS = [
  QuestionnaireStep.WorkingArea,
  QuestionnaireStep.MonthlyIncome,
  QuestionnaireStep.SavingsLevel,
  QuestionnaireStep.HouseProperty,
  QuestionnaireStep.HouseCost,
  QuestionnaireStep.DebtLevel,
  QuestionnaireStep.HealthInsurance,
  QuestionnaireStep.InvestmentAreas,
  QuestionnaireStep.PassiveIncome,
]

export const QUESTIONNAIRE_AUTO_CONTINUE_STEPS = [
  // Profile
  QuestionnaireStep.Age,
  QuestionnaireStep.Gender,
  QuestionnaireStep.Ethnicity,
  QuestionnaireStep.Religion,
  QuestionnaireStep.ImmigrationStatus,
  QuestionnaireStep.Education,
  QuestionnaireStep.PoliticalEconomicView,
  QuestionnaireStep.PoliticalAuthorityView,
  // Answers
  QuestionnaireStep.WorkingArea,
  QuestionnaireStep.MonthlyIncome,
  QuestionnaireStep.SavingsLevel,
  QuestionnaireStep.HouseProperty,
  QuestionnaireStep.HouseCost,
  QuestionnaireStep.DebtLevel,
  QuestionnaireStep.HealthInsurance,
  QuestionnaireStep.PassiveIncome,
]

export const QUESTIONNAIRE_STEP_FIELDS = {
  [QuestionnaireStep.Age]: ['profile', 'ageRange'],
  [QuestionnaireStep.Gender]: ['profile', 'gender'],
  [QuestionnaireStep.Ethnicity]: ['profile', 'ethnicity'],
  [QuestionnaireStep.Religion]: ['profile', 'religion'],
  [QuestionnaireStep.ImmigrationStatus]: ['profile', 'immigrationStatus'],
  [QuestionnaireStep.Education]: ['profile', 'education'],
  [QuestionnaireStep.PoliticalEconomicView]: ['profile', 'politicalEconomicView'],
  [QuestionnaireStep.PoliticalAuthorityView]: ['profile', 'politicalAuthorityView'],
  [QuestionnaireStep.WorkingArea]: ['answers', 'workingArea'],
  [QuestionnaireStep.MonthlyIncome]: ['answers', 'monthlyIncome'],
  [QuestionnaireStep.SavingsLevel]: ['answers', 'savingsLevel'],
  [QuestionnaireStep.HouseProperty]: ['answers', 'house', 'property'],
  [QuestionnaireStep.HouseCost]: ['answers', 'house', 'monthlyCost'],
  [QuestionnaireStep.DebtLevel]: ['answers', 'debtLevel'],
  [QuestionnaireStep.HealthInsurance]: ['answers', 'healthInsurance'],
  [QuestionnaireStep.InvestmentAreas]: ['answers', 'investments'],
  [QuestionnaireStep.PassiveIncome]: ['answers', 'passiveIncome'],
} satisfies Record<QuestionnaireStep, QuestionnaireField>
