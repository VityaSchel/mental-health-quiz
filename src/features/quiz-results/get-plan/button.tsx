import { Button } from '@/shared/ui/button'

export default function GetPlanButton({ children, onClick }: React.PropsWithChildren<{
  onClick: () => any
}>) {
  return (
    <Button variant='contained' big onClick={onClick}>{children}</Button>
  )
}