import { useQuery } from '@tanstack/react-query'

type ResponseValue = {
  message: string
  time: string
}

export default function DelayedData({ wait = 1000 }: { wait: number }) {
  const { data } = useQuery<ResponseValue>({
    queryKey: ['delay', wait],
    queryFn: async () =>
      (await fetch(`https://api.heropy.dev/v0/delay?t=${wait}`)).json(),
    staleTime: 1000 * 10
  })
  return <div>{data?.time}</div>
}
