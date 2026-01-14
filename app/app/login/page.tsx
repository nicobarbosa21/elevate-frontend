'use client'
import { LoaderCircle } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from './login'

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({ username: '', password: '', form: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    setErrors({ ...errors, [name]: '', form: '' })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors = { username: '', password: '', form: '' }
    if (!user.username.trim()) newErrors.username = 'Please enter a valid username.'
    if (!user.password.trim()) newErrors.password = 'Password cannot be empty.'
    if (newErrors.username || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const { access_token } = await login(user.username, user.password)
      document.cookie = `access_token=${access_token}; Path=/; SameSite=Lax;`
      router.push('/home')
    } catch (err: any) {
      setErrors({ ...newErrors, form: err.message || 'Login failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="app-card app-form-panel w-full max-w-md p-6">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Login to Nico&apos;s Elevate App
        </h2>

        <form onSubmit={handleSubmit}>
          {errors.form && (
            <p className="mb-4 rounded bg-red-50 p-2 text-sm text-red-700">{errors.form}</p>
          )}

          <div className="mb-6">
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className={`app-input ${errors.username ? 'border-red-500' : ''}`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className={`app-input ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="app-btn app-btn-primary flex h-10 w-full items-center justify-center disabled:opacity-60"
          >
            {loading ? <LoaderCircle className="animate-spin" size={20} /> : 'Sign in'}
          </button>
        </form>

        <span
          className="flex justify-center cursor-pointer text-sm mt-4 app-link"
          onClick={() => (window.location.href = '/')}
        >
          Back to Home
        </span>
      </div>
    </div>
  )
}
