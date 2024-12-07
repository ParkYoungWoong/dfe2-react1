import { useTodoFiltersStore } from '@/hooks/todos'

export default function TodoFilters() {
  const filterStatus = useTodoFiltersStore(state => state.filterStatus)
  const setFilterStatus = useTodoFiltersStore(state => state.setFilterStatus)
  return (
    <>
      <button onClick={() => setFilterStatus('all')}>전체</button>
      <button onClick={() => setFilterStatus('todo')}>할 일</button>
      <button onClick={() => setFilterStatus('done')}>완료</button>
      {filterStatus}
    </>
  )
}
