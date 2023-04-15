import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import CardButton from '@/shared/ui/card-button'
import Headline from '@/entities/typography/headline'

export default function Quiz() {
  return (
    <>
      <Headline color='rgba(138, 172, 251, 1)'>Как вы оцениваете уровень <strong>стресса</strong> в вашей повседневной жизни?</Headline>
      <CardButton
        color='rgba(58, 223, 95, 1)'
        title='Низкий 🌈'
        caption='Редко сталкиваюсь со стрессом'
      />
      <CardButton></CardButton>
    </>
  )
}
