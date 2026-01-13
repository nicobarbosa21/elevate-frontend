export async function login(username: string, password: string) {
  const body = new URLSearchParams()
  body.append('username', username)
  body.append('password', password)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? 'Invalid credentials')
  }

  return res.json() as Promise<{ access_token: string; token_type: string }>
}
