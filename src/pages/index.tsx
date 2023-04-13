import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import CardButton from '@/shared/ui/card-button'
import Headline from '@/entities/typography/headline'
import Button from '@x5io/flat-uikit/dist/Button'
import Input from '@x5io/flat-uikit/dist/Input'

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
    </>
  )
}
