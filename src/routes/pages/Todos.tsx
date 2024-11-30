import { useState } from 'react'
import TodoItem from '@/components/todos/TodoItem'
import { useFetchTodos, useCreateTodo } from '@/hooks/todos'

export default function TodosPage() {
  const { data: todos } = useFetchTodos()
  const { error, mutateAsync, isPending } = useCreateTodo()

  const [title, setTitle] = useState('')

  async function createTodo(title: string) {
    await mutateAsync(title)
    if (!error) {
      setTitle('')
    }
  }

  return (
    <>
      <h1>Todos Page!</h1>
      <div>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={event =>
            event.key === 'Enter' &&
            !event.nativeEvent.isComposing &&
            createTodo(title)
          }
        />
        <button onClick={() => createTodo(title)}>
          {isPending ? '로딩 중..' : '할 일 추가'}
        </button>
      </div>
      <ul>
        {todos?.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          )
        })}
      </ul>
    </>
  )
}
