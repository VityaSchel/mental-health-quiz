export type QuizValues = {
  stress_level: 'HIGH' | 'MEDIUM' | 'DEPENDS' | 'LOW'
  emotions_handle: 'HIGH' | 'MEDIUM' | 'DEPENDS' | 'LOW' 
  anxiety: 'ALWAYS' | 'OFTEN' | 'SOMETIMES'
  self_reflection: 'ALWAYS' | 'PREFERENCE' | 'NECESSARY' | 'NEVER'
  relatives_contact: 'TOUGH' | 'LACK' | 'GOOD'
  work_balance: 'ONLY_WORK' | 'MUCH_WORK' | 'BALANCED' | 'MUCH_WORRIES' | 'ONLY_WORRIES',
  bad_sides: ('EGOISM' | 'UNDETERMINATION' | 'AGRESSIVE' | 'IGNORANCE' | 'UNCERTAINTY' | 'DEPENDENCES' | 'IMPULSIVE' | 'LOW_SELF_ESTEEM')[]
  mental_help: ('SPORT' | 'MEDITATION' | 'HOBBY' | 'RELATIVES_TALK' | 'WORK_OR_STUDY' | 'WALK_OR_REST')[]
  mental_threat: ('STRESS' | 'LONELINESS' | 'OVERWORK' | 'LACK_OF_SLEEP' | 'UNCERTAINTY' | 'WORRIES')[]
}