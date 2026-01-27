import { batch, useComputed, useSignal, useSignalEffect } from '@preact/signals'
import { useEffect, type FC } from 'preact/compat'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import '../../assets/i18n'
import { QUESTIONNAIRE_AUTO_CONTINUE_STEPS, QUESTIONNAIRE_STEPS } from '../../modules/questionnaire/questionnaire.const'
import {
  calculateQuestionnaireResult,
  getQuestionnaireCanContinue,
  getQuestionnaireNextStep,
  getQuestionnaireResultStats,
  getQuestionnaireStepHasValue,
} from '../../modules/questionnaire/questionnaire.service'
import { QuestionnaireStep, type ActiveQuestionnaire } from '../../modules/questionnaire/questionnaire.types'
import { TrackerStoreContext, useTrackerStore } from '../../modules/tracker/tracker.store'
import type { TrackerEventContent, TrackerEventsDistributionTypeName } from '../../modules/tracker/tracker.types'
import { classes } from '../../util/style'
import { View } from '../View'
import { QuestionnaireButtons } from './Buttons'
import { QuestionnaireProgressBar } from './ProgressBar'
import { QuestionnaireResultView } from './Result/Result'
import { QuestionnaireAgeStepView } from './Step/Age'
import { QuestionnaireDebtLevelStepView } from './Step/DebtLevel'
import { QuestionnaireEducationStepView } from './Step/Education'
import { QuestionnaireEthnicityStepView } from './Step/Ethnicity'
import { QuestionnaireGenderStepView } from './Step/Gender'
import { QuestionnaireHealthInsuranceStepView } from './Step/HealthInsurance'
import { QuestionnaireHousePropertyCostStepView } from './Step/HouseCost'
import { QuestionnaireHousePropertyStepView } from './Step/HouseProperty'
import { QuestionnaireImmigrationStatusStepView } from './Step/ImmigrationStatus'
import { QuestionnaireInvestmentAreasStepView } from './Step/InvestmentAreas'
import { QuestionnaireMonthlyIncomeStepView } from './Step/MonthlyIncome'
import { QuestionnairePassiveIncomeStepView } from './Step/PassiveIncome'
import { QuestionnairePoliticalAuthorityViewStepView } from './Step/PoliticalAuthorityView'
import { QuestionnairePoliticalEconomicViewStepView } from './Step/PoliticalEconomicView'
import { QuestionnaireReligionStepView } from './Step/Religion'
import { QuestionnaireReviewView } from './Step/Review'
import { QuestionnaireSavingsLevelStepView } from './Step/SavingsLevel'
import { QuestionnaireWorkingAreaStepView } from './Step/WorkingArea'
import { QuestionnaireStepContainer } from './StepContainer'

