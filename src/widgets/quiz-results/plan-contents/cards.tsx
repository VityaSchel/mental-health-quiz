import { PlanContentsCard } from '@/entities/quiz-results/plan-contents-card'
import styles from './styles.module.scss'
import Angry from './angry.png'
import Sad from './sad.png'
import Work from './work.png'
import Sleep from './sleep.png'
import Image from 'next/image'

export function Cards() {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.cards}>
        <PlanContentsCard 
          icon={<Image src={Angry} alt='' width={40} height={40} />}
          title={'Тревожность'}
          caption={'Поможем стать намного спокойнее за счёт дыхания, йоги и медитации'}
        />
        <PlanContentsCard 
          icon={<Image src={Sad} alt='' width={40} height={40} />}
          title={'Отношения с людьми'}
          caption={'Расскажем  быть открытым, внимательным и проявлять понимание'}
        />
        <PlanContentsCard 
          icon={<Image src={Work} alt='' width={40} height={40} />}
          title={'Учеба и работа'}
          caption={'Установим конкретные цели, поставим  приоритеты и научим планировать'}
        />
        <PlanContentsCard 
          icon={<Image src={Sleep} alt='' width={40} height={40} />}
          title={'Сон и питание'}
          caption={'Научим расслабляться перед сном и объясним как правильно питаться'}
        />
      </div>
    </div>
  )
}