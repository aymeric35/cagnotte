// middleware/auth.ts

const pagesWithoutAuth = []
const pagesOnlyToUnAuth = ['login', 'register']
const defaultAuthPagePath = '/'
const loginPath = '/login'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (pagesWithoutAuth.includes(to.name))
    return

  const user = await getCurrentUser()
  if (user) {
    if (pagesOnlyToUnAuth.includes(to.name)) {
      return navigateTo({ path: defaultAuthPagePath })
    }
  }
  else {
    if (!pagesOnlyToUnAuth.includes(to.name)) {
      return navigateTo({ path: loginPath })
    }
  }
})
