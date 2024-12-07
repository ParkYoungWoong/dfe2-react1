import { useDeleteDoneTodos } from '@/hooks/todos'

export default function TodoActions() {
  const { mutateAsync, isPending } = useDeleteDoneTodos()
  return (
    <>
      <button
        disabled={isPending}
        onClick={() => mutateAsync()}>
        {isPending ? '삭제 중..' : '완료 삭제'}
      </button>
    </>
  )
}
