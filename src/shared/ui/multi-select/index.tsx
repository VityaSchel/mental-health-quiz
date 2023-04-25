import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import SelectedIcon from './selected.svg'
import cx from 'classnames'

const SelectContext = React.createContext<[string[], (newAnswers: string[]) => any]>([[], () => {/**/}])

export function MultiSelect({ children, answers, setAnswers }: React.PropsWithChildren<{
  answers: string[]
  setAnswers: (answers: string[]) => void
}>) {
  return (
    <SelectContext.Provider value={[answers, setAnswers]}>
      <div className={styles.select}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

function Option({ answerKey, icon, label }: {
  answerKey: string
  icon: import('next/image').StaticImageData
  label: string
}) {
  const [answers, setAnswers] = React.useContext(SelectContext)
  const selected = answers.includes(answerKey)

  const handleSelect = () => {
    if (selected) {
      setAnswers(answers.filter(k => k !== answerKey))
    } else {
      setAnswers(answers.concat(answerKey))
    }
  }

  return (
    <button className={cx(styles.option, { [styles.selected]: selected })} onClick={handleSelect}>
      <div className={styles.icon}>
        <Image src={icon} fill alt='' quality={100} priority />
      </div>
      <span>
        {label}
      </span>
      <SelectedIcon className={cx(styles.check, { [styles.visible]: selected })} />
    </button>
  )
}
export { Option as MultiSelectOption }