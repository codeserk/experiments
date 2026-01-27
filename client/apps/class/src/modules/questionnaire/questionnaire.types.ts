// Profile

import type { TrackerEventsDistributionTypeName } from '../tracker/tracker.types'

export enum AgeRange {
  Under18 = 'under-18',
  Age18To24 = '18-24',
  Age25To34 = '25-34',
  Age35To44 = '35-44',
  Age45To54 = '45-54',
  Age55To64 = '55-64',
  Age65Plus = '65-plus',
}

export enum Gender {
  Man = 'man',
  Woman = 'woman',
  NonBinary = 'non-binary',
  GenderQueer = 'gender-queer',
  GenderFluid = 'gender-fluid',
  Agender = 'agender',
  BiGender = 'bi-gender',
  TwoSpirit = 'two-spirit',
  TransMan = 'trans-man',
  TransWoman = 'trans-woman',
  Questioning = 'questioning',
  Other = 'other',
}

export enum Ethnicity {
  Asian = 'asian',
  BlackAfrican = 'black-african',
  HispanicLatinx = 'hispanic-latinx',
  IndigenousNative = 'indigenous-native',
  MiddleEasternNorthAfrican = 'middle-eastern-north-african',
  PacificIslander = 'pacific-islander',
  WhiteCaucasian = 'white-caucasian',
  MixedMultiracial = 'mixed-multiracial',
  Other = 'other',
}

export enum Religion {
  Agnostic = 'agnostic',
  Atheist = 'atheist',
  Buddhist = 'buddhist',
  Christian = 'christian',
  Hindu = 'hindu',
  Jewish = 'jewish',
  Muslim = 'muslim',
  Sikh = 'sikh',
  Spiritual = 'spiritual',
  Other = 'other',
}

export enum Education {
  NoFormalEducation = 'no-formal-education',
  PrimarySchool = 'primary-school',
  SecondarySchool = 'secondary-school',
  Trade = 'trade',
  SomeUniversity = 'some-university',
  BachelorsDegree = 'bachelors-degree',
  MastersDegree = 'masters-degree',
  DoctoralDegree = 'doctoral-degree',
}

export enum ImmigrationStatus {
  BornInCurrentCountry = 'born-in-current-country',
  NaturalizedCitizen = 'naturalized-citizen',
  PermanentResident = 'permanent-resident',
  TemporaryWorker = 'temporary-worker',
  Refugee = 'refugee',
  Undocumented = 'undocumented',
  PreferNotToSay = 'prefer-not-to-say',
}

export enum PoliticalEconomicView {
  WorkerControl = 'worker-control',
  WealthDistribution = 'wealth-distribution',
  MixedEconomy = 'mixed-economy',
  RegulatedCapitalism = 'regulated-capitalism',
  CapitalControl = 'capital-control',
}

export enum PoliticalAuthorityView {
  CommunitySelfOrganization = 'community-self-organization',
  LocalAutonomy = 'local-autonomy',
  BalancedGovernance = 'balanced-governance',
  CentralCoordination = 'central-coordination',
  StrongCentralAuthority = 'strong-central-authority',
}

export interface QuestionnaireProfile {
  ageRange?: AgeRange
  gender?: Gender
  ethnicity?: Ethnicity
  religion?: Religion
  education?: Education
  immigrationStatus?: ImmigrationStatus
  politicalEconomicView?: PoliticalEconomicView
  politicalAuthorityView?: PoliticalAuthorityView
}

// Answers

export enum WorkingArea {
  Administrative = 'administrative',
  Agriculture = 'agriculture',
  Arts = 'arts',
  Construction = 'construction',
  CustomerService = 'customer-service',
  Education = 'education',
  Engineering = 'engineering',
  Finance = 'finance',
  FoodService = 'food-service',
  Government = 'government',
  Healthcare = 'healthcare',
  HumanResources = 'human-resources',
  InformationTechnology = 'information-technology',
  Legal = 'legal',
  Manufacturing = 'manufacturing',
  Marketing = 'marketing',
  Military = 'military',
  NonProfit = 'non-profit',
  RealEstate = 'real-estate',
  Research = 'research',
  Sales = 'sales',
  Security = 'security',
  SocialWork = 'social-work',
  Transportation = 'transportation',
  Utilities = 'utilities',
  Warehouse = 'warehouse',
  Writing = 'writing',
  SelfEmployed = 'self-employed',
  Freelance = 'freelance',
  Student = 'student',
  Retired = 'retired',
  Unemployed = 'unemployed',
  IDoNotWork = 'i-do-not-work',
}

export enum MonthlyIncome {
  Nothing = 'nothing',
  Under500 = 'under-500',
  Income500To1000 = '500-1000',
  Income1000To2000 = '1000-2000',
  Income2000To3000 = '2000-3000',
  Income3000To5000 = '3000-5000',
  Income5000To7500 = '5000-7500',
  Income7500To10000 = '7500-10000',
  Income10000To15000 = '10000-15000',
  Income15000To20000 = '15000-20000',
  Income20000Plus = '20000-plus',
}

export enum DebtLevel {
  NoDebt = 'no-debt',
  Under5000 = 'under-5000',
  Debt5000To10000 = '5000-10000',
  Debt10000To25000 = '10000-25000',
  Debt25000To50000 = '25000-50000',
  Debt50000To100000 = '50000-100000',
  Debt100000Plus = '100000-plus',
}

