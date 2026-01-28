import {
  AgeRange,
  DebtLevel,
  Education,
  Ethnicity,
  FinancialSecurity,
  Gender,
  HealthcareDebtRisk,
  HealthInsurance,
  HouseProperty,
  HousePropertyCost,
  ImmigrationStatus,
  InvestmentArea,
  LivingQuality,
  MonthlyIncome,
  PassiveIncome,
  PoliticalAuthorityView,
  PoliticalEconomicView,
  QuestionnaireStep,
  Religion,
  SavingsLevel,
  SocialClass,
  WorkingArea,
} from '../../../modules/questionnaire/questionnaire.types'

export const enTranslations = {
  language: {
    en: 'English',
    es: 'Spanish',
  },

  welcome: {
    views: '{{ total }} participants ({{ completed }}% completed).',
    title: "What's Your Social Class?",
    subtitle: 'A quick survey to understand your place in society',
    start: 'Start Now',
    aside: 'an experiment by ',
  },

  questionnaire: {
    steps: {
      [QuestionnaireStep.Age]: {
        title: 'How old are you?',
        subtitle: 'Select your age range',
        values: {
          [AgeRange.Under18]: 'Under 18',
          [AgeRange.Age18To24]: '18-24',
          [AgeRange.Age25To34]: '25-34',
          [AgeRange.Age35To44]: '35-44',
          [AgeRange.Age45To54]: '45-54',
          [AgeRange.Age55To64]: '55-64',
          [AgeRange.Age65Plus]: '65+',
        },
      },
      [QuestionnaireStep.Gender]: {
        title: 'What is your gender?',
        subtitle: 'Select the option that best describes you',
        values: {
          [Gender.Man]: 'Man',
          [Gender.Woman]: 'Woman',
          [Gender.NonBinary]: 'Non-Binary',
          [Gender.GenderQueer]: 'Genderqueer',
          [Gender.GenderFluid]: 'Gender Fluid',
          [Gender.Agender]: 'Agender',
          [Gender.BiGender]: 'Bigender',
          [Gender.TwoSpirit]: 'Two-Spirit',
          [Gender.TransMan]: 'Trans Man',
          [Gender.TransWoman]: 'Trans Woman',
          [Gender.Questioning]: 'Questioning',
          [Gender.Other]: 'Other',
        },
      },
      [QuestionnaireStep.Ethnicity]: {
        title: 'What is your ethnicity?',
        subtitle: 'Select the option that best describes you',
        values: {
          [Ethnicity.Asian]: 'Asian',
          [Ethnicity.BlackAfrican]: 'Black / African',
          [Ethnicity.HispanicLatinx]: 'Hispanic / Latinx',
          [Ethnicity.IndigenousNative]: 'Indigenous / Native',
          [Ethnicity.MiddleEasternNorthAfrican]: 'Middle Eastern / North African',
          [Ethnicity.PacificIslander]: 'Pacific Islander',
          [Ethnicity.WhiteCaucasian]: 'White / Caucasian',
          [Ethnicity.MixedMultiracial]: 'Mixed / Multiracial',
          [Ethnicity.Other]: 'Other',
        },
      },
      [QuestionnaireStep.Religion]: {
        title: 'What is your religion?',
        subtitle: 'Select your religious or spiritual belief',
        values: {
          [Religion.Agnostic]: 'Agnostic',
          [Religion.Atheist]: 'Atheist',
          [Religion.Buddhist]: 'Buddhist',
          [Religion.Christian]: 'Christian',
          [Religion.Hindu]: 'Hindu',
          [Religion.Jewish]: 'Jewish',
          [Religion.Muslim]: 'Muslim',
          [Religion.Sikh]: 'Sikh',
          [Religion.Spiritual]: 'Spiritual',
          [Religion.Other]: 'Other',
        },
      },
      [QuestionnaireStep.Education]: {
        title: 'What is your education level?',
        subtitle: 'Select your highest level of education',
        values: {
          [Education.NoFormalEducation]: 'No Formal Education',
          [Education.PrimarySchool]: 'Primary School',
          [Education.SecondarySchool]: 'Secondary School',
          [Education.Trade]: 'Trade/Vocational',
          [Education.SomeUniversity]: 'Some University',
          [Education.BachelorsDegree]: "Bachelor's Degree",
          [Education.MastersDegree]: "Master's Degree",
          [Education.DoctoralDegree]: 'Doctoral Degree',
        },
      },
      [QuestionnaireStep.ImmigrationStatus]: {
        title: 'What is your immigration status?',
        subtitle: 'Select your current status',
        values: {
          [ImmigrationStatus.BornInCurrentCountry]: 'Born in Current Country',
          [ImmigrationStatus.NaturalizedCitizen]: 'Naturalized Citizen',
          [ImmigrationStatus.PermanentResident]: 'Permanent Resident',
          [ImmigrationStatus.TemporaryWorker]: 'Temporary Worker',
          [ImmigrationStatus.Refugee]: 'Refugee',
          [ImmigrationStatus.Undocumented]: 'Undocumented',
          [ImmigrationStatus.PreferNotToSay]: 'Prefer Not to Say',
        },
      },

      [QuestionnaireStep.PoliticalEconomicView]: {
        title: 'Economic Power Distribution',
        subtitle: 'Who should control wealth and production?',
        values: {
          [PoliticalEconomicView.WorkerControl]: {
            title: 'Worker Control',
            description: 'Workers should control wealth and production',
          },
          [PoliticalEconomicView.WealthDistribution]: {
            title: 'Wealth Distribution',
            description: 'Wealth should be more evenly distributed, but private ownership can exist',
          },
          [PoliticalEconomicView.MixedEconomy]: {
            title: 'Mixed Economy',
            description: 'Balance between private enterprise and social welfare programs',
          },
          [PoliticalEconomicView.RegulatedCapitalism]: {
            title: 'Regulated Capitalism',
            description: 'Private ownership drives innovation, but needs some regulation',
          },
          [PoliticalEconomicView.CapitalControl]: {
            title: 'Capital Control',
            description: 'Capital owners should control wealth and production',
          },
        },
      },
      [QuestionnaireStep.PoliticalAuthorityView]: {
        title: 'State Control Level',
        subtitle: 'How should society be organized?',
        values: {
          [PoliticalAuthorityView.CommunitySelfOrganization]: {
            title: 'Community Self-Organization',
            description: 'Communities self-organize without state intervention',
          },
          [PoliticalAuthorityView.LocalAutonomy]: {
            title: 'Local Autonomy',
            description: 'Local communities should have significant autonomy, with minimal central oversight',
          },
          [PoliticalAuthorityView.BalancedGovernance]: {
            title: 'Balanced Governance',
            description: 'Balance between local autonomy and central coordination',
          },
          [PoliticalAuthorityView.CentralCoordination]: {
            title: 'Central Coordination',
            description: 'Central authority needed for key decisions, but local input matters',
          },
          [PoliticalAuthorityView.StrongCentralAuthority]: {
            title: 'Strong Central Authority',
            description: 'Strong central authority needed to organize society',
          },
        },
      },
      [QuestionnaireStep.WorkingArea]: {
        title: 'What is your working area?',
        subtitle: 'Select your current occupation or status',
        values: {
          [WorkingArea.Administrative]: 'Administrative',
          [WorkingArea.Agriculture]: 'Agriculture',
          [WorkingArea.Arts]: 'Arts & Entertainment',
          [WorkingArea.Construction]: 'Construction',
          [WorkingArea.CustomerService]: 'Customer Service',
          [WorkingArea.Education]: 'Education',
          [WorkingArea.Engineering]: 'Engineering',
          [WorkingArea.Finance]: 'Finance',
          [WorkingArea.FoodService]: 'Food Service',
          [WorkingArea.Government]: 'Government',
          [WorkingArea.Healthcare]: 'Healthcare',
          [WorkingArea.HumanResources]: 'Human Resources',
          [WorkingArea.InformationTechnology]: 'Information Technology',
          [WorkingArea.Legal]: 'Legal',
          [WorkingArea.Manufacturing]: 'Manufacturing',
          [WorkingArea.Marketing]: 'Marketing',
          [WorkingArea.Military]: 'Military',
          [WorkingArea.NonProfit]: 'Non-Profit',
          [WorkingArea.RealEstate]: 'Real Estate',
          [WorkingArea.Research]: 'Research',
          [WorkingArea.Sales]: 'Sales',
          [WorkingArea.Security]: 'Security',
          [WorkingArea.SocialWork]: 'Social Work',
          [WorkingArea.Transportation]: 'Transportation',
          [WorkingArea.Utilities]: 'Utilities',
          [WorkingArea.Warehouse]: 'Warehouse',
          [WorkingArea.Writing]: 'Writing',
          [WorkingArea.SelfEmployed]: 'Self-Employed',
          [WorkingArea.Freelance]: 'Freelance',
          [WorkingArea.Student]: 'Student',
          [WorkingArea.Retired]: 'Retired',
          [WorkingArea.Unemployed]: 'Unemployed',
          [WorkingArea.IDoNotWork]: 'I Do Not Work',
        },
      },
      [QuestionnaireStep.MonthlyIncome]: {
        title: 'What is your monthly income?',
        subtitle: 'Select your average monthly net income',
        values: {
          [MonthlyIncome.Under500]: 'Under €500',
          [MonthlyIncome.Income500To1000]: '€500 - €1,000',
          [MonthlyIncome.Income1000To2000]: '€1,000 - €2,000',
          [MonthlyIncome.Income2000To3000]: '€2,000 - €3,000',
          [MonthlyIncome.Income3000To5000]: '€3,000 - €5,000',
          [MonthlyIncome.Income5000To7500]: '€5,000 - €7,500',
          [MonthlyIncome.Income7500To10000]: '€7,500 - €10,000',
          [MonthlyIncome.Income10000To15000]: '€10,000 - €15,000',
          [MonthlyIncome.Income15000To20000]: '€15,000 - €20,000',
          [MonthlyIncome.Income20000Plus]: '€20,000+',
          [MonthlyIncome.Nothing]: 'No Income',
        },
      },
      [QuestionnaireStep.DebtLevel]: {
        title: 'What is your total debt?',
        subtitle: 'Select your current debt level',
        values: {
          [DebtLevel.NoDebt]: 'No Debt',
          [DebtLevel.Under5000]: 'Under €5,000',
          [DebtLevel.Debt5000To10000]: '€5,000 - €10,000',
          [DebtLevel.Debt10000To25000]: '€10,000 - €25,000',
          [DebtLevel.Debt25000To50000]: '€25,000 - €50,000',
          [DebtLevel.Debt50000To100000]: '€50,000 - €100,000',
          [DebtLevel.Debt100000Plus]: '€100,000+',
        },
      },
      [QuestionnaireStep.SavingsLevel]: {
        title: 'What is your savings level?',
        subtitle: 'Select your current savings',
        values: {
          [SavingsLevel.NoSavings]: 'No Savings',
          [SavingsLevel.Under1000]: 'Under €1,000',
          [SavingsLevel.Savings1000To5000]: '€1,000 - €5,000',
          [SavingsLevel.Savings5000To10000]: '€5,000 - €10,000',
          [SavingsLevel.Savings10000To25000]: '€10,000 - €25,000',
          [SavingsLevel.Savings25000To50000]: '€25,000 - €50,000',
          [SavingsLevel.Savings50000To100000]: '€50,000 - €100,000',
          [SavingsLevel.Savings100000To250000]: '€100,000 - €250,000',
          [SavingsLevel.Savings250000To500000]: '€250,000 - €500,000',
          [SavingsLevel.Savings500000Plus]: '€500,000+',
        },
      },
      [QuestionnaireStep.HealthInsurance]: {
        title: 'What is your health insurance?',
        subtitle: 'Select your health insurance type',
        values: {
          [HealthInsurance.EmployerProvided]: 'Employer Provided',
          [HealthInsurance.SelfPurchased]: 'Self-Purchased',
          [HealthInsurance.GovernmentProvided]: 'Government Provided',
          [HealthInsurance.NoInsurance]: 'No Insurance',
        },
      },
      [QuestionnaireStep.InvestmentAreas]: {
        title: 'Where do you invest?',
        subtitle: 'Select all investment areas that apply',
        values: {
          [InvestmentArea.Stocks]: 'Stocks',
          [InvestmentArea.Cryptocurrency]: 'Cryptocurrency',
          [InvestmentArea.Bonds]: 'Bonds',
          [InvestmentArea.Art]: 'Art',
          [InvestmentArea.Collectibles]: 'Collectibles',
          [InvestmentArea.Antiques]: 'Antiques',
          [InvestmentArea.PreciousMetals]: 'Precious Metals',
          [InvestmentArea.MutualFunds]: 'Mutual Funds',
          [InvestmentArea.RealEstate]: 'Real Estate',
          [InvestmentArea.None]: 'None',
        },
      },
      [QuestionnaireStep.PassiveIncome]: {
        title: 'What is your passive income?',
        subtitle: 'Select your monthly passive net income',
        values: {
          [PassiveIncome.None]: 'None',
          [PassiveIncome.Under500]: 'Under €500',
          [PassiveIncome.Income500To1000]: '€500 - €1,000',
          [PassiveIncome.Income1000To2500]: '€1,000 - €2,500',
          [PassiveIncome.Income2500To5000]: '€2,500 - €5,000',
          [PassiveIncome.Income5000Plus]: '€5,000 - €10,000',
          [PassiveIncome.Income10000Plus]: '€10,000+',
        },
      },
      [QuestionnaireStep.HouseProperty]: {
        title: 'What is your housing situation?',
        subtitle: 'Select your current housing status',
        values: {
          [HouseProperty.Renting]: 'Renting',
          [HouseProperty.Mortgage]: 'Mortgage',
          [HouseProperty.Owned]: 'Owned',
          [HouseProperty.Free]: 'Living Rent-Free',
          [HouseProperty.Nothing]: 'No Housing',
        },
      },
      [QuestionnaireStep.HouseCost]: {
        title: 'How expensive is your housing?',
        subtitle: 'Select the cost level of your housing',
        values: {
          [HousePropertyCost.None]: 'None',
          [HousePropertyCost.Cheap]: 'Cheap',
          [HousePropertyCost.Normal]: 'Normal',
          [HousePropertyCost.Expensive]: 'Expensive',
          [HousePropertyCost.VeryExpensive]: 'Very Expensive',
        },
      },
    },

    buttons: {
      prev: 'Back',
      next: 'Continue',
      skip: 'Skip',
      finish: 'Finish',
    },

    review: {
      title: 'Ready to See Your Results?',
      subtitle: 'We have everything we need to determine your social class.',
      subtitle2: 'No payment required. No personal data collected. Completely anonymous.',
    },

    result: {
      likeOthers: 'Like other <total>{{ total }}</total> people (<percentage>{{ percentage }}%</percentage>)',
      socialClass: {
        [SocialClass.WorkingClass]: {
          title: 'You are... <br/><red>Working Class</red>',
          subtitle:
            'You exchange your time and labor for income.<br/>Your livelihood depends on continuing to work, and the value you create primarily benefits those who own the business. <br/>You are the engine of the economy <em>yet rarely the one steering it.</em>',
        },
        [SocialClass.OwnerClass]: {
          title: 'You are... <blue>Owner Class</blue>',
          subtitle:
            "You generate income without your daily labor.<br/><strong>You benefit from others' work while contributing nothing yourself.</strong><br/>Your financial security never depends on a paycheck.<br/>You shape the economy and set the terms by which others participate in it.",
        },
      },

      livingQuality: {
        [LivingQuality.Impossible]: {
          title: 'Your situation is <red>impossible</red>',
          subtitle:
            'You cannot meet basic needs and survival itself is uncertain. <strong>Every day is a battle just to exist.</strong><br/>This system is not designed for you. <em>There is no clear path forward, only the weight of surviving another day.</em>',
        },
        [LivingQuality.Survival]: {
          title: 'You are <red>surviving</red>',
          subtitle:
            'You meet basic needs but have nothing left over. <strong>Any unexpected expense could destroy everything you have.</strong><br/>You live day to day with no safety net. <em>Stability feels like a distant dream you cannot afford to chase.</em>',
        },
        [LivingQuality.LiveForDebts]: {
          title: 'You <orange>live for your debts</orange>',
          subtitle:
            'Your income disappears into payments before you see it. <strong>Every paycheck is already spent on what you owe.</strong><br/>You work to service debt, not to build a life. <em>The cycle never ends, and progress feels impossible no matter how hard you try.</em>',
        },
        [LivingQuality.DeathByDebts]: {
          title: 'Your debts are <red>killing you</red>',
          subtitle:
            'The weight is crushing and growing faster than you can pay. <strong>You work endlessly yet fall further behind every month.</strong><br/>Interest piles up while you struggle to cover minimums. <em>The system designed this trap, and escape feels impossible from inside it.</em>',
        },
        [LivingQuality.Struggling]: {
          title: 'You are <orange>struggling</orange>',
          subtitle:
            'You work constantly but barely keep your head above water. You dream of earning more to escape this.<br/><strong>But those who earn more are just as trapped.</strong> They trade time for survival too. They enjoy some luxury, yes, but <em>only after paying their time debt.</em>',
        },
        [LivingQuality.GettingBy]: {
          title: 'You are <yellow>getting by</yellow>',
          subtitle:
            'You cover your needs but cannot build much for the future. <em>You trade your time for survival, always a few steps from falling.</em><br/><strong>Higher earners face the same trap, just with nicer chains.</strong>',
        },
        [LivingQuality.Comfortable]: {
          title: 'You live <green>comfortably</green>',
          subtitle:
            "You have stability and some savings, but <strong>you still cannot stop working.</strong><br/>You're closer to struggling workers than you think, your time isn't yours either. <em>Sleeping late to get some time for yourself?</em> Remember that we are all in the same trap.",
        },
        [LivingQuality.Prosperous]: {
          title: 'You are <blue>prosperous</blue>',
          subtitle:
            "You have wealth and security, yet your days are consumed by work. <em>When do you actually enjoy what you've earned?</em><br/>You have more in common with those earning less than you'd like to admit. <strong>Would you trade some wealth for less stress? For more time that's truly yours?</strong>",
        },
        [LivingQuality.Wealthy]: {
          title: 'You are <green>wealthy</green>',
          subtitle:
            "Mighty worker, you've climbed to the top. <strong>You are one of the chosen few, you've achieved true wealth.</strong><br/>But your time still belongs to work. <em>You're trapped just like everyone else, trading life for money.</em>  Don't look down on workers earning less: <strong>you're in the same cage, just with a golden lock.</strong>",
        },
      },
      financialSecurity: {
        [FinancialSecurity.CannotStop]: {
          title: 'You <red>cannot stop</red> working',
          subtitle:
            'Missing even one paycheck means disaster. <strong>You have no safety net.</strong><br/><em>Every day of work is survival, there is no cushion, no backup plan.</em>',
        },
        [FinancialSecurity.LessThan6Months]: {
          title: 'You can survive <orange>a few months</orange>',
          subtitle:
            "You have a small buffer, but it won't last long. <strong>Any extended crisis would drain it fast.</strong><br/><em>You've built something, but it's fragile, one bad turn and it's gone.</em>",
        },
        [FinancialSecurity.LessThan1Year]: {
          title: 'You can last <yellow>less than a year</yellow> without working',
          subtitle:
            "You have real breathing room for once. <strong>You could handle a serious setback.</strong><br/><em>But even this safety expires, you're still counting months until the money runs out.</em>",
        },
        [FinancialSecurity.LessThan2Years]: {
          title: 'You have <blue>{{ years }} years of freedom</blue>',
          subtitle:
            "You've built genuine security most workers never see. <strong>You could walk away from your job and survive for a while.</strong><br/><em>But you're just draining savings, eventually, you must return to work or lose everything.</em>",
        },
        [FinancialSecurity.LessThan5Years]: {
          title: 'You can last <green>{{ years }} years</green> without working',
          subtitle:
            "You've achieved what few workers ever do. <strong>You have years of freedom ahead.</strong><br/><em>But the clock is ticking. Your savings shrink daily, and one day they'll be gone, then what?</em>",
        },
        [FinancialSecurity.MoreThan5Years]: {
          title: 'You could survive <green>more than {{ years }} years</green>',
          subtitle:
            "You have extraordinary security, a luxury almost no worker achieves. <strong>You can truly decide to quit your job and enjoy freedom for some time.</strong><br/><em>Yet you're still burning through what you earned. Eventually, the money ends, and you'll face the same choice everyone does.</em><br/>Back to work.",
        },
      },
      losingJobRisk: {
        title: 'You have a <red>{{ percentage }}% chance</red> of losing your job',
        subtitle:
          'Your position is at risk, AI could take your place. <strong>Technology advances while you work, making your skills obsolete.</strong><br/><em>You built your career on expertise that machines are learning to replicate. The odds of replacement are frighteningly real.</em>',
      },
      healthcareDebtRisk: {
        [HealthcareDebtRisk.NoRisk]: {
          title: 'You have <green>no healthcare debt risk</green>',
          subtitle:
            "Your country provides social security that protects you. <strong>Medical emergencies won't destroy your finances.</strong><br/><em>This is a privilege many workers around the world don't have, never take it for granted.</em>",
        },
        [HealthcareDebtRisk.ModerateRisk]: {
          title: 'You have a <yellow>{{ percentage }}% risk</yellow> of healthcare debt',
          subtitle:
            "One serious illness could drain your savings. <strong>You're one medical emergency away from financial crisis.</strong><br/><em>You work to build security, but a hospital bill could destroy it all in days.</em><br>Demand a strong social security for your country.",
        },
        [HealthcareDebtRisk.HighRisk]: {
          title: 'You have a <red>{{ percentage }}% risk</red> of healthcare debt',
          subtitle:
            "A medical emergency will likely bankrupt you. <strong>Your health is a financial time bomb.</strong><br/><em>Getting sick doesn't just threaten your body, it threatens everything you've worked for.</em><br/> Demand a strong social security for your country.",
        },
      },
      parasite: {
        title: 'You are a <red>parasite</red>',
        subtitle:
          'You feast on shelter, the most basic human need. <strong>Homes become gold in your hands while families sleep in uncertainty.</strong><br/><em>Each property you claim is a door you close on someone else. You build wealth by making survival expensive.</em><br/>A home should be a right, not your investment. <strong>But you chose profit over people.</strong>',
      },
      worker: {
        title: "You're <blue>not so different</blue> after all",
        subtitle:
          'Despite all your differences with the rest, you share one fundamental truth with <em>99% of humanity</em>.<br/><strong>You must work to survive.</strong>',
      },
      scrollForMore: 'Scroll for more...',
      summary: {
        title: 'Thanks for your precious time',
        subtitle: 'You are not alone. <strong>Together, we have the power to demand better.</strong>',

        [`title_${SocialClass.OwnerClass}`]: 'Enjoy it <em>while it lasts</em>',
        [`subtitle_${SocialClass.OwnerClass}`]:
          'Every empire built on the backs of others <strong>eventually falls.</strong>',

        rate: {
          title: 'Do you agree with the results?',
          like: 'Agree',
          dislike: 'Disagree',
        },
        share: {
          cta: 'Share',
          title: "What's Your Social Class?",
          text: 'I just discovered my social class. Find out yours!',
          linkCopied: 'Link copied to clipboard!',
        },
      },
    },
  },
}
