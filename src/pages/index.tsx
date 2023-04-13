import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import CardButton from '@/shared/ui/card-button'

export default function Home() {
  return (
    <>
      <CardButton
        color='rgba(58, 223, 95, 1)'
        title='Низкий 🌈'
        caption='Редко сталкиваюсь со стрессом'
      />
    </>
  )
}
