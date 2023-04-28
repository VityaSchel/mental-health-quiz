import React from 'react'
import Button from './button'
import Modal from './modal'

export default function GetPlan({ children = 'Получить план' }: React.PropsWithChildren) {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>{children}</Button>
      <Modal visible={visible} />
    </>
  )
}