export const QuestionnaireView: FC = () => {
  const { t } = useTranslation()
  const tracker = useTrackerStore()

  const isActive = useSignal(false)
  const visitedStepsMap = useSignal<Partial<Record<QuestionnaireStep, true>>>({})
  const isTransitioning = useSignal(false)
  const stepIndex = useSignal(0)
  const hasReviewed = useSignal(false)
  const questionnaire = useSignal<ActiveQuestionnaire>({
    profile: {
      // ageRange: AgeRange.Age18To24,
      // gender: Gender.Man,
      // ethnicity: Ethnicity.WhiteCaucasian,
      // religion: Religion.Agnostic,
      // education: Education.BachelorsDegree,
      // immigrationStatus: ImmigrationStatus.BornInCurrentCountry,
      // politicalEconomicView: PoliticalEconomicView.MixedEconomy,
      // politicalAuthorityView: PoliticalAuthorityView.BalancedGovernance,
    },
    answers: {
      // workingArea: WorkingArea.Engineering,
      // monthlyIncome: MonthlyIncome.Income3000To5000,
      // debtLevel: DebtLevel.NoDebt,
      // savingsLevel: SavingsLevel.Savings50000To100000,
      // healthInsurance: HealthInsurance.EmployerProvided,
      // investments: [InvestmentArea.Stocks, InvestmentArea.Cryptocurrency],
      // passiveIncome: PassiveIncome.Under500,
      // house: {
      //   property: HouseProperty.Renting,
      //   monthlyCost: HousePropertyCost.Normal,
      // },
    },
  })

  const countryCode = useComputed(() => tracker.identity.value?.country ?? 'ES')
  const hasValue = useComputed(() => getQuestionnaireStepHasValue(questionnaire.value, step.value))
  const canContinue = useComputed(() => getQuestionnaireCanContinue(questionnaire.value, step.value))
  const step = useComputed(() => QUESTIONNAIRE_STEPS[stepIndex.value])
  const result = useComputed(() => calculateQuestionnaireResult(countryCode.value, questionnaire.value))
  const showReviewStep = useComputed(
    () => !!visitedStepsMap.value[QuestionnaireStep.PassiveIncome] && !!result.value && !hasReviewed.value,
  )
  const showResult = useComputed(() => !!result.value && hasReviewed.value)
  const showSteps = useComputed(() => !showReviewStep.value && !showResult.value)
  const showButtons = useComputed(() => isActive.value && !showResult.value)
  const viewStats = useComputed(() =>
    tracker.eventsDistribution.value?.types
      .find((it) => it.type === 'View')
      ?.names.reduce(
        (result, name) => {
          result[name.name as 'home' | 'questionnaire' | 'result'] = name
          return result
        },
        {} as Record<'home' | 'questionnaire' | 'result', TrackerEventsDistributionTypeName>,
      ),
  )
  const resultStats = useComputed(() =>
    result.value && tracker.eventsDistribution.value
      ? getQuestionnaireResultStats(result.value, tracker.eventsDistribution.value)
      : undefined,
  )

  useSignalEffect(() => {
    if (!QUESTIONNAIRE_AUTO_CONTINUE_STEPS.includes(step.value)) {
      return
    }
    if (visitedStepsMap.peek()[step.value]) {
      return
    }
    if (!hasValue.value || !canContinue.value) {
      return
    }

    isTransitioning.value = true

    const timeout1 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 300)
    const timeout2 = setTimeout(() => {
      batch(() => {
        visitedStepsMap.value = { ...visitedStepsMap.peek(), [step.peek()]: true }
        isTransitioning.value = false
        stepIndex.value = getQuestionnaireNextStep(questionnaire.peek(), stepIndex.peek())
      })
    }, 600)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  })

  useSignalEffect(() => {
    if (tracker.isReady.value) {
      tracker.identify()
      tracker.sendEvents({ type: 'View', name: 'home' })
      tracker.getEventsGlobalDistribution()
    }
  })

  useSignalEffect(() => {
    if (!tracker.isReady.value || !isActive.value) {
      return
    }

    const r = result.peek()
    if (showResult.value && r) {
      const content: TrackerEventContent[] = [
        { type: 'View', name: 'result' },
        // Profile
        { type: 'Age', name: r.questionnaire.profile.ageRange ?? 'skip' },
        { type: 'Gender', name: r.questionnaire.profile.gender ?? 'skip' },
        { type: 'Ethnicity', name: r.questionnaire.profile.ethnicity ?? 'skip' },
        { type: 'Religion', name: r.questionnaire.profile.religion ?? 'skip' },
        { type: 'Education', name: r.questionnaire.profile.education ?? 'skip' },
        { type: 'ImmigrationStatus', name: r.questionnaire.profile.immigrationStatus ?? 'skip' },
        { type: 'PoliticalEconomicView', name: r.questionnaire.profile.politicalEconomicView ?? 'skip' },
        { type: 'PoliticalAuthorityView', name: r.questionnaire.profile.politicalAuthorityView ?? 'skip' },
        // Result
        { type: 'SocialClass', name: r.socialClass },
        { type: 'LivingQuality', name: r.livingQuality },
        { type: 'FinancialSecurity', name: r.financialSecurity },
        { type: 'LosingJobRisk', name: r.losingJobRisk > 0.4 ? 'Yes' : 'No' },
        { type: 'HealthcareDebtRisk', name: r.healthcareDebtRisk },
        { type: 'IsParasite', name: r.isParasite ? 'Yes' : 'No' },
      ]

      tracker.sendEvents(...content)
    } else {
      tracker.sendEvents({ type: 'View', name: 'questionnaire' })
    }
  })

  useSignalEffect(() => {
    if (!viewStats.value) {
      return
    }

    const percentageCompleted = ((viewStats.value.result.total / viewStats.value.questionnaire.total) * 100).toFixed(0)

    document.getElementById('views-container')?.append(
      t('welcome.views', {
        total: viewStats.value.questionnaire.total.toLocaleString(),
        completed: percentageCompleted,
      }),
    )
  })

  useEffect(() => {
    const handleStart = () => {
      isActive.value = true
    }

    window.addEventListener('start-questionnaire', handleStart)

    return () => {
      window.removeEventListener('start-questionnaire', handleStart)
    }
  }, [])

  return (
    <TrackerStoreContext.Provider value={tracker}>
      <Container className={classes({ transitioning: isTransitioning.value, active: isActive.value }, 'questionnaire')}>
        <QuestionnaireProgressBar isActive={showButtons} stepIndex={stepIndex} />

        <View isActive={isActive}>
          <View isActive={showSteps}>
            <div className="header">
              <h1>{t(`questionnaire.steps.${step.value}.title`)}</h1>
              <h2>{t(`questionnaire.steps.${step.value}.subtitle`)}</h2>
            </div>
          </View>

          <View isActive={showSteps}>
            <div className="steps">
              <QuestionnaireStepContainer step={step} activeStep="age">
                <QuestionnaireAgeStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="gender">
                <QuestionnaireGenderStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="ethnicity">
                <QuestionnaireEthnicityStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="religion">
                <QuestionnaireReligionStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="immigration-status">
                <QuestionnaireImmigrationStatusStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="education">
                <QuestionnaireEducationStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="political-economic-view">
                <QuestionnairePoliticalEconomicViewStepView
                  isDisabled={isTransitioning}
                  questionnaire={questionnaire}
                />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="political-authority-view">
                <QuestionnairePoliticalAuthorityViewStepView
                  isDisabled={isTransitioning}
                  questionnaire={questionnaire}
                />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="working-area">
                <QuestionnaireWorkingAreaStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="monthly-income">
                <QuestionnaireMonthlyIncomeStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="savings-level">
                <QuestionnaireSavingsLevelStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="house-property">
                <QuestionnaireHousePropertyStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="house-cost">
                <QuestionnaireHousePropertyCostStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="debt-level">
                <QuestionnaireDebtLevelStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="health-insurance">
                <QuestionnaireHealthInsuranceStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="investment-areas">
                <QuestionnaireInvestmentAreasStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>

              <QuestionnaireStepContainer step={step} activeStep="passive-income">
                <QuestionnairePassiveIncomeStepView isDisabled={isTransitioning} questionnaire={questionnaire} />
              </QuestionnaireStepContainer>
            </div>
          </View>

          <View isActive={showReviewStep}>
            <QuestionnaireReviewView />
          </View>

          <View isActive={showResult}>
            <QuestionnaireResultView result={result} stats={resultStats} />
          </View>
        </View>

        <QuestionnaireButtons
          isActive={showButtons}
          isDisabled={isTransitioning}
          questionnaire={questionnaire}
          stepIndex={stepIndex}
          step={step}
          showReviewStep={showReviewStep}
          hasReviewed={hasReviewed}
        />
      </Container>
    </TrackerStoreContext.Provider>
  )
}

