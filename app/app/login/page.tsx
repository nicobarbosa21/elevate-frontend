'use client'
import { LoaderCircle, Lock, User } from 'lucide-react'
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
    let newErrors = { username: '', password: '', form: '' }
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
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
          Login to Nico&apos;s Elevate App
        </h2>

        <form onSubmit={handleSubmit}>
          {errors.form && <p className="mb-4 rounded bg-red-50 p-2 text-sm text-red-700">{errors.form}</p>}

          <div className="mb-6">
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <User size={20} />
              </span>
              <input
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.username ? 'border-red-500 ring-red-200' : 'border-gray-700'
                }`}
                placeholder="Enter your username"
              />
            </div>
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <Lock size={20} />
              </span>
              <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 pl-10 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-200 ${
                  errors.password ? 'border-red-500 ring-red-200' : 'border-gray-700'
                }`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-10 w-full items-center justify-center rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 disabled:bg-gray-300"
          >
            {loading ? <LoaderCircle className="animate-spin" size={20} /> : 'Sign in'}
          </button>
        </form>
        <span 
          className='flex justify-center cursor-pointer text-sm mt-4 text-gray-700 hover:text-gray-500'
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </span>
      </div>
    </div>
  )
}
