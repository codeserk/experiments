import {
  AgeRange,
  QuestionnaireStep,
  Gender,
  Ethnicity,
  Religion,
  Education,
  ImmigrationStatus,
  PoliticalEconomicView,
  PoliticalAuthorityView,
  WorkingArea,
  MonthlyIncome,
  DebtLevel,
  SavingsLevel,
  HealthInsurance,
  InvestmentArea,
  PassiveIncome,
  HouseProperty,
  HousePropertyCost,
  SocialClass,
  LivingQuality,
  FinancialSecurity,
  HealthcareDebtRisk,
} from '../../../modules/questionnaire/questionnaire.types'
import type { enTranslations } from '../en'

export const esTranslations = {
  language: {
    en: 'Inglés',
    es: 'Castellano',
  },

  seo: {
    title: '¿Cuál es tu clase social?',
    description: 'Una encuesta rápida para entender tu lugar en la sociedad / un experimento de codeserk.es',
    keywords: 'cuestionario, experimento, clase social, trabajadores, inversión, política',
    image: '/logo-es.png',
  },

  welcome: {
    views: '{{ total }} participantes ({{ completed }}% completado).',
    title: '¿Cuál es tu clase social?',
    subtitle: 'Una encuesta rápida para entender tu lugar en la sociedad',
    start: 'Comenzar',
    aside: 'un experimento de ',
  },

  questionnaire: {
    steps: {
      [QuestionnaireStep.Age]: {
        title: '¿Cuántos años tienes?',
        subtitle: 'Selecciona tu rango de edad',
        values: {
          [AgeRange.Under18]: 'Menos de 18',
          [AgeRange.Age18To24]: '18-24',
          [AgeRange.Age25To34]: '25-34',
          [AgeRange.Age35To44]: '35-44',
          [AgeRange.Age45To54]: '45-54',
          [AgeRange.Age55To64]: '55-64',
          [AgeRange.Age65Plus]: '65+',
        },
      },
      [QuestionnaireStep.Gender]: {
        title: '¿Cuál es tu género?',
        subtitle: 'Selecciona la opción que mejor te describa',
        values: {
          [Gender.Man]: 'Hombre',
          [Gender.Woman]: 'Mujer',
          [Gender.NonBinary]: 'No Binario',
          [Gender.GenderQueer]: 'Género Queer',
          [Gender.GenderFluid]: 'Género Fluido',
          [Gender.Agender]: 'Agénero',
          [Gender.BiGender]: 'Bigénero',
          [Gender.TwoSpirit]: 'Dos Espíritus',
          [Gender.TransMan]: 'Hombre Trans',
          [Gender.TransWoman]: 'Mujer Trans',
          [Gender.Questioning]: 'Cuestionando',
          [Gender.Other]: 'Otro',
        },
      },
      [QuestionnaireStep.Ethnicity]: {
        title: '¿Cuál es tu etnia?',
        subtitle: 'Selecciona la opción que mejor te describa',
        values: {
          [Ethnicity.Asian]: 'Asiático',
          [Ethnicity.BlackAfrican]: 'Negro / Africano',
          [Ethnicity.HispanicLatinx]: 'Hispano / Latinx',
          [Ethnicity.IndigenousNative]: 'Indígena / Nativo',
          [Ethnicity.MiddleEasternNorthAfrican]: 'Medio Oriente / Norte de África',
          [Ethnicity.PacificIslander]: 'Isleño del Pacífico',
          [Ethnicity.WhiteCaucasian]: 'Blanco / Caucásico',
          [Ethnicity.MixedMultiracial]: 'Mixto / Multirracial',
          [Ethnicity.Other]: 'Otro',
        },
      },
      [QuestionnaireStep.Religion]: {
        title: '¿Cuál es tu religión?',
        subtitle: 'Selecciona tu creencia religiosa o espiritual',
        values: {
          [Religion.Agnostic]: 'Agnóstico',
          [Religion.Atheist]: 'Ateo',
          [Religion.Buddhist]: 'Budista',
          [Religion.Christian]: 'Cristiano',
          [Religion.Hindu]: 'Hindú',
          [Religion.Jewish]: 'Judío',
          [Religion.Muslim]: 'Musulmán',
          [Religion.Sikh]: 'Sij',
          [Religion.Spiritual]: 'Espiritual',
          [Religion.Other]: 'Otro',
        },
      },
      [QuestionnaireStep.Education]: {
        title: '¿Cuál es tu nivel educativo?',
        subtitle: 'Selecciona tu nivel más alto de educación',
        values: {
          [Education.NoFormalEducation]: 'Sin Educación Formal',
          [Education.PrimarySchool]: 'Primaria',
          [Education.SecondarySchool]: 'Secundaria',
          [Education.Trade]: 'FP / Formación Profesional',
          [Education.SomeUniversity]: 'Universidad Incompleta',
          [Education.BachelorsDegree]: 'Título Universitario',
          [Education.MastersDegree]: 'Máster',
          [Education.DoctoralDegree]: 'Doctorado',
        },
      },
      [QuestionnaireStep.ImmigrationStatus]: {
        title: '¿Cuál es tu estatus migratorio?',
        subtitle: 'Selecciona tu situación actual',
        values: {
          [ImmigrationStatus.BornInCurrentCountry]: 'Nacido en el País Actual',
          [ImmigrationStatus.NaturalizedCitizen]: 'Ciudadano Naturalizado',
          [ImmigrationStatus.PermanentResident]: 'Residente Permanente',
          [ImmigrationStatus.TemporaryWorker]: 'Trabajador Temporal',
          [ImmigrationStatus.Refugee]: 'Refugiado',
          [ImmigrationStatus.Undocumented]: 'Indocumentado',
          [ImmigrationStatus.PreferNotToSay]: 'Prefiero No Decir',
        },
      },

      [QuestionnaireStep.PoliticalEconomicView]: {
        title: 'Distribución del Poder Económico',
        subtitle: '¿Quién debería controlar la riqueza y la producción?',
        values: {
          [PoliticalEconomicView.WorkerControl]: {
            title: 'Control Obrero',
            description: 'Los trabajadores deberían controlar la riqueza y la producción',
          },
          [PoliticalEconomicView.WealthDistribution]: {
            title: 'Distribución de la Riqueza',
            description: 'La riqueza debería distribuirse más equitativamente, pero puede existir la propiedad privada',
          },
          [PoliticalEconomicView.MixedEconomy]: {
            title: 'Economía Mixta',
            description: 'Balance entre empresa privada y programas de bienestar social',
          },
          [PoliticalEconomicView.RegulatedCapitalism]: {
            title: 'Capitalismo Regulado',
            description: 'La propiedad privada impulsa la innovación, pero necesita regulación',
          },
          [PoliticalEconomicView.CapitalControl]: {
            title: 'Control del Capital',
            description: 'Los dueños del capital deberían controlar la riqueza y la producción',
          },
        },
      },
      [QuestionnaireStep.PoliticalAuthorityView]: {
        title: 'Nivel de Control Estatal',
        subtitle: '¿Cómo debería organizarse la sociedad?',
        values: {
          [PoliticalAuthorityView.CommunitySelfOrganization]: {
            title: 'Auto-organización Comunitaria',
            description: 'Las comunidades se auto-organizan sin intervención estatal',
          },
          [PoliticalAuthorityView.LocalAutonomy]: {
            title: 'Autonomía Local',
            description:
              'Las comunidades locales deberían tener autonomía significativa, con supervisión central mínima',
          },
          [PoliticalAuthorityView.BalancedGovernance]: {
            title: 'Gobernanza Equilibrada',
            description: 'Balance entre autonomía local y coordinación central',
          },
          [PoliticalAuthorityView.CentralCoordination]: {
            title: 'Coordinación Central',
            description: 'Se necesita autoridad central para decisiones clave, pero importa el input local',
          },
          [PoliticalAuthorityView.StrongCentralAuthority]: {
            title: 'Autoridad Central Fuerte',
            description: 'Se necesita una autoridad central fuerte para organizar la sociedad',
          },
        },
      },
      [QuestionnaireStep.WorkingArea]: {
        title: '¿Cuál es tu área de trabajo?',
        subtitle: 'Selecciona tu ocupación o situación actual',
        values: {
          [WorkingArea.Administrative]: 'Administrativo',
          [WorkingArea.Agriculture]: 'Agricultura',
          [WorkingArea.Arts]: 'Arte y Entretenimiento',
          [WorkingArea.Construction]: 'Construcción',
          [WorkingArea.CustomerService]: 'Atención al Cliente',
          [WorkingArea.Education]: 'Educación',
          [WorkingArea.Engineering]: 'Ingeniería',
          [WorkingArea.Finance]: 'Finanzas',
          [WorkingArea.FoodService]: 'Hostelería',
          [WorkingArea.Government]: 'Administración Pública',
          [WorkingArea.Healthcare]: 'Sanidad',
          [WorkingArea.HumanResources]: 'Recursos Humanos',
          [WorkingArea.InformationTechnology]: 'Informática',
          [WorkingArea.Legal]: 'Jurídico',
          [WorkingArea.Manufacturing]: 'Fabricación',
          [WorkingArea.Marketing]: 'Marketing',
          [WorkingArea.Military]: 'Militar',
          [WorkingArea.NonProfit]: 'ONG',
          [WorkingArea.RealEstate]: 'Sector Inmobiliario',
          [WorkingArea.Research]: 'Investigación',
          [WorkingArea.Sales]: 'Comercial',
          [WorkingArea.Security]: 'Seguridad',
          [WorkingArea.SocialWork]: 'Trabajo Social',
          [WorkingArea.Transportation]: 'Transporte',
          [WorkingArea.Utilities]: 'Suministros',
          [WorkingArea.Warehouse]: 'Almacén',
          [WorkingArea.Writing]: 'Redacción',
          [WorkingArea.SelfEmployed]: 'Autónomo',
          [WorkingArea.Freelance]: 'Freelance',
          [WorkingArea.Student]: 'Estudiante',
          [WorkingArea.Retired]: 'Jubilado',
          [WorkingArea.Unemployed]: 'Desempleado',
          [WorkingArea.IDoNotWork]: 'No Trabajo',
        },
      },
      [QuestionnaireStep.MonthlyIncome]: {
        title: '¿Cuál es tu ingreso mensual?',
        subtitle: 'Selecciona tu ingreso mensual neto promedio',
        values: {
          [MonthlyIncome.Under500]: 'Menos de 500€',
          [MonthlyIncome.Income500To1000]: '500€ - 1.000€',
          [MonthlyIncome.Income1000To2000]: '1.000€ - 2.000€',
          [MonthlyIncome.Income2000To3000]: '2.000€ - 3.000€',
          [MonthlyIncome.Income3000To5000]: '3.000€ - 5.000€',
          [MonthlyIncome.Income5000To7500]: '5.000€ - 7.500€',
          [MonthlyIncome.Income7500To10000]: '7.500€ - 10.000€',
          [MonthlyIncome.Income10000To15000]: '10.000€ - 15.000€',
          [MonthlyIncome.Income15000To20000]: '15.000€ - 20.000€',
          [MonthlyIncome.Income20000Plus]: 'Más de 20.000€',
          [MonthlyIncome.Nothing]: 'Sin Ingresos',
        },
      },
      [QuestionnaireStep.DebtLevel]: {
        title: '¿Cuál es tu deuda total?',
        subtitle: 'Selecciona tu nivel actual de deuda',
        values: {
          [DebtLevel.NoDebt]: 'Sin Deuda',
          [DebtLevel.Under5000]: 'Menos de 5.000€',
          [DebtLevel.Debt5000To10000]: '5.000€ - 10.000€',
          [DebtLevel.Debt10000To25000]: '10.000€ - 25.000€',
          [DebtLevel.Debt25000To50000]: '25.000€ - 50.000€',
          [DebtLevel.Debt50000To100000]: '50.000€ - 100.000€',
          [DebtLevel.Debt100000Plus]: 'Más de 100.000€',
        },
      },
      [QuestionnaireStep.SavingsLevel]: {
        title: '¿Cuál es tu nivel de ahorros?',
        subtitle: 'Selecciona tus ahorros actuales',
        values: {
          [SavingsLevel.NoSavings]: 'Sin Ahorros',
          [SavingsLevel.Under1000]: 'Menos de 1.000€',
          [SavingsLevel.Savings1000To5000]: '1.000€ - 5.000€',
          [SavingsLevel.Savings5000To10000]: '5.000€ - 10.000€',
          [SavingsLevel.Savings10000To25000]: '10.000€ - 25.000€',
          [SavingsLevel.Savings25000To50000]: '25.000€ - 50.000€',
          [SavingsLevel.Savings50000To100000]: '50.000€ - 100.000€',
          [SavingsLevel.Savings100000To250000]: '100.000€ - 250.000€',
          [SavingsLevel.Savings250000To500000]: '250.000€ - 500.000€',
          [SavingsLevel.Savings500000Plus]: 'Más de 500.000€',
        },
      },
      [QuestionnaireStep.HealthInsurance]: {
        title: '¿Cuál es tu seguro de salud?',
        subtitle: 'Selecciona tu tipo de seguro de salud',
        values: {
          [HealthInsurance.EmployerProvided]: 'Proporcionado por el Empleador',
          [HealthInsurance.SelfPurchased]: 'Comprado por Mí Mismo',
          [HealthInsurance.GovernmentProvided]: 'Proporcionado por el Gobierno',
          [HealthInsurance.NoInsurance]: 'Sin Seguro',
        },
      },
      [QuestionnaireStep.InvestmentAreas]: {
        title: '¿Dónde inviertes?',
        subtitle: 'Selecciona todas las áreas de inversión que apliquen',
        values: {
          [InvestmentArea.Stocks]: 'Acciones',
          [InvestmentArea.Cryptocurrency]: 'Criptomonedas',
          [InvestmentArea.Bonds]: 'Bonos',
          [InvestmentArea.Art]: 'Arte',
          [InvestmentArea.Collectibles]: 'Coleccionables',
          [InvestmentArea.Antiques]: 'Antigüedades',
          [InvestmentArea.PreciousMetals]: 'Metales Preciosos',
          [InvestmentArea.MutualFunds]: 'Fondos de Inversión',
          [InvestmentArea.RealEstate]: 'Sector Inmobiliario',
          [InvestmentArea.None]: 'Ninguno',
        },
      },
      [QuestionnaireStep.PassiveIncome]: {
        title: '¿Cuál es tu ingreso pasivo?',
        subtitle: 'Selecciona tu ingreso pasivo mensual neto',
        values: {
          [PassiveIncome.None]: 'Ninguno',
          [PassiveIncome.Under500]: 'Menos de 500€',
          [PassiveIncome.Income500To1000]: '500€ - 1.000€',
          [PassiveIncome.Income1000To2500]: '1.000€ - 2.500€',
          [PassiveIncome.Income2500To5000]: '2.500€ - 5.000€',
          [PassiveIncome.Income5000Plus]: '5.000€ - 10.000€',
          [PassiveIncome.Income10000Plus]: 'Más de 10.000€',
        },
      },
      [QuestionnaireStep.HouseProperty]: {
        title: '¿Cuál es tu situación de vivienda?',
        subtitle: 'Selecciona tu situación actual de vivienda',
        values: {
          [HouseProperty.Renting]: 'Alquilando',
          [HouseProperty.Mortgage]: 'Hipoteca',
          [HouseProperty.Owned]: 'Propiedad',
          [HouseProperty.Free]: 'Viviendo Sin Pagar Alquiler',
          [HouseProperty.Nothing]: 'Sin Vivienda',
        },
      },
      [QuestionnaireStep.HouseCost]: {
        title: '¿Cómo de cara es tu vivienda?',
        subtitle: 'Selecciona el nivel de coste de tu vivienda',
        values: {
          [HousePropertyCost.None]: 'Nada',
          [HousePropertyCost.Cheap]: 'Barata',
          [HousePropertyCost.Normal]: 'Normal',
          [HousePropertyCost.Expensive]: 'Cara',
          [HousePropertyCost.VeryExpensive]: 'Muy Cara',
        },
      },
    },

    buttons: {
      prev: 'Atrás',
      next: 'Continuar',
      skip: 'Saltar',
      finish: 'Finalizar',
    },

    review: {
      title: '¿Listo para Ver tus Resultados?',
      subtitle: 'Tenemos todo lo necesario para determinar tu clase social.',
      subtitle2: 'Sin pago requerido. Sin datos personales recopilados. Completamente anónimo.',
    },

    result: {
      likeOthers: 'Como otras <total>{{ total }}</total> personas (<percentage>{{ percentage }}%</percentage>)',
      socialClass: {
        [SocialClass.WorkingClass]: {
          title: 'Eres... <br/><red>Clase Trabajadora</red>',
          subtitle:
            'Intercambias tu tiempo y trabajo por ingresos.<br/>Tu sustento depende de seguir trabajando, y el valor que creas beneficia principalmente a quienes poseen el negocio. <br/>Eres el motor de la economía <em>pero rara vez quien la dirige.</em>',
        },
        [SocialClass.OwnerClass]: {
          title: 'Eres... <blue>Clase Propietaria</blue>',
          subtitle:
            'Generas ingresos sin tu trabajo diario.<br/><strong>Te beneficias del trabajo de otros sin contribuir nada tú mismo.</strong><br/>Tu seguridad financiera nunca depende de un salario.<br/>Das forma a la economía y estableces los términos bajo los cuales otros participan en ella.',
        },
      },

      livingQuality: {
        [LivingQuality.Impossible]: {
          title: 'Tu situación es <red>imposible</red>',
          subtitle:
            'No puedes cubrir necesidades básicas y la supervivencia misma es incierta. <strong>Cada día es una batalla solo para existir.</strong><br/>Este sistema no está diseñado para ti. <em>No hay un camino claro adelante, solo el peso de sobrevivir otro día.</em>',
        },
        [LivingQuality.Survival]: {
          title: 'Estás <red>sobreviviendo</red>',
          subtitle:
            'Cubres necesidades básicas pero no te queda nada. <strong>Cualquier gasto inesperado podría destruir todo lo que tienes.</strong><br/>Vives día a día sin red de seguridad. <em>La estabilidad se siente como un sueño distante que no puedes permitirte perseguir.</em>',
        },
        [LivingQuality.LiveForDebts]: {
          title: '<orange>Vives para tus deudas</orange>',
          subtitle:
            'Tus ingresos desaparecen en pagos antes de que los veas. <strong>Cada nómina ya está gastada en lo que debes.</strong><br/>Trabajas para pagar deudas, no para construir una vida. <em>El ciclo nunca termina, y el progreso parece imposible sin importar cuánto te esfuerces.</em>',
        },
        [LivingQuality.DeathByDebts]: {
          title: 'Tus deudas te están <red>matando</red>',
          subtitle:
            'El peso es aplastante y crece más rápido de lo que puedes pagar. <strong>Trabajas sin cesar pero retrocedes cada mes.</strong><br/>Los intereses se acumulan mientras luchas por cubrir mínimos. <em>El sistema diseñó esta trampa, y escapar parece imposible desde dentro.</em>',
        },
        [LivingQuality.Struggling]: {
          title: 'Estás <orange>luchando</orange>',
          subtitle:
            'Trabajas constantemente pero apenas mantienes la cabeza fuera del agua. Sueñas con ganar más para escapar de esto.<br/><strong>Pero quienes ganan más están igual de atrapados.</strong> También intercambian tiempo por supervivencia. Disfrutan algo de lujo, sí, pero <em>solo después de pagar su deuda de tiempo.</em>',
        },
        [LivingQuality.GettingBy]: {
          title: 'Estás <yellow>tirando para adelante</yellow>',
          subtitle:
            'Cubres tus necesidades pero no puedes construir mucho para el futuro. <em>Intercambias tu tiempo por supervivencia, siempre a unos pasos de caer.</em><br/><strong>Los que ganan más enfrentan la misma trampa, solo con cadenas más bonitas.</strong>',
        },
        [LivingQuality.Comfortable]: {
          title: 'Vives <green>cómodamente</green>',
          subtitle:
            'Tienes estabilidad y algunos ahorros, pero <strong>aún no puedes dejar de trabajar.</strong><br/>Estás más cerca de los trabajadores en apuros de lo que crees, tu tiempo tampoco es tuyo. <em>¿Dormir hasta tarde para tener tiempo para ti?</em> Recuerda que todos estamos en la misma trampa.',
        },
        [LivingQuality.Prosperous]: {
          title: 'Eres <blue>próspero</blue>',
          subtitle:
            'Tienes riqueza y seguridad, pero tus días los consume el trabajo. <em>¿Cuándo disfrutas realmente de lo que has ganado?</em><br/>Tienes más en común con quienes ganan menos de lo que te gustaría admitir. <strong>¿Cambiarías algo de riqueza por menos estrés? ¿Por más tiempo que sea realmente tuyo?</strong>',
        },
        [LivingQuality.Wealthy]: {
          title: 'Eres <green>rico</green>',
          subtitle:
            'Gran trabajador, has llegado a la cima. <strong>Eres uno de los pocos elegidos, has logrado verdadera riqueza.</strong><br/>Pero tu tiempo aún pertenece al trabajo. <em>Estás atrapado como todos los demás, intercambiando vida por dinero.</em> No mires por encima del hombro a los trabajadores que ganan menos: <strong>estás en la misma jaula, solo con un candado dorado.</strong>',
        },
      },
      financialSecurity: {
        [FinancialSecurity.CannotStop]: {
          title: '<red>No puedes dejar</red> de trabajar',
          subtitle:
            'Perder incluso una nómina significa desastre. <strong>No tienes red de seguridad.</strong><br/><em>Cada día de trabajo es supervivencia, no hay colchón, no hay plan de respaldo.</em>',
        },
        [FinancialSecurity.LessThan6Months]: {
          title: 'Puedes sobrevivir <orange>unos meses</orange>',
          subtitle:
            'Tienes un pequeño colchón, pero no durará mucho. <strong>Cualquier crisis prolongada lo agotaría rápido.</strong><br/><em>Has construido algo, pero es frágil, un mal giro y desaparece.</em>',
        },
        [FinancialSecurity.LessThan1Year]: {
          title: 'Puedes durar <yellow>menos de un año</yellow> sin trabajar',
          subtitle:
            'Tienes respiro real por una vez. <strong>Podrías manejar un revés serio.</strong><br/><em>Pero incluso esta seguridad expira, aún estás contando meses hasta que el dinero se acabe.</em>',
        },
        [FinancialSecurity.LessThan2Years]: {
          title: 'Tienes <blue>{{ years }} años de libertad</blue>',
          subtitle:
            'Has construido seguridad genuina que la mayoría nunca ve. <strong>Podrías dejar tu trabajo y sobrevivir un tiempo.</strong><br/><em>Pero solo estás agotando ahorros, eventualmente debes volver al trabajo o perder todo.</em>',
        },
        [FinancialSecurity.LessThan5Years]: {
          title: 'Puedes durar <green>{{ years }} años</green> sin trabajar',
          subtitle:
            'Has logrado lo que pocos trabajadores logran. <strong>Tienes años de libertad por delante.</strong><br/><em>Pero el reloj avanza. Tus ahorros se reducen diariamente, y un día se acabarán, ¿y entonces qué?</em>',
        },
        [FinancialSecurity.MoreThan5Years]: {
          title: 'Podrías sobrevivir <green>más de {{ years }} años</green>',
          subtitle:
            'Tienes seguridad extraordinaria, un lujo que casi ningún trabajador logra. <strong>Puedes realmente decidir dejar tu trabajo y disfrutar libertad por un tiempo.</strong><br/><em>Sin embargo, aún estás quemando lo que ganaste. Eventualmente, el dinero termina, y enfrentarás la misma elección que todos.</em><br/>De vuelta al trabajo.',
        },
      },
      losingJobRisk: {
        title: 'Tienes un <red>{{ percentage }}% de probabilidad</red> de perder tu trabajo',
        subtitle:
          'Tu puesto está en riesgo, la IA podría tomar tu lugar. <strong>La tecnología avanza mientras trabajas, volviendo obsoletas tus habilidades.</strong><br/><em>Construiste tu carrera sobre experiencia que las máquinas están aprendiendo a replicar. Las probabilidades de reemplazo son aterradoramente reales.</em>',
      },
      healthcareDebtRisk: {
        [HealthcareDebtRisk.NoRisk]: {
          title: '<green>No tienes riesgo</green> de deuda médica',
          subtitle:
            'Tu país proporciona seguridad social que te protege. <strong>Las emergencias médicas no destruirán tus finanzas.</strong><br/><em>Este es un privilegio que muchos trabajadores en el mundo no tienen, nunca lo des por sentado.</em>',
        },
        [HealthcareDebtRisk.ModerateRisk]: {
          title: 'Tienes un <yellow>{{ percentage }}% de riesgo</yellow> de deuda médica',
          subtitle:
            'Una enfermedad seria podría agotar tus ahorros. <strong>Estás a una emergencia médica de la crisis financiera.</strong><br/><em>Trabajas para construir seguridad, pero una factura de hospital podría destruirlo todo en días.</em><br>Exige una seguridad social fuerte para tu país.',
        },
        [HealthcareDebtRisk.HighRisk]: {
          title: 'Tienes un <red>{{ percentage }}% de riesgo</red> de deuda médica',
          subtitle:
            'Una emergencia médica probablemente te dejará en bancarrota. <strong>Tu salud es una bomba de tiempo financiera.</strong><br/><em>Enfermarte no solo amenaza tu cuerpo, amenaza todo por lo que has trabajado.</em><br/> Exige una seguridad social fuerte para tu país.',
        },
      },
      parasite: {
        title: 'Eres un <red>parásito</red>',
        subtitle:
          'Te alimentas del refugio, la necesidad humana más básica. <strong>Las viviendas se convierten en oro en tus manos mientras familias duermen en incertidumbre.</strong><br/><em>Cada propiedad que reclamas es una puerta que cierras a alguien más. Construyes riqueza haciendo costosa la supervivencia.</em><br/>Una vivienda debería ser un derecho, no tu inversión. <strong>Pero elegiste el beneficio sobre las personas.</strong>',
      },
      worker: {
        title: 'No eres <blue>tan diferente</blue> después de todo',
        subtitle:
          'A pesar de todas tus diferencias con el resto, compartes una verdad fundamental con <em>el 99% de la humanidad</em>.<br/><strong>Debes trabajar para sobrevivir.</strong>',
      },
      scrollForMore: 'Desplázate para ver más...',
      summary: {
        title: 'Gracias por tu valioso tiempo',
        subtitle: 'No estás solo. <strong>Juntos, tenemos el poder de exigir algo mejor.</strong>',

        [`title_${SocialClass.OwnerClass}`]: 'Disfrútalo <em>mientras dure</em>',
        [`subtitle_${SocialClass.OwnerClass}`]:
          'Todo imperio construido a costa de otros <strong>eventualmente cae.</strong>',

        rate: {
          title: '¿Estás de acuerdo con los resultados?',
          like: '👍',
          dislike: '👎',
        },
        share: {
          cta: 'Compartir',
          title: '¿Cuál es tu clase social?',
          text: 'Acabo de descubrir mi clase social. ¡Descubre la tuya!',
          linkCopied: '¡Enlace copiado al portapapeles!',
        },
      },
    },
  },
} satisfies typeof enTranslations
