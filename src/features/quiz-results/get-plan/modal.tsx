import React from 'react'
import styles from './styles.module.scss'
import { Modal } from '@/shared/ui/modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from '@x5io/flat-uikit/dist/input'
import { Button } from '@/shared/ui/button'
import { ErrorResponse, PayWidgetCloudpaymentsResponse, PaymentRequired, WidgetCloudpaymentsPaymentResponse } from '@/shared/api/ApiDefinitions'
import Checkbox from '@x5io/flat-uikit/dist/checkbox'
import { hasCheckboxes } from '@x5io/ads_parameter'
import { useRouter } from 'next/router'

export function GetPlanModal({ visible, onClose }: {
  visible: boolean
  onClose: () => any
}) {
  const [email, setEmail] = React.useState('')
  const [paymentId, setPaymentId] = React.useState('')
  const [paymentDetails, setPaymentDetails] = React.useState<WidgetCloudpaymentsPaymentResponse | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleClose = () => {
    setEmail('')
    setPaymentId('')
    setPaymentDetails(null)
    setIsSuccess(false)
    onClose()
  }

  return (
    <>
      <Modal visible={visible} className={styles.modal} onClose={handleClose}>
        {
          isSuccess
            ? <Screen3 onClose={handleClose} />
            : (
              <>
                <div className={styles.headline}>
                  <span className={styles.h1}>Получите план на электронную почту</span>
                  <span className={styles.h2}>Укажите e-mail, куда мы отправим ваш персональный план улучшения ментального здоровья</span>
                </div>
                {
                  email && paymentDetails
                    ? (
                      <Screen2
                        paymentId={paymentId}
                        email={email}
                        paymentDetails={paymentDetails}
                        onCancel={() => {
                          setEmail('')
                          setPaymentId('')
                          setPaymentDetails(null)
                        }}
                        onSuccess={() => setIsSuccess(true)}
                      />
                    )
                    : (
                      <Screen1
                        onSubmit={(email, paymentId, paymentDetails) => {
                          setEmail(email)
                          setPaymentId(paymentId)
                          setPaymentDetails(paymentDetails)
                        }}
                      />
                    )
                }
              </>
            )
        }
      </Modal>
      {visible && <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_METRICA_PAY_MODAL ?? '<div></div>' }} />}
    </>
  )
}

export function Screen1({ onSubmit }: {
  onSubmit: (email: string, paymentId: string, paymentDetails: WidgetCloudpaymentsPaymentResponse) => any
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
            onSubmit(values.email, response.paymentId, cpResponse)
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
        handleChange,
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

export function Screen2({ email, paymentId, paymentDetails, onCancel, onSuccess }: {
  paymentId: string
  email: string
  paymentDetails: WidgetCloudpaymentsPaymentResponse
  onCancel: () => any
  onSuccess: () => any
}) {
  const router = useRouter()
  const [checkboxesVisible, setCheckboxesVisible] = React.useState(true)

  React.useEffect(() => {
    checkAds()
  }, [router.query.ads])

  const checkAds = async () => {
    const ads = router.query.ads
    const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/advertising_companies/${ads}`)
    const response = await request.json()
    setCheckboxesVisible(hasCheckboxes(response.status === 'in_process'))
  }

  return (
    <Formik
      initialValues={{ firstCheckbox: false, secondCheckbox: false }}
      validationSchema={
        Yup.object({
          ...(checkboxesVisible && ({
            firstCheckbox: Yup.bool()
              .oneOf([true], ' ')
              .required(' '),
            secondCheckbox: Yup.bool()
              .oneOf([true], ' ')
              .required(' ')
          }))
        })
      }
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/payments/${paymentId}/cloudpayments/widget/pay`)
          const response = await request.json() as PayWidgetCloudpaymentsResponse
          // @ts-expect-error CP has no TS declarations
          const widget = new cp.CloudPayments()
          widget.pay('charge',
            response.cloudpayments,
            { onSuccess: onSuccess() }
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
        handleChange,
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
          {checkboxesVisible && (<>
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
          </>)}
          <Button variant='contained' type="submit" disabled={isSubmitting || (checkboxesVisible && (!values.firstCheckbox || !values.secondCheckbox))}>
            {/* Оплатить {paymentDetails.amount}₽ <span className={styles.oldPrice}>{paymentDetails.amountWithoutDiscount}₽</span> */}
            Отправить
          </Button>
        </form>
      )}
    </Formik>
  )
}

function Screen3({ onClose }: {
  onClose: () => any
}) {
  return (
    <>
      <div className={styles.headline}>
        <span className={styles.h1}>Готово!</span>
        <span className={styles.h2}>Персональный план был отправлен на ваш e-mail</span>
      </div>
      <Button variant='contained' className={styles.continue} onClick={onClose}>Продолжить</Button>
    </>
  )
}