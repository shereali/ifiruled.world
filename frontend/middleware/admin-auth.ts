export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('ifiruled_admin_token')

  if (!token.value) {
    return navigateTo('/admin/login')
  }
})