export enum SavingsLevel {
  NoSavings = 'no-savings',
  Under1000 = 'under-1000',
  Savings1000To5000 = '1000-5000',
  Savings5000To10000 = '5000-10000',
  Savings10000To25000 = '10000-25000',
  Savings25000To50000 = '25000-50000',
  Savings50000To100000 = '50000-100000',
  Savings100000To250000 = '100000-250000',
  Savings250000To500000 = '250000-500000',
  Savings500000Plus = '500000-plus',
}

export enum HealthInsurance {
  EmployerProvided = 'employer-provided',
  SelfPurchased = 'self-purchased',
  GovernmentProvided = 'government-provided',
  NoInsurance = 'no-insurance',
}

export enum InvestmentArea {
  Stocks = 'stocks',
  Cryptocurrency = 'cryptocurrency',
  Bonds = 'bonds',
  Art = 'art',
  Collectibles = 'collectibles',
  Antiques = 'antiques',
  PreciousMetals = 'precious-metals',
  MutualFunds = 'mutual-funds',
  RealEstate = 'real-estate',
  None = 'none',
}

export enum PassiveIncome {
  None = 'none',
  Under500 = 'under-500',
  Income500To1000 = '500-1000',
  Income1000To2500 = '1000-2500',
  Income2500To5000 = '2500-5000',
  Income5000Plus = '5000-10000',
  Income10000Plus = '10000-plus',
}

export enum HouseProperty {
  Renting = 'renting',
  Mortgage = 'mortgage',
  Owned = 'owned',
  Free = 'free',
  Nothing = 'nothing',
}

export interface CostOfLiving {
  readonly monthlyRent: number
  readonly monthlyExpenses: number
}

export enum HousePropertyCost {
  None = 'none',
  Cheap = 'cheap',
  Normal = 'normal',
  Expensive = 'expensive',
  VeryExpensive = 'very-expensive',
}

export interface QuestionnaireHouseSituation {
  readonly property: HouseProperty
  readonly monthlyCost: HousePropertyCost
}

export interface QuestionnaireAnswers {
  workingArea: WorkingArea
  monthlyIncome: MonthlyIncome
  debtLevel: DebtLevel
  house: QuestionnaireHouseSituation
  healthInsurance: HealthInsurance
  savingsLevel: SavingsLevel
  investments: InvestmentArea[]
  passiveIncome: PassiveIncome
}

//

export interface Questionnaire {
  readonly profile: QuestionnaireProfile
  readonly answers: QuestionnaireAnswers
}

export interface ActiveQuestionnaire {
  readonly profile: Partial<QuestionnaireProfile>
  readonly answers: Partial<QuestionnaireAnswers>
}

export enum SocialClass {
  WorkingClass = 'working-class',
  OwnerClass = 'owner-class',
}

export enum LivingQuality {
  Impossible = 'impossible',
  Survival = 'survival',
  LiveForDebts = 'live-for-debts',
  DeathByDebts = 'death-by-debts',
  Struggling = 'struggling',
  GettingBy = 'getting-by',
  Comfortable = 'comfortable',
  Prosperous = 'prosperous',
  Wealthy = 'wealthy',
}

export enum FinancialSecurity {
  CannotStop = 'cannot-stop',
  LessThan6Months = 'less-than-6-months',
  LessThan1Year = 'less-than-1-year',
  LessThan2Years = 'less-than-2-years',
  LessThan5Years = 'less-than-5-years',
  MoreThan5Years = 'more-than-5-years',
}

export enum HealthcareDebtRisk {
  NoRisk = 'no-risk',
  ModerateRisk = 'moderate-risk',
  HighRisk = 'high-risk',
}

export interface QuestionnaireResult {
  readonly questionnaire: Questionnaire
  readonly socialClass: SocialClass
  readonly livingQuality: LivingQuality
  readonly monthsUntilHomeless: number
  readonly financialSecurity: FinancialSecurity
  readonly losingJobRisk: number
  readonly healthcareDebtRiskPercentage: number
  readonly healthcareDebtRisk: HealthcareDebtRisk
  readonly isParasite: boolean
}

export enum QuestionnaireStep {
  // Profile
  Age = 'age',
  Gender = 'gender',
  Ethnicity = 'ethnicity',
  Religion = 'religion',
  ImmigrationStatus = 'immigration-status',
  Education = 'education',
  PoliticalEconomicView = 'political-economic-view',
  PoliticalAuthorityView = 'political-authority-view',
  // Answers
  WorkingArea = 'working-area',
  MonthlyIncome = 'monthly-income',
  SavingsLevel = 'savings-level',
  HouseProperty = 'house-property',
  HouseCost = 'house-cost',
  DebtLevel = 'debt-level',
  HealthInsurance = 'health-insurance',
  InvestmentAreas = 'investment-areas',
  PassiveIncome = 'passive-income',
}

export type QuestionnaireField =
  | ['profile', keyof QuestionnaireProfile]
  | ['answers', Exclude<keyof QuestionnaireAnswers, 'house'>]
  | ['answers', 'house', keyof QuestionnaireHouseSituation]

export type QuestionnaireResultStats = Record<
  keyof QuestionnaireProfile,
  TrackerEventsDistributionTypeName | undefined
> &
  Record<
    keyof Omit<QuestionnaireResult, 'questionnaire' | 'monthsUntilHomeless' | 'healthcareDebtRiskPercentage'>,
    TrackerEventsDistributionTypeName | undefined
  >
