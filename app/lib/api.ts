function getTokenFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export async function apiFetch(
  url: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getTokenFromCookie()
  const headers = new Headers(init.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(url, {
    ...init,
    headers,
  })

  if (res.status === 401) {
    document.cookie = 'access_token=; Path=/; Max-Age=0'
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }

  return res
}