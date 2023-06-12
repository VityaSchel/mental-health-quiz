import styles from './styles.module.scss'
import { Modal } from '@/shared/ui/modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Input from '@x5io/flat-uikit/dist/input'
import { Button } from '@/shared/ui/button'


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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
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
            {errors.email && touched.email && errors.email}
            <Button variant='contained' type="submit" disabled={isSubmitting}>
              Отправить
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  )
}