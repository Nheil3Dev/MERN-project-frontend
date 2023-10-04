interface IRoute {
  path: string,
  name: string
}

export const ROUTES: IRoute[] = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/login',
    name: 'Login'
  },
  {
    path: '/register',
    name: 'Register'
  },
  {
    path: '/katas',
    name: 'Katas'
  }
]
