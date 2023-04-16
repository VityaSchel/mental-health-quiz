export type quizQuestion = {
  questionKey: string
  text: string
  textAccentColor: string
  answerType: 'single_option'
  options: { key: string, label: string, caption: string } []
}

export const quizQuestions: quizQuestion[] = [
  {
    questionKey: 'stress_level',
    text: 'Как вы оцениваете уровень <strong>стресса</strong> в вашей повседневной жизни?',
    textAccentColor: 'rgba(138, 172, 251, 1)',
    answerType: 'single_option',
    options: [
      { key: 'HIGH', label: 'Очень сильный уровень стресса 😵', caption: 'Ищу помощи у специалиста, чтобы лучше справляться с ним' },
      { key: 'MEDIUM', label: 'Часто испытываю стресс  ', caption: 'Ищу помощи у специалиста, чтобы лучше справляться с ним' },
      { key: 'DEPENDS', label: 'Варьируется в зависимости от обстоятельств 🥶', caption: 'Но я стараюсь находить способы справиться с ним' },
      { key: 'LOW', label: 'Иногда испытываю стресс 😤', caption: 'Редко или периодически сталкиваюсь со стрессом' },
    ]
  }
]