import { calculateLivingQuality, calculateMonthsUntilHomeless } from './questionnaire.service'
import {
  DebtLevel,
  HealthInsurance,
  HouseProperty,
  HousePropertyCost,
  MonthlyIncome,
  PassiveIncome,
  SavingsLevel,
  WorkingArea,
  type QuestionnaireAnswers,
} from './questionnaire.types'

describe('questionnaire service', () => {
  describe('calculateMonthsUntilHomeless', () => {
    test.each([
      // Worker
      ...['ES', 'US'].flatMap((country) =>
        Object.values(DebtLevel).flatMap((debtLevel) =>
          Object.values(SavingsLevel).flatMap((savingsLevel) =>
            Object.values(HousePropertyCost).flatMap((houseCost) => [
              {
                name: `[${country}] Worker with savings ${savingsLevel} - with debt ${debtLevel} - with ${houseCost} house`,
                input: {
                  workingArea: WorkingArea.Arts,
                  monthlyIncome: MonthlyIncome.Under500,
                  debtLevel,
                  passiveIncome: PassiveIncome.None,
                  healthInsurance: HealthInsurance.NoInsurance,
                  savingsLevel,
                  house: { property: HouseProperty.Renting, monthlyCost: houseCost },
                } as QuestionnaireAnswers,
                country,
              },
            ]),
          ),
        ),
      ),

      // Passive income cases
      ...['ES', 'US'].flatMap((country) =>
        Object.values(PassiveIncome).flatMap((passiveIncome) =>
          Object.values(HousePropertyCost).flatMap((houseCost) => [
            {
              name: `[${country}] Passive income (${passiveIncome}) - with ${houseCost} house`,
              input: {
                workingArea: WorkingArea.IDoNotWork,
                monthlyIncome: MonthlyIncome.Nothing,
                debtLevel: DebtLevel.NoDebt,
                passiveIncome,
                healthInsurance: HealthInsurance.NoInsurance,
                savingsLevel: SavingsLevel.NoSavings,
                house: { property: HouseProperty.Renting, monthlyCost: houseCost },
              } as QuestionnaireAnswers,
              country,
            },
          ]),
        ),
      ),
    ])('$name', ({ input, country }) => {
      const result = calculateMonthsUntilHomeless(country, input)
      expect(result).toMatchSnapshot()
    })
  })

  describe('calculateLivingQuality', () => {
    test.each([
      // Worker
      ...['ES', 'US'].flatMap((country) =>
        Object.values(MonthlyIncome).flatMap((monthlyIncome) =>
          Object.values(DebtLevel).flatMap((debtLevel) =>
            Object.values(HousePropertyCost).flatMap((houseCost) => [
              {
                name: `[${country}] Worker with monthly income ${monthlyIncome} - with debt ${debtLevel} - with ${houseCost} house`,
                input: {
                  workingArea: WorkingArea.Arts,
                  monthlyIncome,
                  debtLevel,
                  passiveIncome: PassiveIncome.None,
                  healthInsurance: HealthInsurance.NoInsurance,
                  savingsLevel: SavingsLevel.NoSavings,
                  house: { property: HouseProperty.Renting, monthlyCost: houseCost },
                } as QuestionnaireAnswers,
                country,
              },
            ]),
          ),
        ),
      ),

      // Passive income cases
      ...['ES', 'US'].flatMap((country) =>
        Object.values(PassiveIncome).flatMap((passiveIncome) =>
          Object.values(DebtLevel).flatMap((debtLevel) =>
            Object.values(HousePropertyCost).flatMap((houseCost) => [
              {
                name: `[${country}] Passive income (${passiveIncome}) - with debt ${debtLevel} - with ${houseCost} house`,
                input: {
                  workingArea: WorkingArea.IDoNotWork,
                  monthlyIncome: MonthlyIncome.Nothing,
                  debtLevel,
                  passiveIncome,
                  healthInsurance: HealthInsurance.NoInsurance,
                  savingsLevel: SavingsLevel.NoSavings,
                  house: { property: HouseProperty.Renting, monthlyCost: houseCost },
                } as QuestionnaireAnswers,
                country,
              },
            ]),
          ),
        ),
      ),
    ])('$name', ({ input, country }) => {
      const result = calculateLivingQuality(country, input)
      expect(result).toMatchSnapshot()
    })
  })
})