const Container = styled.div`
  max-width: var(--block-width);
  margin: 0 auto;

  &.active .steps {
    padding: 12px;
    margin-top: 30px;
    margin-bottom: 100px;
  }

  &.transitioning {
    .steps .button:not(.active) {
      transition: all 0.4s ease;
      opacity: 0 !important;
    }
    .header {
      opacity: 0;
    }
  }

  .header {
    margin-top: 5em;
    padding: 0 12px;
    min-height: 10em;
    transition: opacity 0.4s ease-in-out;
    animation: sectionEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    h1 {
      font-size: 4em;
      font-weight: 900;
      color: #000;
      text-transform: uppercase;
      margin-bottom: 12px;
      line-height: 1;
      letter-spacing: -1px;
      text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.9);
    }

    h2 {
      font-size: 2em;
      font-weight: 700;
      color: #000;
      margin-bottom: 30px;
      line-height: 1.3;
      letter-spacing: 0.5px;
      text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
    }
  }

  .questionnaire-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translate3d(0, 120%, 0);
    padding: 24px;
    background: #ffeb3b;
    border-top: 4px solid #000;
    box-shadow: 0 -6px 0 #000;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    padding-bottom: 174px;

    &.active {
      transform: translate3d(0, 150px, 0);
    }

    .content {
      display: flex;
      margin: auto;
      align-items: center;
      justify-content: space-between;
      max-width: 100%;
      width: var(--block-width);
    }

    .button {
      flex: 1;
      border-radius: 12px;
    }
  }

  @keyframes sectionEnter {
    0% {
      opacity: 0;
      transform: translate3d(0, -40px, 0) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0px, 0) scale(1);
    }
  }

  .options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.5rem;
    margin-bottom: 2rem;
    animation: sectionEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    &.has-value {
      .option {
        filter: saturate(40%);
        opacity: 0.5;

        &.active {
          filter: saturate(120%);
          opacity: 1;
        }
      }
    }
  }

  .option {
    background: #fff;
    border: 4px solid #000;
    padding: 10px 24px;
    font-size: 2em;
    font-weight: 400;
    font-family: var(--font-body);
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 6px 6px 0 #000;
    transition: none;
    margin: 5px;
    position: relative;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

    &:hover:not(:disabled):not(.active) {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0 #000;
    }

    &:active:not(:disabled) {
      transform: translate(4px, 4px);
      box-shadow: none;
    }

    &.active {
      transform: translate(4px, 4px);
      box-shadow: none;
    }

    @media (min-width: 700px) {
      font-size: 1.5em;
    }
  }

  .option {
    /* Age Range Colors */
    &.age.age-under-18 {
      background: #ff6b9d;
      color: #fff;
    }

    &.age.age-18-24 {
      background: #ffeb3b;
      color: #000;
    }

    &.age.age-25-34 {
      background: #4ecdc4;
      color: #000;
    }

    &.age.age-35-44 {
      background: #95e1d3;
      color: #000;
    }

    &.age.age-45-54 {
      background: #c7ceea;
      color: #000;
    }

    &.age.age-55-64 {
      background: #b5b5b5;
      color: #000;
    }

    &.age.age-65-plus {
      background: #8b8b8b;
      color: #fff;
    }

    /* gender */

    &.gender.man {
      background: #4a90e2;
      color: #fff;
    }

    &.gender.woman {
      background: #ff6b9d;
      color: #fff;
    }

    &.gender.non-binary {
      background: #fff436;
      color: black;
    }

    &.gender.gender-queer {
      background: #b57edc;
      color: #fff;
    }

    &.gender.gender-fluid {
      background: linear-gradient(135deg, #ff6b9d 0%, #4a90e2 50%, #fcf434 100%);
      color: #000;
    }

    &.gender.agender {
      background: #c0c0c0;
      color: #000;
    }

    &.gender.bi-gender {
      background: linear-gradient(90deg, #ff6b9d 0%, #ff6b9d 50%, #4a90e2 50%, #4a90e2 100%);
      color: #fff;
    }

    &.gender.two-spirit {
      background: #ff9966;
      color: #000;
    }

    &.gender.trans-man {
      background: #5bcefa;
      color: #000;
    }

    &.gender.trans-woman {
      background: #f5a9b8;
      color: #000;
    }

    &.gender.questioning {
      background: #d4d4d4;
      color: #000;
    }

    &.gender.other {
      background: #95e1d3;
      color: #000;
    }

    /* Ethnicity styles */
    &.ethnicity.asian {
      background: #ff9966;
      color: #000;
    }

    &.ethnicity.black-african {
      background: #9b59b6;
      color: #fff;
    }

    &.ethnicity.hispanic-latinx {
      background: #4ecdc4;
      color: #000;
    }

    &.ethnicity.indigenous-native {
      background: #d4a574;
      color: #000;
    }

    &.ethnicity.middle-eastern-north-african {
      background: #e8b84d;
      color: #000;
    }

    &.ethnicity.pacific-islander {
      background: #5bcefa;
      color: #000;
    }

    &.ethnicity.white-caucasian {
      background: #f0f0f0;
      color: #000;
    }

    &.ethnicity.mixed-multiracial {
      background: linear-gradient(135deg, #ff9966 0%, #4ecdc4 25%, #9b59b6 50%, #e8b84d 75%, #5bcefa 100%);
      color: #000;
    }

    &.ethnicity.other {
      background: #b5b5b5;
      color: #000;
    }

    /* Religion */

    &.religion.agnostic {
      background: #b5b5b5;
      color: #000;
    }

    &.religion.atheist {
      background: #4a4a4a;
      color: #fff;
    }

    &.religion.buddhist {
      background: #ff9966;
      color: #000;
    }

    &.religion.christian {
      background: #4a90e2;
      color: #fff;
    }

    &.religion.hindu {
      background: #ff6b4a;
      color: #fff;
    }

    &.religion.jewish {
      background: #5bcefa;
      color: #000;
    }

    &.religion.muslim {
      background: #4ecdc4;
      color: #000;
    }

    &.religion.sikh {
      background: #ffeb3b;
      color: #000;
    }

    &.religion.spiritual {
      background: #b57edc;
      color: #fff;
    }

    &.religion.other {
      background: #95e1d3;
      color: #000;
    }

    /* Immigration status */

    &.immigration.born-in-current-country {
      background: #4a90e2;
      color: #fff;
    }

    &.immigration.naturalized-citizen {
      background: #5bcefa;
      color: #000;
    }

    &.immigration.permanent-resident {
      background: #4ecdc4;
      color: #000;
    }

    &.immigration.temporary-worker {
      background: #ffeb3b;
      color: #000;
    }

    &.immigration.refugee {
      background: #ff9966;
      color: #000;
    }

    &.immigration.undocumented {
      background: #b5b5b5;
      color: #000;
    }

    &.immigration.prefer-not-to-say {
      background: #d4d4d4;
      color: #000;
    }

    /* Education  */
    &.education.no-formal-education {
      background: #e0e0e0;
      color: #000;
    }

    &.education.primary-school {
      background: #ffeb3b;
      color: #000;
    }

    &.education.secondary-school {
      background: #ff9966;
      color: #000;
    }

    &.education.trade {
      background: #4ecdc4;
      color: #000;
    }

    &.education.some-university {
      background: #5bcefa;
      color: #000;
    }

    &.education.bachelors-degree {
      background: #4a90e2;
      color: #fff;
    }

    &.education.masters-degree {
      background: #9b59b6;
      color: #fff;
    }

    &.education.doctoral-degree {
      background: #2c3e50;
      color: #fff;
    }

    /* Political economic */
    &.political-economic-view.worker-control {
      background: #e74c3c;
      color: #fff;
    }

    &.political-economic-view.wealth-distribution {
      background: #ff6b6b;
      color: #fff;
    }

    &.political-economic-view.mixed-economy {
      background: #9b59b6;
      color: #fff;
    }

    &.political-economic-view.regulated-capitalism {
      background: #5dade2;
      color: #fff;
    }

    &.political-economic-view.capital-control {
      background: #3498db;
      color: #fff;
    }

    /* Political Authority */
    &.political-authority-view.community-self-organization {
      background: #9b59b6;
      color: #fff;
    }

    &.political-authority-view.local-autonomy {
      background: #b57edc;
      color: #fff;
    }

    &.political-authority-view.balanced-governance {
      background: #5dade2;
      color: #fff;
    }

    &.political-authority-view.central-coordination {
      background: #34495e;
      color: #fff;
    }

    &.political-authority-view.strong-central-authority {
      background: #1a252f;
      color: #fff;
    }

    /* Working area */

    &.working-area.administrative {
      background: #e0e0e0;
      color: #000;
    }

    &.working-area.agriculture {
      background: #8bc34a;
      color: #000;
    }

    &.working-area.arts {
      background: #ff6b9d;
      color: #fff;
    }

    &.working-area.construction {
      background: #ff9800;
      color: #fff;
    }

    &.working-area.customer-service {
      background: #4ecdc4;
      color: #000;
    }

    &.working-area.education {
      background: #4a90e2;
      color: #fff;
    }

    &.working-area.engineering {
      background: #2c3e50;
      color: #fff;
    }

    &.working-area.finance {
      background: #27ae60;
      color: #fff;
    }

    &.working-area.food-service {
      background: #e74c3c;
      color: #fff;
    }

    &.working-area.government {
      background: #34495e;
      color: #fff;
    }

    &.working-area.healthcare {
      background: #e74c3c;
      color: #fff;
    }

    &.working-area.human-resources {
      background: #9b59b6;
      color: #fff;
    }

    &.working-area.information-technology {
      background: #3498db;
      color: #fff;
    }

    &.working-area.legal {
      background: #2c3e50;
      color: #fff;
    }

    &.working-area.manufacturing {
      background: #95a5a6;
      color: #000;
    }

    &.working-area.marketing {
      background: #ff6b9d;
      color: #fff;
    }

    &.working-area.military {
      background: #2c3e50;
      color: #fff;
    }

    &.working-area.non-profit {
      background: #16a085;
      color: #fff;
    }

    &.working-area.real-estate {
      background: #d4a574;
      color: #000;
    }

    &.working-area.research {
      background: #9b59b6;
      color: #fff;
    }

    &.working-area.sales {
      background: #f39c12;
      color: #000;
    }

    &.working-area.security {
      background: #34495e;
      color: #fff;
    }

    &.working-area.social-work {
      background: #1abc9c;
      color: #000;
    }

    &.working-area.transportation {
      background: #3498db;
      color: #fff;
    }

    &.working-area.utilities {
      background: #f39c12;
      color: #000;
    }

    &.working-area.warehouse {
      background: #95a5a6;
      color: #000;
    }

    &.working-area.writing {
      background: #b57edc;
      color: #fff;
    }

    &.working-area.self-employed {
      background: #ffeb3b;
      color: #000;
    }

    &.working-area.freelance {
      background: #ff9966;
      color: #000;
    }

    &.working-area.student {
      background: #5bcefa;
      color: #000;
    }

    &.working-area.retired {
      background: #c0c0c0;
      color: #000;
    }

    &.working-area.unemployed {
      background: #d4d4d4;
      color: #000;
    }

    &.working-area.i-do-not-work {
      background: #b5b5b5;
      color: #000;
    }

    /* Monthly income */

    &.monthly-income.monthly-income-under-500 {
      background: #e0e0e0;
      color: #000;
    }

    &.monthly-income.monthly-income-500-1000 {
      background: #ffebee;
      color: #000;
    }

    &.monthly-income.monthly-income-1000-2000 {
      background: #ffcdd2;
      color: #000;
    }

    &.monthly-income.monthly-income-2000-3000 {
      background: #ef9a9a;
      color: #000;
    }

    &.monthly-income.monthly-income-3000-5000 {
      background: #e57373;
      color: #fff;
    }

    &.monthly-income.monthly-income-5000-7500 {
      background: #f06292;
      color: #fff;
    }

    &.monthly-income.monthly-income-7500-10000 {
      background: #ba68c8;
      color: #fff;
    }

    &.monthly-income.monthly-income-10000-15000 {
      background: #9575cd;
      color: #fff;
    }

    &.monthly-income.monthly-income-15000-20000 {
      background: #7986cb;
      color: #fff;
    }

    &.monthly-income.monthly-income-20000-plus {
      background: #4a90e2;
      color: #fff;
    }

    &.monthly-income.monthly-income-nothing {
      background: #b5b5b5;
      color: #000;
    }

    /* Savings level */
    &.savings.savings-no-savings {
      background: #e0e0e0;
      color: #000;
    }

    &.savings.savings-under-1000 {
      background: #ffebee;
      color: #000;
    }

    &.savings.savings-1000-5000 {
      background: #ffcdd2;
      color: #000;
    }

    &.savings.savings-5000-10000 {
      background: #ef9a9a;
      color: #000;
    }

    &.savings.savings-10000-25000 {
      background: #e57373;
      color: #fff;
    }

    &.savings.savings-25000-50000 {
      background: #f06292;
      color: #fff;
    }

    &.savings.savings-50000-100000 {
      background: #ba68c8;
      color: #fff;
    }

    &.savings.savings-100000-250000 {
      background: #9575cd;
      color: #fff;
    }

    &.savings.savings-250000-500000 {
      background: #7986cb;
      color: #fff;
    }

    &.savings.savings-500000-plus {
      background: #4a90e2;
      color: #fff;
    }

    /* House property */

    &.house-property.renting {
      background: #ff6b9d;
      color: #fff;
    }

    &.house-property.mortgage {
      background: #ff9966;
      color: #000;
    }

    &.house-property.owned {
      background: #4a90e2;
      color: #fff;
    }

    &.house-property.free {
      background: #4ecdc4;
      color: #000;
    }

    &.house-property.nothing {
      background: #d4d4d4;
      color: #000;
    }

    /* House cost */

    &.house-cost.none {
      background: #e0e0e0;
      color: #000;
    }

    &.house-cost.cheap {
      background: #4ecdc4;
      color: #000;
    }

    &.house-cost.normal {
      background: #4a90e2;
      color: #fff;
    }

    &.house-cost.expensive {
      background: #ff9966;
      color: #000;
    }

    &.house-cost.very-expensive {
      background: #e74c3c;
      color: #fff;
    }

    /* Debt level */

    &.debt-level.debt-level-no-debt {
      background: #4ecdc4;
      color: #000;
    }

    &.debt-level.debt-level-under-5000 {
      background: #e0f7fa;
      color: #000;
    }

    &.debt-level.debt-level-5000-10000 {
      background: #ffebee;
      color: #000;
    }

    &.debt-level.debt-level-10000-25000 {
      background: #ffcdd2;
      color: #000;
    }

    &.debt-level.debt-level-25000-50000 {
      background: #ef9a9a;
      color: #000;
    }

    &.debt-level.debt-level-50000-100000 {
      background: #e57373;
      color: #fff;
    }

    &.debt-level.debt-level-100000-plus {
      background: #c62828;
      color: #fff;
    }

    /* Health insurance */

    &.health-insurance.employer-provided {
      background: #4a90e2;
      color: #fff;
    }

    &.health-insurance.self-purchased {
      background: #ff9966;
      color: #000;
    }

    &.health-insurance.government-provided {
      background: #4ecdc4;
      color: #000;
    }

    &.health-insurance.no-insurance {
      background: #e74c3c;
      color: #fff;
    }

    /* Investment area */

    &.investment-area.stocks {
      background: #4a90e2;
      color: #fff;
    }

    &.investment-area.cryptocurrency {
      background: #ff9966;
      color: #000;
    }

    &.investment-area.bonds {
      background: #4ecdc4;
      color: #000;
    }

    &.investment-area.art {
      background: #ff6b9d;
      color: #fff;
    }

    &.investment-area.collectibles {
      background: #b57edc;
      color: #fff;
    }

    &.investment-area.antiques {
      background: #d4a574;
      color: #000;
    }

    &.investment-area.precious-metals {
      background: #f39c12;
      color: #000;
    }

    &.investment-area.mutual-funds {
      background: #27ae60;
      color: #fff;
    }

    &.investment-area.real-estate {
      background: #9b59b6;
      color: #fff;
    }

    &.investment-area.none {
      background: #d4d4d4;
      color: #000;
    }

    /* Passive income  */

    &.passive-income.passive-income-none {
      background: #e0e0e0;
      color: #000;
    }

    &.passive-income.passive-income-under-500 {
      background: #ffebee;
      color: #000;
    }

    &.passive-income.passive-income-500-1000 {
      background: #ffcdd2;
      color: #000;
    }

    &.passive-income.passive-income-1000-2500 {
      background: #ef9a9a;
      color: #000;
    }

    &.passive-income.passive-income-2500-5000 {
      background: #e57373;
      color: #fff;
    }

    &.passive-income.passive-income-5000-10000 {
      background: #ba68c8;
      color: #fff;
    }

    &.passive-income.passive-income-10000-plus {
      background: #4a90e2;
      color: #fff;
    }
  }

  .result {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    min-height: 100vh;
    animation: sectionEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    h1 {
      font-size: 5em;
      font-weight: 900;
      color: #000;
      text-transform: uppercase;
      margin-bottom: 12px;
      line-height: 1;
      letter-spacing: -1px;
      text-shadow: 0px 0px 3px rgba(255, 255, 255, 0.9);
    }

    h2 {
      font-size: 3em;
      font-weight: 700;
      color: #000;
      line-height: 1.3;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
    }

    h3 {
      font-size: 2em;
      font-weight: 500;
      color: #000;

      line-height: 1.3;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.9);
    }
  }
`
