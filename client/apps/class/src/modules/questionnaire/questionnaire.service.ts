import type { TrackerEventsDistribution, TrackerEventsDistributionType } from '../tracker/tracker.types'
import {
  COST_OF_LIVING_BY_COUNTRY,
  DEBT_LEVEL_MAP,
  DEFAULT_COST_OF_LIVING,
  DEFAULT_MEDICAL_DEBT_RISK,
  HOUSE_COST_MULTIPLIER,
  HOUSE_PROPERTY_NO_COST,
  JOB_DISPLACEMENT_RISK,
  MEDICAL_DEBT_RISK_BY_COUNTRY,
  MONTHLY_INCOME_MAP,
  PASSIVE_INCOME_MAP,
  QUESTIONNAIRE_MANDATORY_STEPS,
  QUESTIONNAIRE_STEP_FIELDS,
  QUESTIONNAIRE_STEPS,
  SAVINGS_LEVEL_MAP,
  UNIVERSAL_HEALTHCARE_COUNTRIES,
  US_MEDICAL_DEBT_RISK,
} from './questionnaire.const'
import {
  DebtLevel,
  FinancialSecurity,
  HealthcareDebtRisk,
  HealthInsurance,
  HouseProperty,
  HousePropertyCost,
  InvestmentArea,
  LivingQuality,
  MonthlyIncome,
  PassiveIncome,
  QuestionnaireStep,
  SavingsLevel,
  SocialClass,
  type ActiveQuestionnaire,
  type CostOfLiving,
  type Questionnaire,
  type QuestionnaireAnswers,
  type QuestionnaireResult,
  type QuestionnaireResultStats,
} from './questionnaire.types'

function getCostOfLiving(countryCode: string): CostOfLiving {
  return COST_OF_LIVING_BY_COUNTRY[countryCode] || DEFAULT_COST_OF_LIVING
}

export function getMonthlyIncomeValue(income: MonthlyIncome): number {
  return MONTHLY_INCOME_MAP[income]
}

function getSavingsValue(savings: SavingsLevel): number {
  return SAVINGS_LEVEL_MAP[savings]
}

function getDebtValue(debt: DebtLevel): number {
  return DEBT_LEVEL_MAP[debt]
}

function getPassiveIncomeValue(passive: PassiveIncome): number {
  return PASSIVE_INCOME_MAP[passive]
}

export function getCountryHasUniversalHealthcare(countryCode: string): boolean {
  return UNIVERSAL_HEALTHCARE_COUNTRIES.includes(countryCode)
}

export function calculateHealthcareDebtRiskPercentage(countryCode: string, insurance: HealthInsurance): number {
  if (getCountryHasUniversalHealthcare(countryCode)) {
    return 0
  }

  if (countryCode === 'US') {
    return US_MEDICAL_DEBT_RISK[insurance]
  }

  if (insurance === HealthInsurance.NoInsurance) {
    return 0.8
  }

  return MEDICAL_DEBT_RISK_BY_COUNTRY[countryCode] || DEFAULT_MEDICAL_DEBT_RISK
}

function getHousingCostPercentage(countryCode: string, cost: HousePropertyCost): number {
  return getCostOfLiving(countryCode).monthlyRent * HOUSE_COST_MULTIPLIER[cost]
}

function getHousingCost(countryCode: string, answers: QuestionnaireAnswers, costs: CostOfLiving): number {
  if (answers.house.property === HouseProperty.Renting || answers.house.property === HouseProperty.Mortgage) {
    return getHousingCostPercentage(countryCode, answers.house.monthlyCost)
  }
  if (answers.house.property === HouseProperty.Owned) {
    return costs.monthlyRent * 0.05
  }
  if (answers.house.property === HouseProperty.Free) {
    return 0
  }

  return 0
}

export function getMonthlyCost(countryCode: string, answers: QuestionnaireAnswers): number {
  const costs = getCostOfLiving(countryCode)
  const housingCost = getHousingCost(countryCode, answers, costs)

  return housingCost + costs.monthlyExpenses
}

export function getMonthlySavings(countryCode: string, answers: QuestionnaireAnswers): number {
  const costs = getMonthlyCost(countryCode, answers)
  const salaryIncome = getMonthlyIncomeValue(answers.monthlyIncome)
  const passiveIncome = getPassiveIncomeValue(answers.passiveIncome)
  const hasDebt = !!getDebtValue(answers.debtLevel)

  const result = salaryIncome + passiveIncome - costs
  if (!hasDebt) {
    return result
  }

  return result > 0 ? result * 0.8 : result * 1.2
}

