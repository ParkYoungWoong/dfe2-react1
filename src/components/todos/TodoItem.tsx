import { useUpdateTodo } from '@/hooks/todos'
import type { Todo } from '@/hooks/todos'
import { useState, useRef } from 'react'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { mutateAsync, isPending } = useUpdateTodo()

  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleWindowEscapeKeyDown(event: KeyboardEvent) {
    event.key === 'Escape' && cancelEditMode()
  }
  function onEditMode() {
    setIsEditMode(true)
    queueMicrotask(() => {
      inputRef.current?.focus()
    })
    window.addEventListener('keydown', handleWindowEscapeKeyDown)
  }
  function cancelEditMode() {
    setIsEditMode(false)
    setTitle(todo.title)
    window.removeEventListener('keydown', handleWindowEscapeKeyDown)
  }
  async function saveTodo() {
    await mutateAsync({
      ...todo,
      title
    })
    setIsEditMode(false)
  }

  return (
    <li>
      {isEditMode ? (
        <>
          <input
            ref={inputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button onClick={cancelEditMode}>취소</button>
          <button
            disabled={isPending}
            onClick={saveTodo}>
            {isPending ? '저장 중..' : '저장'}
          </button>
        </>
      ) : (
        <>
          {todo.title}
          <button onClick={() => onEditMode()}>수정</button>
        </>
      )}
    </li>
  )
}
