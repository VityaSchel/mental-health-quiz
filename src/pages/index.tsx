import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import CardButton from '@/shared/ui/card-button'
import Headline from '@/entities/typography/headline'
import Button from '@x5io/flat-uikit/dist/button'
import Input from '@x5io/flat-uikit/dist/input'
import Checkbox from '@x5io/flat-uikit/dist/checkbox'

export default function Home() {
  return (
    <>
      <CardButton
        color='rgba(58, 223, 95, 1)'
        title='Низкий 🌈'
        caption='Редко сталкиваюсь со стрессом'
      />
      <Headline color='rgba(138, 172, 251, 1)'>уровень <strong>стресса</strong> в вашей жизни</Headline>
      <Button>Foobar</Button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, margin: 100 }}>
        <Input 
          label='Ваш возраст'
          placeholder='Введите ваш возраст'
          onEnter={() => {}}
        />
        <Input 
          label='Ваш возраст'
          placeholder='Введите ваш возраст'
          value={'33'}
          onEnter={() => {}}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, margin: 100 }}>
        <Checkbox
          name='scam'
        >
          Нажимая "Оплатить" я подтверждаю свое согласие на постоянные списания скам обман со своей карты 199 рублей в месяц
        </Checkbox>
        <Checkbox
          name='scam2'
        >
          Я подтверждаю, что прочитал условия соглашения с использованием ui кита и умею устанавливать компоненты из регистра npm
        </Checkbox>
      </div>
    </>
  )
}