const COST_MULTIPLIER = 1.5
export function calculateMonthsUntilHomeless(countryCode: string, answers: QuestionnaireAnswers): number {
  const passiveIncome = getPassiveIncomeValue(answers.passiveIncome)
  const savings = getSavingsValue(answers.savingsLevel)
  const debt = getDebtValue(answers.debtLevel)
  const monthlyCost = getMonthlyCost(countryCode, answers)
  const netSavings = Math.max(0, savings - debt)
  const monthlyShortfall = Math.max(0, monthlyCost * COST_MULTIPLIER - passiveIncome)

  // If passive income covers everything
  if (monthlyShortfall === 0) {
    return Infinity
  }

  const months = netSavings / monthlyShortfall

  return Math.max(0, Math.floor(months))
}

export function calculateFinancialSecurity(monthsUntilHomeless: number): FinancialSecurity {
  if (monthsUntilHomeless <= 0) {
    return FinancialSecurity.CannotStop
  }
  if (monthsUntilHomeless < 6) {
    return FinancialSecurity.LessThan6Months
  }
  if (monthsUntilHomeless < 12) {
    return FinancialSecurity.LessThan1Year
  }
  if (monthsUntilHomeless < 24) {
    return FinancialSecurity.LessThan2Years
  }
  if (monthsUntilHomeless < 12 * 5) {
    return FinancialSecurity.LessThan5Years
  }

  return FinancialSecurity.MoreThan5Years
}

function calculateHealthcareDebtRisk(percentage: number): HealthcareDebtRisk {
  if (percentage <= 0) {
    return HealthcareDebtRisk.NoRisk
  }
  if (percentage < 0.3) {
    return HealthcareDebtRisk.NoRisk
  }

  return HealthcareDebtRisk.HighRisk
}

export function calculateLivingQuality(countryCode: string, answers: QuestionnaireAnswers): LivingQuality {
  const savings = getMonthlySavings(countryCode, answers)
  const debt = getDebtValue(answers.debtLevel)
  const costOfLiving = getCostOfLiving(countryCode).monthlyExpenses

  const yearsToPayDebts = debt / savings / 12

  if (savings <= -costOfLiving) {
    return LivingQuality.Impossible
  }
  if (yearsToPayDebts > 20) {
    return LivingQuality.DeathByDebts
  }
  if (savings <= 0) {
    return LivingQuality.Survival
  }
  if (yearsToPayDebts > 3) {
    return LivingQuality.LiveForDebts
  }

  const savingsRate = savings / costOfLiving

  if (savingsRate < 0.5) {
    return LivingQuality.Struggling
  }
  if (savingsRate < 1) {
    return LivingQuality.GettingBy
  }
  if (savingsRate < 4) {
    return LivingQuality.Comfortable
  }
  if (savingsRate < 10) {
    return LivingQuality.Prosperous
  }

  return LivingQuality.Wealthy
}

export function calculateSocialClass(countryCode: string, answers: QuestionnaireAnswers): SocialClass {
  return calculateMonthsUntilHomeless(countryCode, answers) === Infinity
    ? SocialClass.OwnerClass
    : SocialClass.WorkingClass
}

export function calculateRiskOfLosingJob(answers: QuestionnaireAnswers): number {
  return JOB_DISPLACEMENT_RISK[answers.workingArea]
}

export function calculateIsParasite(answers: QuestionnaireAnswers): boolean {
  if (!answers.investments.includes(InvestmentArea.RealEstate)) {
    return false
  }

  const passiveIncome = getPassiveIncomeValue(answers.passiveIncome)

  return passiveIncome > 2_500
}

export function calculateQuestionnaireResult(
  countryCode: string,
  questionnaire: ActiveQuestionnaire,
): QuestionnaireResult | undefined {
  if (!getActiveQuestionnaireIsComplete(questionnaire)) {
    return
  }

  const monthsUntilHomeless = calculateMonthsUntilHomeless(countryCode, questionnaire.answers)
  const healthcareDebtRiskPercentage = calculateHealthcareDebtRiskPercentage(
    countryCode,
    questionnaire.answers.healthInsurance,
  )
  return {
    questionnaire,
    socialClass: calculateSocialClass(countryCode, questionnaire.answers),
    livingQuality: calculateLivingQuality(countryCode, questionnaire.answers),
    monthsUntilHomeless,
    financialSecurity: calculateFinancialSecurity(monthsUntilHomeless),
    losingJobRisk: calculateRiskOfLosingJob(questionnaire.answers),
    healthcareDebtRiskPercentage,
    healthcareDebtRisk: calculateHealthcareDebtRisk(healthcareDebtRiskPercentage),
    isParasite: calculateIsParasite(questionnaire.answers),
  }
}

