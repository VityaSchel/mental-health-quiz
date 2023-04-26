import React from 'react'
import Button from './button'
import Modal from './modal'

export default function GetPlan() {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)} />
      <Modal visible={visible} />
    </>
  )
}