import React from 'react'
import styles from './styles.module.scss'
import { Modal } from '@/shared/ui/modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from '@x5io/flat-uikit/dist/input'
import { Button } from '@/shared/ui/button'
import { CloudpaymentsPaymentResponse, ErrorResponse, PaymentRequired, WidgetCloudpaymentsPaymentResponse } from '@/shared/api/ApiDefinitions'
import Checkbox from '@x5io/flat-uikit/dist/checkbox'
import { hasCheckboxes } from '@x5io/ads_parameter'

export function GetPlanModal({ visible, onClose }: {
  visible: boolean
  onClose: () => any
}) {
  const [email, setEmail] = React.useState('')
  const [paymentDetails, setPaymentDetails] = React.useState<WidgetCloudpaymentsPaymentResponse | null>(null)

  const handleClose = () => {
    setEmail('')
    setPaymentDetails(null)
    onClose()
  }

  return (
    <Modal visible={visible} className={styles.modal} onClose={handleClose}>
      <div className={styles.headline}>
        <span className={styles.h1}>Получите план на электронную почту</span>
        <span className={styles.h2}>Укажите e-mail, куда мы отправим ваш персональный план улучшения ментального здоровья</span>
      </div>
      {
        email && paymentDetails
          ? (
            <Screen2 
              email={email} 
              paymentDetails={paymentDetails} 
              onCancel={() => {
                setEmail('')
                setPaymentDetails(null)
              }}  
            />
          )
          : (
            <Screen1 
              onSubmit={(email, paymentDetails) => {
                setEmail(email)
                setPaymentDetails(paymentDetails)
              }} 
            />
          )
      }
    </Modal>
  )
}

export function Screen1({ onSubmit }: {
  onSubmit: (email: string, paymentDetails: WidgetCloudpaymentsPaymentResponse) => any
}) {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={
        Yup.object({
          email: Yup.string()
            .email('Введите почту')
            .required('Введите почту')
        })
      }
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/send_plan_mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: values.email
            })
          })
          if (request.status === 400 || request.status === 500) {
            const response = await request.json() as ErrorResponse
            setErrors({ email: response.message || 'Ошибка' })
          } else {
            const response = await request.json() as PaymentRequired
            await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/payments/${response.paymentId}/set-email`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: values.email
              })
            })
            const cpRequest = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/payments/${response.paymentId}/cloudpayments/widget`)
            const cpResponse = await cpRequest.json() as WidgetCloudpaymentsPaymentResponse
            onSubmit(values.email, cpResponse)
            setSubmitting(false)
          }
        } catch (e) {
          setErrors({ email: 'Ошибка' })
          setSubmitting(false)
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            error={errors.email}
            value={values.email}
            name='email'
            onChange={handleChange}
            label='E-mail'
            placeholder='Адрес электронной почты'
          />
          <Button variant='contained' type="submit" disabled={isSubmitting}>
            Отправить
          </Button>
        </form>
      )}
    </Formik>
  )
}

export function Screen2({ email, paymentDetails, onCancel }: {
  email: string
  paymentDetails: WidgetCloudpaymentsPaymentResponse
  onCancel: () => any
}) {
  return (
    <Formik
      initialValues={{ firstCheckbox: false, secondCheckbox: false }}
      validationSchema={
        Yup.object({
          firstCheckbox: Yup.bool()
            .oneOf([true], ' ')
            .required(' '),
          secondCheckbox: Yup.bool()
            .oneOf([true], ' ')
            .required(' ')
        })
      }
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          // @ts-expect-error CP has no TS declarations
          const widget = new window.cp.CloudPayments()
          widget.pay('auth',
            paymentDetails,
            {
              onSuccess: () => {
                alert('s')
              }
            }
          )
          setSubmitting(false)
        } catch (e) {
          console.error(e)
          setSubmitting(false)
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.email}>
            <Input
              value={email}
              label='E-mail'
              placeholder='Адрес электронной почты'
              disabled
            />
            <button className={styles.edit} onClick={onCancel}>Изменить</button>
          </div>
          <Checkbox
            value={values.firstCheckbox}
            onChange={handleChange}
            name='firstCheckbox'
            error={errors.firstCheckbox}
          >
            {paymentDetails.firstCheckbox}
          </Checkbox>
          <Checkbox
            value={values.secondCheckbox}
            onChange={handleChange}
            name='secondCheckbox'
            error={errors.secondCheckbox}
          >
            {paymentDetails.secondCheckbox}
          </Checkbox>
          <Button variant='contained' type="submit" disabled={isSubmitting || !values.firstCheckbox || !values.secondCheckbox}>
            Оплатить {paymentDetails.amount}₽ <span className={styles.oldPrice}>{paymentDetails.amountWithoutDiscount}₽</span>
          </Button>
        </form>
      )}
    </Formik>
  )
}