export function getActiveQuestionnaireIsComplete(questionnaire: ActiveQuestionnaire): questionnaire is Questionnaire {
  return (
    !!questionnaire.answers.workingArea &&
    !!questionnaire.answers.monthlyIncome &&
    !!questionnaire.answers.savingsLevel &&
    !!questionnaire.answers.house &&
    !!questionnaire.answers.debtLevel &&
    !!questionnaire.answers.healthInsurance &&
    !!questionnaire.answers.investments &&
    !!questionnaire.answers.passiveIncome
  )
}

export function getQuestionnairePrevStep(questionnaire: ActiveQuestionnaire, index: number): number {
  if (index <= 0) {
    return 0
  }
  if (index >= QUESTIONNAIRE_STEPS.length) {
    return QUESTIONNAIRE_STEPS.length - 1
  }

  const prevStep = QUESTIONNAIRE_STEPS[index - 1]
  if (
    prevStep === QuestionnaireStep.HouseCost &&
    (!questionnaire.answers.house?.property || HOUSE_PROPERTY_NO_COST.includes(questionnaire.answers.house?.property))
  ) {
    return index - 2
  }

  return index - 1
}

export function getQuestionnaireNextStep(questionnaire: ActiveQuestionnaire, index: number): number {
  if (index >= QUESTIONNAIRE_STEPS.length) {
    return QUESTIONNAIRE_STEPS.length
  }

  const nextStep = QUESTIONNAIRE_STEPS[index + 1]
  if (
    nextStep === QuestionnaireStep.HouseCost &&
    (!questionnaire.answers.house?.property || HOUSE_PROPERTY_NO_COST.includes(questionnaire.answers.house?.property))
  ) {
    return index + 2
  }

  return index + 1
}

export function getQuestionnaireStepHasValue(questionnaire: ActiveQuestionnaire, step: QuestionnaireStep): boolean {
  if (!step) {
    return false
  }

  const [f1, f2, f3] = QUESTIONNAIRE_STEP_FIELDS[step]
  if (f1 === 'profile') {
    return !!questionnaire.profile[f2]
  }

  if (f1 === 'answers') {
    if (f2 !== 'house') {
      return !!questionnaire.answers[f2]
    }

    return !!questionnaire.answers.house?.[f3]
  }

  return false
}

export function getQuestionnaireCanContinue(questionnaire: ActiveQuestionnaire, step: QuestionnaireStep): boolean {
  if (getQuestionnaireStepHasValue(questionnaire, step)) {
    return true
  }

  return !QUESTIONNAIRE_MANDATORY_STEPS.includes(step)
}

export function getQuestionnaireProgress(stepIndex: number): number {
  return stepIndex / QUESTIONNAIRE_STEPS.length
}

export function getQuestionnaireResultStats(
  result: QuestionnaireResult,
  distribution: TrackerEventsDistribution,
): QuestionnaireResultStats {
  const map = distribution.types.reduce(
    (result, type) => {
      result[type.type] = type
      return result
    },
    {} as Record<string, TrackerEventsDistributionType>,
  )

  return {
    // Profile
    ageRange: map.Age?.names.find((it) => it.name === (result.questionnaire.profile.ageRange || 'skip')),
    gender: map.Gender?.names.find((it) => it.name === (result.questionnaire.profile.gender || 'skip')),
    ethnicity: map.Ethnicity?.names.find((it) => it.name === (result.questionnaire.profile.ethnicity || 'skip')),
    religion: map.Ethnicity?.names.find((it) => it.name === (result.questionnaire.profile.religion || 'skip')),
    education: map.Education?.names.find((it) => it.name === (result.questionnaire.profile.education || 'skip')),
    immigrationStatus: map.ImmigrationStatus?.names.find(
      (it) => it.name === (result.questionnaire.profile.immigrationStatus || 'skip'),
    ),
    politicalEconomicView: map.PoliticalEconomicView?.names.find(
      (it) => it.name === (result.questionnaire.profile.politicalEconomicView || 'skip'),
    ),
    politicalAuthorityView: map.PoliticalAuthorityView?.names.find(
      (it) => it.name === (result.questionnaire.profile.politicalAuthorityView || 'skip'),
    ),
    // Result
    socialClass: map.SocialClass?.names.find((it) => it.name === result.socialClass),
    livingQuality: map.LivingQuality?.names.find((it) => it.name === result.livingQuality),
    financialSecurity: map.FinancialSecurity?.names.find((it) => it.name === result.financialSecurity),
    losingJobRisk: map.LosingJobRisk?.names.find((it) => it.name === (result.losingJobRisk > 0.4 ? 'Yes' : 'No')),
    healthcareDebtRisk: map.HealthcareDebtRisk?.names.find((it) => it.name === result.healthcareDebtRisk),
    isParasite: map.IsParasite?.names.find((it) => it.name === (result.isParasite ? 'Yes' : 'No')),
  }
}
