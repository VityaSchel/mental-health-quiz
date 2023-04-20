import Emoji1 from '@/assets/slider/emoji/1.png'
import Emoji2 from '@/assets/slider/emoji/2.png'
import Emoji3 from '@/assets/slider/emoji/3.png'
import Emoji4 from '@/assets/slider/emoji/4.png'
import Emoji5 from '@/assets/slider/emoji/5.png'

import EmojiEgoism from '@/assets/answer-icons/screen7/egoism.png'
import EmojiUndetermination from '@/assets/answer-icons/screen7/undetermination.png'
import EmojiAgressive from '@/assets/answer-icons/screen7/agressive.png'
import EmojiIgnorance from '@/assets/answer-icons/screen7/ignorance.png'
import EmojiUncertainty from '@/assets/answer-icons/screen7/uncertainty.png'
import EmojiDependences from '@/assets/answer-icons/screen7/dependences.png'
import EmojiImpulsive from '@/assets/answer-icons/screen7/impulsive.png'
import EmojiLowSelfEsteem from '@/assets/answer-icons/screen7/low_self_esteem.png'

export type quizQuestion = {
  questionKey: string
  text: string
  subtitle: string
  textAccentColor: string
} & answerTypes

type answerTypes = {
  answerType: 'single_option'
  options: { key: string, label: string, caption: string }[]
} | {
  answerType: 'multi_options'
  options: { key: string, label: string, icon: import('next/image').StaticImageData }[]
} | {
  answerType: 'slider'
  options: { key: string, label: string, caption?: string, color?: string, icon: import('next/image').StaticImageData }[]
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
  {
    questionKey: 'anxiety',
    text: 'Насколько часто вы испытываете  <strong>тревогу</strong> или беспокойство?',
    subtitle: 'Выберите вариант который больше всего вам соответствует',
    textAccentColor: 'rgba(138, 222, 196, 1)',
    answerType: 'single_option',
    options: [
      { key: 'ALWAYS', label: 'Практические всегда 😪', caption: 'Постоянное тревожное состояние влияет на мою жизнь' },
      { key: 'OFTEN', label: 'Достаточно часто 😨', caption: 'В стрессовых ситуациях или когда сталкиваюсь с чем-то неожиданным' },
      { key: 'SOMETIMES', label: 'Иногда испытываю тревогу или беспокойство 🤔', caption: 'Но это не является постоянным состоянием для меня' }
    ]
  },
  {
    questionKey: 'self_reflection',
    text: 'Как часто вы практикуете <strong>саморефлексию</strong>?',
    subtitle: 'Часто ли применяете самоанализ?',
    textAccentColor: 'rgba(255, 177, 103, 1)',
    answerType: 'single_option',
    options: [
      { key: 'ALWAYS', label: 'Очень часто 🤯', caption: 'Я часто закапываюсь в саморефлексии и мне тяжело из неё выйти' },
      { key: 'PREFERENCE', label: 'Когда считаю нужным 😇', caption: 'Провожу самоанализ в ситуациях, когда вижу в этом необходимость' },
      { key: 'NECESSARY', label: 'Когда сталкиваюсь с какими-то проблемами 🔨', caption: 'Практикую саморефлексию, когда сталкиваюсь с проблемами' },
      { key: 'NEVER', label: 'Редко или никогда 🙏', caption: 'Мне чужда такая практика, потому что я живу по ощущениям' },
    ]
  },
  {
    questionKey: 'relatives_contact',
    text: 'Как вы сохраняете <strong>связь</strong> с близкими людьми?',
    subtitle: 'Выберите вариант который больше всего вам соответствует',
    textAccentColor: 'rgba(151, 219, 130, 1)',
    answerType: 'single_option',
    options: [
      { key: 'TOUGH', label: 'У меня очень напряженные отношения 💔', caption: 'Я часто конфликтую со своими близкими, поэтому наше общение очень напряженное' },
      { key: 'LACK', label: 'Я почти не общаюсь с близкими 🤫', caption: 'Связь со всеми близкими или с большинством была потеряна' },
      { key: 'GOOD', label: 'Я провожу время вместе с близкими людьми 🤗', caption: 'Чтобы укрепить нашу связь и создать приятные воспоминания' },
    ]
  },
  {
    questionKey: 'work_balance',
    text: 'Как вы оцениваете <strong>баланс</strong> между работой и личной жизнью?',
    subtitle: 'С помощью ползунка выберите вариант вам соответствует',
    textAccentColor: 'rgba(187, 160, 228, 1)',
    answerType: 'slider',
    options: [
      { key: 'ONLY_WORK', label: 'Только работа', caption: 'Много работы', color: 'rgba(255, 217, 182, 1)', icon: Emoji1 },
      { key: 'MUCH_WORK', label: 'Больше работы', icon: Emoji2 },
      { key: 'BALANCED', label: 'Идеальный баланс', caption: 'Идеально', color: 'rgba(205, 255, 182, 1)', icon: Emoji3 },
      { key: 'MUCH_WORRIES', label: 'Больше забот', icon: Emoji4 },
      { key: 'ONLY_WORRIES', label: 'Только бытовые хлопоты', caption: 'Много забот', color: 'rgba(255, 217, 182, 1)', icon: Emoji5 },
    ]
  },
  {
    questionKey: 'bad_sides',
    text: 'Какие отрицательные качества и слабые стороны вы видите <strong>в себе</strong>?',
    subtitle: 'Выберите один или несколько вариантов',
    textAccentColor: 'rgba(187, 160, 228, 1)',
    answerType: 'multi_options',
    options: [
      { key: 'EGOISM', label: 'Эгоизм', icon: EmojiEgoism },
      { key: 'UNDETERMINATION', label: 'Нерешительность', icon: EmojiUndetermination },
      { key: 'AGRESSIVE', label: 'Агрессивность', icon: EmojiAgressive },
      { key: 'IGNORANCE', label: 'Невежество', icon: EmojiIgnorance },
      { key: 'UNCERTAINTY', label: 'Неуверенность', icon: EmojiUncertainty },
      { key: 'DEPENDENCES', label: 'Зависливость', icon: EmojiDependences },
      { key: 'IMPULSIVE', label: 'Импульсивность', icon: EmojiImpulsive },
      { key: 'LOW_SELF_ESTEEM', label: 'Низкая самооценка', icon: EmojiLowSelfEsteem },
    ]
  },
]