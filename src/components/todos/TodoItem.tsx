import { useUpdateTodo, useDeleteTodo } from '@/hooks/todos'
import type { Todo } from '@/hooks/todos'
import { useState, useRef, useEffect } from 'react'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { mutateAsync: mutateAsyncForUpdate, isPending: isPendingForUpdate } =
    useUpdateTodo()
  const { mutateAsync: mutateAsyncForDelete, isPending: isPendingForDelete } =
    useDeleteTodo()

  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [done, setDone] = useState(todo.done)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    mutateAsyncForUpdate({
      ...todo,
      done: done
    })
  }, [done])

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
    await mutateAsyncForUpdate({
      ...todo,
      title
    })
    setIsEditMode(false)
  }
  async function deleteTodo() {
    await mutateAsyncForDelete(todo)
    // setIsEditMode(false)
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
            disabled={isPendingForUpdate}
            onClick={saveTodo}>
            {isPendingForUpdate ? '저장 중..' : '저장'}
          </button>
          <button
            disabled={isPendingForDelete}
            onClick={deleteTodo}>
            {isPendingForDelete ? '삭제 중..' : '삭제'}
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={done}
            onChange={e => setDone(e.target.checked)}
          />
          {todo.title}
          <button onClick={() => onEditMode()}>수정</button>
        </>
      )}
    </li>
  )
}
