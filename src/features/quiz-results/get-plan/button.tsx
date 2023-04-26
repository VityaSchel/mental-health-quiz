import { Button } from '@/shared/ui/button'

export default function GetPlanButton({ onClick }: {
  onClick: () => any
}) {
  return (
    <Button variant='contained' onClick={onClick}>Получить план</Button>
  )
}