export function logout() {
  document.cookie = 'access_token=; Path=/; Max-Age=0'
  window.location.href = '/login'
}