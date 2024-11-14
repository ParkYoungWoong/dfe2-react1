import { redirect } from 'react-router-dom'

export async function requiresAuth({ request }: { request: Request }) {
  const token = localStorage.getItem('accessToken')
  // const res = await fetch('https://api.heropy.dev/v0/me', {
  //   method: 'GET',
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // })
  // const user = await res.json()
  const user = token
  if (!user) {
    const url = new URL(request.url)
    // returnUrl, callbackUrl, redirectTo
    const callbackUrl = url.pathname + url.search
    return redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }
  return user
}
