import { useQuery, useQueryClient } from '@tanstack/react-query'

type ResponseValue = {
  message: string
  time: string
}

export default function DelayedData({ wait = 1000 }: { wait?: number }) {
  const queryClient = useQueryClient()
  const { data } = useQuery<ResponseValue>({
    queryKey: ['delay', wait],
    queryFn: async () =>
      (await fetch(`https://api.heropy.dev/v0/delay?t=${wait}`)).json(),
    staleTime: 1000 * 10,
    enabled: false
  })
  function refetch() {
    // 신선한 캐시 데이터가 있으면 다시 가져오지 않음!
    // queryClient.fetchQuery({
    //   queryKey: ['delay', wait],
    //   staleTime: 1000 * 10
    // })
    console.log(queryClient.getQueryData(['delay', wait]))
  }

  return (
    <>
      <div>{data?.time}</div>
      <button onClick={() => refetch()}>다시 가져오기!</button>
    </>
  )
}
