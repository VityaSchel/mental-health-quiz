import styles from './styles.module.scss'
import { Modal } from '@/shared/ui/modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from '@x5io/flat-uikit/dist/input'
import { Button } from '@/shared/ui/button'
import { CloudpaymentsPaymentResponse, ErrorResponse, PaymentRequired } from '@/shared/api/ApiDefinitions'


export function GetPlanModal({ visible, onClose }: {
  visible: boolean
  onClose: () => any
}) {
  return (
    <Modal visible={visible} className={styles.modal} onClose={onClose}>
      <div className={styles.headline}>
        <span className={styles.h1}>Получите план на электронную почту</span>
        <span className={styles.h2}>Укажите e-mail, куда мы отправим ваш персональный план улучшения ментального здоровья</span>
      </div>
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
              const cpRequest = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/payments/${response.paymentId}/cloudpayments`)
              const cpResponse = await cpRequest.json() as CloudpaymentsPaymentResponse
              // @ts-expect-error CP has no TS declarations
              const widget = new window.cp.CloudPayments()
              widget.pay('auth',
                cpResponse,
                {
                  onSuccess: () => {
                    alert('s')  
                  }
                }
              )
            }
          } catch(e) {
            setErrors({ email: 'Ошибка' })
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
    </Modal>
  )
}