export type quizQuestion = {
  questionKey: string
  text: string
  subtitle: string
  textAccentColor: string
  answerType: 'single_option'
  options: { key: string, label: string, caption: string } []
}

export const quizQuestions: quizQuestion[] = [
  {
    questionKey: 'stress_level',
    text: 'Как вы оцениваете уровень <strong>стресса</strong> в вашей повседневной жизни?',
    subtitle: 'Выберите вариант который больше всего вам соответствует',
    textAccentColor: 'rgba(138, 172, 251, 1)',
    answerType: 'single_option',
    options: [
      { key: 'HIGH', label: 'Очень сильный уровень стресса 😵', caption: 'Ищу помощи у специалиста, чтобы лучше справляться с ним' },
      { key: 'MEDIUM', label: 'Часто испытываю стресс 🥵', caption: 'Ищу помощи у специалиста, чтобы лучше справляться с ним' },
      { key: 'DEPENDS', label: 'Варьируется в зависимости от обстоятельств 🥶', caption: 'Но я стараюсь находить способы справиться с ним' },
      { key: 'LOW', label: 'Иногда испытываю стресс 😤', caption: 'Редко или периодически сталкиваюсь со стрессом' },
    ]
  },
  {
    questionKey: 'emotions_handle',
    text: 'Как вы справляетесь с <strong>эмоциями</strong>?',
    subtitle: 'Как вы боритесь с гневом, разочарование или грустью?',
    textAccentColor: 'rgba(151, 219, 130, 1)',
    answerType: 'single_option',
    options: [
      { key: 'HIGH', label: 'Переживаю внутри 😔', caption: 'Переживаю в себе и отстраняюсь от людей' },
      { key: 'MEDIUM', label: 'Ищу помощи у специалиста 👨‍⚕️', caption: 'Если негативные эмоции становятся слишком сильными' },
      { key: 'DEPENDS', label: 'Срывы на других 😡', caption: 'Срываюсь на коллег, друзей или семью' },
      { key: 'LOW', label: 'Переключаюсь 📖', caption: 'Переключаюсь на любимые занятия или спорт' },
    ]
  },
]