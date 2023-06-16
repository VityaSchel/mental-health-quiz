import React from 'react'
import styles from './styles.module.scss'
import { Modal } from '@/shared/ui/modal'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import Input from '@x5io/flat-uikit/dist/input'
import { Button } from '@/shared/ui/button'
import { AdvertisingCompanyResponse, ErrorResponse, PayWidgetCloudpaymentsResponse, PaymentRequired, WidgetCloudpaymentsPaymentResponse } from '@/shared/api/ApiDefinitions'
import Checkbox from '@x5io/flat-uikit/dist/checkbox'
import { hasCheckboxes } from '@x5io/ads_parameter'
import { useRouter } from 'next/router'
import { PaymentDetailsContext } from '@/pages/quiz/result'

export function GetPlanModal({ visible, onClose }: {
  visible: boolean
  onClose: () => any
}) {
  const [email, setEmail] = React.useState('')
  const [paymentId, setPaymentId] = React.useState('')
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [checkboxesVisible, setCheckboxesVisible] = React.useState(false)
  const router = useRouter()

  const areCheckboxesVisible = async (): Promise<boolean> => {
    const ads = router.query.ads
    const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/advertising_companies/${ads}`)
    const response = await request.json() as AdvertisingCompanyResponse
    return hasCheckboxes(response.status === 'active')
  }

  const handleClose = () => {
    setEmail('')
    setPaymentId('')
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
                  email
                    ? (
                      <Screen2
                        paymentId={paymentId}
                        email={email}
                        checkboxesVisible={checkboxesVisible}
                        onCancel={() => {
                          setEmail('')
                          setPaymentId('')
                        }}
                        onSuccess={() => setIsSuccess(true)}
                      />
                    )
                    : (
                      <Screen1
                        onSubmit={async (email, paymentId) => {
                          setCheckboxesVisible(await areCheckboxesVisible())
                          setEmail(email)
                          setPaymentId(paymentId)
                          eval(process.env.NEXT_PUBLIC_YANDEX_METRICA_GOAL_PAY_BEFORE_CHECKBOXES ?? '')
                        }}
                      />
                    )
                }
              </>
            )
        }
      </Modal>
    </>
  )
}

export function Screen1({ onSubmit }: {
  onSubmit: (email: string, paymentId: string) => any
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
            onSubmit(values.email, response.paymentId)
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
export function Screen2({ email, paymentId, checkboxesVisible, onCancel, onSuccess }: {
  paymentId: string
  email: string
  checkboxesVisible: boolean
  onCancel: () => any
  onSuccess: () => any
}) {
  const initialPaymentDetails = React.useContext(PaymentDetailsContext)
  const formikRef = React.useRef<FormikProps<{ firstCheckbox: boolean, secondCheckbox: boolean }>>()
  const isAutoSubmitted = React.useRef(false)
  
  React.useEffect(() => {
    if (!checkboxesVisible && formikRef.current && !formikRef.current.isSubmitting && !isAutoSubmitted.current) {
      isAutoSubmitted.current = true
      formikRef.current.submitForm()
    }
  }, [checkboxesVisible, formikRef])

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
      innerRef={formikRef as any}
      validateOnChange={false}
      onSubmit={() => {
        eval(process.env.NEXT_PUBLIC_YANDEX_METRICA_GOAL_PAY_AFTER_CHECKBOXES ?? '')
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void>(async resolve => {
          try {
            const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/payments/${paymentId}/cloudpayments/widget/pay`)
            const response = await request.json() as PayWidgetCloudpaymentsResponse
            // @ts-expect-error CP has no TS declarations
            const widget = new cp.CloudPayments()
            widget.pay('charge',
              response.cloudpayments,
              { 
                onSuccess: () => {
                  onSuccess()
                  resolve()
                },
                onFail: () => {
                  resolve()
                }
              }
            )
          } catch (e) {
            console.error('Error while submitting form', e)
            resolve()
          }
        })
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
              {initialPaymentDetails?.firstCheckbox}
            </Checkbox>
            <Checkbox
              value={values.secondCheckbox}
              onChange={handleChange}
              name='secondCheckbox'
              error={errors.secondCheckbox}
            >
              {initialPaymentDetails?.secondCheckbox}
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